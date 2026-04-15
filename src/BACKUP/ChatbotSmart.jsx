import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { detectLang, getAssistantReply } from "./knowledgeEngine";

const BotIcon = ({ size = 28 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.32,
      border: "1.5px solid #e0e0e0",
      background: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.55,
      flexShrink: 0,
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    }}
  >
    🤖
  </div>
);

const SPEECH_LANG = { en: "en-IN", hi: "hi-IN", mr: "mr-IN" };
const LANGUAGE_OPTIONS = [
  { label: "English", value: "en-IN" },
  { label: "हिंदी", value: "hi-IN" },
  { label: "मराठी", value: "mr-IN" },
];
const QUICK_CHIPS = [
  "What is LeoPOS Bio?",
  "LeoPOS Smart key features",
  "Compare LeoPOS Bio and LeoPOS Smart",
  "Falcon applications",
  "Ampli5 pricing",
];

export default function Chatbot({ chatOpen, setChatOpen }) {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakId, setSpeakId] = useState(null);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [typing, setTyping] = useState(false);
  const [touched, setTouched] = useState(false);
  const [micLang, setMicLang] = useState("en-IN");
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [voicesReady, setVoicesReady] = useState(false);

  const endRef = useRef(null);
  const msgsRef = useRef([]);
  const sendRef = useRef(null);
  const recRef = useRef(null);
  const transcriptRef = useRef("");
  const lastPreviewRef = useRef("");
  const silenceTimeoutRef = useRef(null);
  const speakingInitRef = useRef(false);
  const lastAutoSpokenIdRef = useRef(null);

  const latestBotMessage = useMemo(
    () => [...msgs].reverse().find((message) => message.role === "bot"),
    [msgs]
  );

  useEffect(() => {
    msgsRef.current = msgs;
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  useEffect(() => {
    const onVoicesChanged = () => {
      setVoicesReady((window.speechSynthesis?.getVoices?.() || []).length > 0);
    };
    onVoicesChanged();
    window.speechSynthesis?.addEventListener?.("voiceschanged", onVoicesChanged);
    return () => {
      window.speechSynthesis?.removeEventListener?.("voiceschanged", onVoicesChanged);
    };
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(silenceTimeoutRef.current);
      try {
        recRef.current?.stop();
      } catch {}
      window.speechSynthesis?.cancel?.();
    };
  }, []);

  useEffect(() => {
    if (!chatOpen || msgs.length) return;
    setMsgs([
      {
        id: 0,
        role: "bot",
        lang: "en",
        time: new Date(),
        text:
          "Hello! 👋 I'm your Evolute Fintech assistant. Ask me about our POS devices, biometrics, printers, soundbox, geotagging, or compare two products. I understand English, हिंदी, and मराठी.",
      },
    ]);
  }, [chatOpen, msgs.length]);

  const unlockAudio = useCallback(() => {
    if (audioUnlocked || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();
      const primer = new SpeechSynthesisUtterance(" ");
      primer.volume = 0;
      speakingInitRef.current = true;
      primer.onend = () => {
        speakingInitRef.current = false;
        setAudioUnlocked(true);
      };
      primer.onerror = () => {
        speakingInitRef.current = false;
        setAudioUnlocked(true);
      };
      window.speechSynthesis.speak(primer);
      setAudioUnlocked(true);
    } catch {
      setAudioUnlocked(true);
    }
  }, [audioUnlocked]);

  const chooseVoice = useCallback((lang) => {
    const target = SPEECH_LANG[lang] || "en-IN";
    const base = target.split("-")[0].toLowerCase();
    const voices = window.speechSynthesis?.getVoices?.() || [];
    return (
      voices.find((voice) => voice.lang === target) ||
      voices.find((voice) => voice.lang?.toLowerCase().startsWith(base)) ||
      voices[0] ||
      null
    );
  }, []);

  const speak = useCallback(
    (text, lang, messageId) => {
      if (!window.speechSynthesis) return;
      unlockAudio();
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      const utterance = new SpeechSynthesisUtterance(
        text.replace(/[•📧📞]/g, " ").replace(/\s+/g, " ").trim()
      );
      utterance.lang = SPEECH_LANG[lang] || "en-IN";
      utterance.rate = 0.94;
      const voice = chooseVoice(lang);
      if (voice) utterance.voice = voice;

      utterance.onstart = () => {
        if (speakingInitRef.current) return;
        setIsSpeaking(true);
        setSpeakId(messageId);
      };
      utterance.onend = () => {
        if (speakingInitRef.current) return;
        setIsSpeaking(false);
        setSpeakId(null);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setSpeakId(null);
      };

      window.speechSynthesis.speak(utterance);
      setTimeout(() => window.speechSynthesis.resume(), 200);
    },
    [chooseVoice, unlockAudio]
  );

  const stopSpeak = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setSpeakId(null);
  }, []);

  const finalizeListening = useCallback((submit = true) => {
    clearTimeout(silenceTimeoutRef.current);
    const finalText = (transcriptRef.current || lastPreviewRef.current).trim();
    transcriptRef.current = "";
    lastPreviewRef.current = "";
    setIsListening(false);
    setInput("");

    if (submit && finalText) {
      void sendRef.current?.(finalText);
    }
  }, []);

  const startListen = useCallback(() => {
    unlockAudio();
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert("Speech recognition is not supported on this browser. Please use Chrome, Edge, or a recent mobile browser.");
      return;
    }

    clearTimeout(silenceTimeoutRef.current);
    try {
      recRef.current?.stop();
    } catch {}

    transcriptRef.current = "";
    lastPreviewRef.current = "";
    setInput("");

    const recognition = new SR();
    recognition.lang = micLang;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    const resetSilenceTimer = () => {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = setTimeout(() => {
        try {
          recognition.stop();
        } catch {}
      }, 2200);
    };

    recognition.onstart = () => {
      setIsListening(true);
      resetSilenceTimer();
    };

    recognition.onresult = (event) => {
      let finalChunk = "";
      let interimChunk = "";

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const chunk = event.results[index][0]?.transcript?.trim() || "";
        if (event.results[index].isFinal) finalChunk += `${chunk} `;
        else interimChunk += `${chunk} `;
      }

      if (finalChunk) {
        transcriptRef.current = `${transcriptRef.current} ${finalChunk}`.trim();
      }

      const preview = `${transcriptRef.current} ${interimChunk}`.trim();
      lastPreviewRef.current = preview;
      setInput(preview);
      resetSilenceTimer();
    };

    recognition.onerror = () => {
      setIsListening(false);
      clearTimeout(silenceTimeoutRef.current);
    };

    recognition.onend = () => {
      finalizeListening(true);
    };

    recRef.current = recognition;
    recognition.start();
  }, [finalizeListening, micLang, unlockAudio]);

  const stopListen = useCallback(() => {
    clearTimeout(silenceTimeoutRef.current);
    try {
      recRef.current?.stop();
    } catch {
      finalizeListening(true);
    }
  }, [finalizeListening]);

  const send = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTouched(true);
    const lang = detectLang(trimmed);
    const userMessage = {
      id: Date.now(),
      role: "user",
      text: trimmed,
      lang,
      time: new Date(),
    };

    setMsgs((previous) => [...previous, userMessage]);
    setInput("");
    setTyping(true);

    const history = [...msgsRef.current, userMessage].map((message) => ({
      role: message.role,
      text: message.text,
      productId: message.productId || null,
    }));

    try {
      const reply = await getAssistantReply({ text: trimmed, history });
      setMsgs((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          role: "bot",
          text: reply.answer,
          lang: reply.lang || lang,
          time: new Date(),
          productId: reply.productId || null,
        },
      ]);
    } catch {
      setMsgs((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          role: "bot",
          text: "Sorry, I could not answer that properly just now. Please try again.",
          lang,
          time: new Date(),
        },
      ]);
    } finally {
      setTyping(false);
    }
  }, []);

  useEffect(() => {
    sendRef.current = send;
  }, [send]);

  useEffect(() => {
    if (!autoSpeak || !latestBotMessage) return;
    if (lastAutoSpokenIdRef.current === latestBotMessage.id) return;
    lastAutoSpokenIdRef.current = latestBotMessage.id;
    speak(latestBotMessage.text, latestBotMessage.lang, latestBotMessage.id);
  }, [autoSpeak, latestBotMessage, speak]);

  const fmtTime = (date) =>
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const R = "#d42020";
  const TEXT = "#1d1d1f";
  const MUTED = "#86868b";
  const SOFT_BG = "#f5f5f7";

  return (
    <>
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: "2px solid #e0e0e0",
            background: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            zIndex: 1000,
            fontSize: 26,
          }}
        >
          🤖
        </button>
      )}

      {chatOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 16,
            right: 16,
            width: "min(400px, calc(100vw - 24px))",
            height: "min(620px, calc(100vh - 32px))",
            borderRadius: 20,
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.1)",
            zIndex: 1001,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 0 0 0.5px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              padding: "14px 18px",
              borderBottom: "0.5px solid rgba(0,0,0,0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexShrink: 0,
              background: "#fafafa",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <BotIcon size={32} />
              <div style={{ fontWeight: 700, fontSize: 16, color: TEXT }}>Evolute Fintech</div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                onClick={() => {
                  unlockAudio();
                  setAutoSpeak((previous) => {
                    const next = !previous;
                    if (!next) stopSpeak();
                    return next;
                  });
                }}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  border: autoSpeak ? `1px solid ${R}` : "1px solid rgba(0,0,0,0.08)",
                  background: autoSpeak ? "rgba(212,32,32,0.08)" : "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title={autoSpeak ? "Auto voice replies on" : "Auto voice replies off"}
              >
                {autoSpeak ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={R}>
                    <path d="M11 5 6 9H2v6h4l5 4z" />
                    <path d="M15.5 8.5a5 5 0 0 1 0 7" stroke={R} strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="2" strokeLinecap="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                )}
              </button>

              <button
                onClick={() => setChatOpen(false)}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  border: "1px solid rgba(0,0,0,0.08)",
                  background: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="2.2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 14px 6px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {msgs.map((message) => (
              <div
                key={message.id}
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: message.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {message.role === "bot" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      maxWidth: "85%",
                      marginRight: "auto",
                    }}
                  >
                    <BotIcon size={26} />
                    <div>
                      <div
                        style={{
                          padding: "10px 14px",
                          borderRadius: "4px 16px 16px 16px",
                          background: "#f0f0f0",
                          color: TEXT,
                          fontSize: 13,
                          lineHeight: 1.6,
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          textAlign: "left",
                        }}
                      >
                        {message.text}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          marginTop: 3,
                          paddingLeft: 2,
                        }}
                      >
                        <span style={{ fontSize: 10, color: MUTED }}>{fmtTime(message.time)}</span>

                        <button
                          onClick={() => {
                            if (speakId === message.id && isSpeaking) stopSpeak();
                            else speak(message.text, message.lang, message.id);
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 2,
                            display: "flex",
                          }}
                        >
                          {speakId === message.id && isSpeaking ? (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill={R}>
                              <rect x="6" y="4" width="4" height="16" rx="1" />
                              <rect x="14" y="4" width="4" height="16" rx="1" />
                            </svg>
                          ) : (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="2" strokeLinecap="round">
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {message.role === "user" && (
                  <div
                    style={{
                      maxWidth: "78%",
                      marginLeft: "auto",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        padding: "10px 14px",
                        borderRadius: "16px 16px 4px 16px",
                        background: R,
                        color: "#fff",
                        fontSize: 13,
                        lineHeight: 1.55,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        fontWeight: 500,
                        minWidth: 110,
                        textAlign: "left",
                      }}
                    >
                      {message.text}
                    </div>

                    <div style={{ textAlign: "right", marginTop: 3, paddingRight: 2 }}>
                      <span style={{ fontSize: 10, color: MUTED }}>{fmtTime(message.time)}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {typing && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  width: "100%",
                  justifyContent: "flex-start",
                }}
              >
                <BotIcon size={26} />
                <div
                  style={{
                    padding: "12px 18px",
                    borderRadius: "4px 16px 16px 16px",
                    background: "#f0f0f0",
                  }}
                >
                  <div style={{ display: "flex", gap: 5 }}>
                    {[0, 1, 2].map((index) => (
                      <div
                        key={index}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: R,
                          opacity: 0.35,
                          animation: `bDot 1.2s ease ${index * 0.15}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!touched && msgs.length > 0 && !typing && (
              <div style={{ paddingLeft: 34, paddingTop: 4 }}>
                <div
                  style={{
                    fontSize: 10,
                    color: MUTED,
                    marginBottom: 6,
                    fontWeight: 500,
                  }}
                >
                  Try asking:
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {QUICK_CHIPS.map((chip, index) => (
                    <button
                      key={index}
                      onClick={() => send(chip)}
                      style={{
                        padding: "5px 12px",
                        borderRadius: 980,
                        fontSize: 11,
                        fontWeight: 500,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        background: "rgba(212,32,32,0.04)",
                        border: "1px solid rgba(212,32,32,0.12)",
                        color: R,
                        transition: "all .15s",
                      }}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          <div
            style={{
              padding: "10px 14px 14px",
              borderTop: "0.5px solid rgba(0,0,0,0.08)",
              flexShrink: 0,
              background: "#fff",
            }}
          >
            <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
              {LANGUAGE_OPTIONS.map((language) => (
                <button
                  key={language.value}
                  onClick={() => setMicLang(language.value)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 999,
                    border: micLang === language.value ? `1px solid ${R}` : "1px solid rgba(0,0,0,0.08)",
                    background: micLang === language.value ? "rgba(212,32,32,0.08)" : "#fff",
                    color: micLang === language.value ? R : TEXT,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {language.label}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  background: SOFT_BG,
                  borderRadius: 999,
                  border: "1px solid rgba(0,0,0,0.08)",
                  padding: "0 4px 0 16px",
                  minHeight: 44,
                }}
              >
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onFocus={unlockAudio}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      void send(input);
                    }
                  }}
                  placeholder="Type or use the mic..."
                  style={{
                    flex: 1,
                    background: "none",
                    border: "none",
                    outline: "none",
                    color: TEXT,
                    fontSize: 13,
                    padding: "11px 0",
                    fontFamily: "inherit",
                    minWidth: 0,
                  }}
                />

                <button
                  onClick={() => void send(input)}
                  disabled={!input.trim()}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "none",
                    background: input.trim() ? R : "transparent",
                    cursor: input.trim() ? "pointer" : "default",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all .15s",
                    flexShrink: 0,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? "#fff" : "#aaa"} strokeWidth="2.5" strokeLinecap="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>

              <button
                onClick={isListening ? stopListen : startListen}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  cursor: "pointer",
                  flexShrink: 0,
                  border: isListening ? `2px solid ${R}` : "1px solid rgba(0,0,0,0.08)",
                  background: SOFT_BG,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all .2s",
                  position: "relative",
                }}
                title={isListening ? "Stop listening" : "Start listening"}
              >
                {isListening && (
                  <div
                    style={{
                      position: "absolute",
                      inset: -6,
                      borderRadius: "50%",
                      border: "2px solid rgba(212,32,32,0.18)",
                      animation: "pulse 1.4s ease infinite",
                    }}
                  />
                )}

                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={isListening ? R : "#86868b"} strokeWidth="2" strokeLinecap="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </button>
            </div>

            {isListening && (
              <div style={{ textAlign: "center", marginTop: 6, fontSize: 11, color: R, fontWeight: 500 }}>
                Listening... speak naturally
              </div>
            )}

            {!isListening && !typing && (
              <div style={{ textAlign: "center", marginTop: 6, fontSize: 10.5, color: MUTED }}>
                {audioUnlocked ? "Voice replies are ready." : voicesReady ? "Tap the text box or mic once to enable voice replies." : "Loading voice support..."}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
