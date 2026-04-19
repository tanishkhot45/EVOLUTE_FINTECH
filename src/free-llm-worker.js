export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, cors);
    }

    try {
      const body = await request.json();
      const language = body.language || "en";
      const products = Array.isArray(body.products) ? body.products : [];
      const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
      const advisoryMode = body.advisoryMode === "recommendation" ? "recommendation" : "default";
      const candidateProductIds = Array.isArray(body.candidateProductIds) ? body.candidateProductIds : [];
      const currentProductId = body.currentProductId || null;
      const extractedFact = String(body.extractedFact || "").trim();
      const categoryLabel = String(body.categoryLabel || "").trim();
      const message = String(body.message || "").trim();

      if (!message) {
        return json({ error: "Message is required" }, 400, cors);
      }

      const contextProducts = selectProducts({
        message,
        products,
        currentProductId,
        candidateProductIds,
        advisoryMode,
      });
      const system = buildSystemPrompt(language, contextProducts, advisoryMode, extractedFact, categoryLabel);
      const messages = [
        { role: "system", content: system },
        ...history.map((item) => ({
          role: item.role === "bot" ? "assistant" : "user",
          content: String(item.text || ""),
        })),
        { role: "user", content: message },
      ];

      const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct-fp8-fast", {
        messages,
        temperature: advisoryMode === "recommendation" ? 0.35 : 0.2,
        max_tokens: advisoryMode === "recommendation" ? 460 : 380,
      });

      const answer = extractText(result) || fallbackAnswer(language, contextProducts, advisoryMode);
      return json(
        {
          answer,
          lang: language,
          productId: contextProducts[0]?.id || currentProductId || null,
          mode: "cloudflare-workers-ai",
        },
        200,
        cors,
      );
    } catch (error) {
      return json(
        { error: "Worker failed", detail: String(error?.message || error) },
        500,
        cors,
      );
    }
  },
};

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}

function normalize(text = "") {
  return text.toLowerCase().replace(/[^\p{L}\p{N}\s/+.-]/gu, " ").replace(/\s+/g, " ").trim();
}

function scoreProduct(message, product) {
  const haystack = normalize([
    product.name,
    product.category,
    ...(product.aliases || []),
    product.overview || "",
    ...(product.features || []),
    ...(product.applications || []),
    ...Object.values(product.facts || {}),
  ].join(" "));
  const query = normalize(message);
  if (!query || !haystack) return 0;

  let score = 0;
  for (const token of query.split(" ")) {
    if (token.length < 2) continue;
    if (haystack.includes(token)) score += 1;
  }
  if (haystack.includes(normalize(product.name))) score += 4;
  return score;
}

function selectProducts({ message, products, currentProductId, candidateProductIds = [], advisoryMode = "default" }) {
  const candidateSet = new Set(candidateProductIds || []);
  const pool = candidateSet.size ? products.filter((product) => candidateSet.has(product.id)) : products;
  const currentBias = advisoryMode === "recommendation" ? 0 : 1.5;

  const scored = pool
    .map((product) => ({
      product,
      score: scoreProduct(message, product) + (product.id === currentProductId ? currentBias : 0),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, advisoryMode === "recommendation" ? 3 : 4)
    .map((item) => item.product);

  if (scored.length) return scored;
  if (pool.length && advisoryMode === "recommendation") return pool.slice(0, 3);
  return products.filter((product) => product.id === currentProductId).slice(0, 1);
}

function buildSystemPrompt(language, products, advisoryMode = "default", extractedFact = "", categoryLabel = "") {
  const langInstruction =
    language === "hi"
      ? "Reply in Hindi."
      : language === "mr"
        ? "Reply in Marathi."
        : "Reply in English.";

  const context = products.length
    ? products.map((product) => JSON.stringify(product)).join("\n")
    : "No product matched with high confidence.";

  // Explicit product allowlist — the single most effective guard against the model
  // drawing on training knowledge about products not in the current context.
  // Small models (≤8B) often ignore soft instructions like "answer only from context"
  // but reliably respect a hard named list.
  const allowedNames = products.map((p) => p.name).join(", ");
  const allowlistBlock = allowedNames
    ? `ALLOWED PRODUCTS: You may ONLY mention or compare these products: ${allowedNames}.\nDo NOT mention any other product by name, even if you know it from training data.`
    : "";

  const factBlock = extractedFact
    ? `VERIFIED FACT (use this directly, never contradict it):\n${extractedFact}`
    : "";

  // When a category is detected, reinforce the scope restriction with human-readable framing.
  const categoryBlock = categoryLabel
    ? `The user is asking about ${categoryLabel} products. Only discuss products from the allowed list above.`
    : "";

  const recommendationInstructions = advisoryMode === "recommendation"
    ? [
        "This is a recommendation-style question such as best, suitable, or which one should I choose.",
        "Do NOT recommend products outside the allowed list.",
        "Do not answer with a single raw specification.",
        "If the question is broad, say there is no single universally best option.",
        "Recommend the most suitable option from the allowed products and give 2 to 4 concrete reasons tied to features, facts, certifications, battery, connectivity, printer, biometrics, or payments.",
        "Mention one alternative from the allowed list for a different need when relevant.",
        "Keep the answer moderately detailed but easy to read.",
      ]
    : [];

  return [
    "You are an Evolute Fintech product assistant.",
    langInstruction,
    allowlistBlock,
    factBlock,
    categoryBlock,
    "Answer only from the product context provided below. Never invent facts.",
    "For factual questions like weight, battery, dimensions, connectivity, printer, OS, processor, memory, certifications, features, or applications — answer directly from the context. Frame the answer in natural, helpful language.",
    "If a product is matched, stay with that product and do not switch unless the user explicitly asks.",
    ...recommendationInstructions,
    "If the answer is not in context, say so briefly instead of inventing facts.",
    "Keep answers practical, accurate, and concise.",
    "When comparing, use bullet-style short sections.",
    "Product context:",
    context,
  ].filter(Boolean).join("\n\n");
}

function extractText(result) {
  if (!result) return "";
  if (typeof result === "string") return result.trim();
  if (typeof result.response === "string") return result.response.trim();
  if (typeof result.result?.response === "string") return result.result.response.trim();
  if (Array.isArray(result.messages)) {
    const last = [...result.messages].reverse().find((item) => item.role === "assistant" && item.content);
    if (last?.content) return String(last.content).trim();
  }
  return "";
}

function fallbackAnswer(language, products, advisoryMode = "default") {
  if (!products.length) {
    return language === "hi"
      ? "मुझे सही product match नहीं मिला। कृपया product का नाम या use case बताइए।"
      : language === "mr"
        ? "मला योग्य product match सापडला नाही. कृपया product चे नाव किंवा use case सांगा."
        : "I could not match the right product. Please tell me the product name or the use case.";
  }

  const first = products[0];
  const second = products[1];

  if (advisoryMode === "recommendation") {
    if (language === "hi") {
      return [
        `हर use case के लिए एक ही product सबसे अच्छा नहीं होता, लेकिन ${first.name} सबसे strong recommendation लगता है।`,
        second ? `${second.name} भी एक अच्छा alternative है अगर आपकी जरूरत अलग priority की है।` : "",
      ].filter(Boolean).join(" ");
    }

    if (language === "mr") {
      return [
        `प्रत्येक use case साठी एकच product सर्वोत्तम नसतो, पण ${first.name} हा मजबूत recommendation वाटतो।`,
        second ? `${second.name} हा वेगळ्या priority साठी चांगला alternative आहे.` : "",
      ].filter(Boolean).join(" ");
    }

    return [
      `There is no single universally best product for every use case, but ${first.name} looks like the strongest recommendation from the available context.`,
      second ? `${second.name} is a good alternative for a different priority.` : "",
    ].filter(Boolean).join(" ");
  }

  return language === "hi"
    ? `${first.name} सबसे करीब match है। ${first.overview || ""}`
    : language === "mr"
      ? `${first.name} हा सर्वात जवळचा match आहे. ${first.overview || ""}`
      : `${first.name} is the closest match. ${first.overview || ""}`;
}