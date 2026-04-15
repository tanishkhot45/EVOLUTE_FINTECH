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
      const currentProductId = body.currentProductId || null;
      const message = String(body.message || "").trim();

      if (!message) {
        return json({ error: "Message is required" }, 400, cors);
      }

      const contextProducts = selectProducts({ message, products, currentProductId });
      const system = buildSystemPrompt(language, contextProducts);
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
        temperature: 0.2,
        max_tokens: 380,
      });

      const answer = extractText(result) || fallbackAnswer(language, contextProducts);
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

function selectProducts({ message, products, currentProductId }) {
  const scored = products
    .map((product) => ({ product, score: scoreProduct(message, product) + (product.id === currentProductId ? 1.5 : 0) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((item) => item.product);

  if (scored.length) return scored;
  return products.filter((product) => product.id === currentProductId).slice(0, 1);
}

function buildSystemPrompt(language, products) {
  const langInstruction =
    language === "hi"
      ? "Reply in Hindi."
      : language === "mr"
        ? "Reply in Marathi."
        : "Reply in English.";

  const context = products.length
    ? products.map((product) => JSON.stringify(product)).join("\n")
    : "No product matched with high confidence.";

  return [
    "You are an Evolute Fintech product assistant.",
    langInstruction,
    "Answer only from the provided product context.",
    "If the answer is not in context, say so briefly and suggest the closest product instead of inventing facts.",
    "Keep answers practical, accurate, and concise.",
    "When comparing, use bullet-style short sections.",
    "Relevant product context:",
    context,
  ].join("\n\n");
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

function fallbackAnswer(language, products) {
  if (!products.length) {
    return language === "hi"
      ? "मुझे सही product match नहीं मिला। कृपया product का नाम या use case बताइए।"
      : language === "mr"
        ? "मला योग्य product match सापडला नाही. कृपया product चे नाव किंवा use case सांगा."
        : "I could not match the right product. Please tell me the product name or the use case.";
  }

  const first = products[0];
  return language === "hi"
    ? `${first.name} सबसे करीब match है। ${first.overview || ""}`
    : language === "mr"
      ? `${first.name} हा सर्वात जवळचा match आहे. ${first.overview || ""}`
      : `${first.name} is the closest match. ${first.overview || ""}`;
}
