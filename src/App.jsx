import { useState, useRef, useEffect } from "react";
import Chatbot from "./ChatbotSmart";

/* ═══════════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════════ */
const useInView = (th = 0.1) => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } },
      { threshold: th }
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return [ref, v];
};

const Reveal = ({ children, delay = 0, dir = "up", style = {} }) => {
  const [ref, v] = useInView();
  const t = {
    up: v ? "translateY(0)" : "translateY(44px)",
    left: v ? "translateX(0)" : "translateX(-36px)",
    right: v ? "translateX(0)" : "translateX(36px)",
    scale: v ? "scale(1)" : "scale(0.94)",
  };
  return (
    <div ref={ref} style={{ ...style, opacity: v ? 1 : 0, transform: t[dir] || t.up, transition: `opacity .72s ease ${delay}s, transform .72s ease ${delay}s`, display: style.display || "block" }}>
      {children}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════════ */
const R = "#d42020";
const T = "#1d1d1f";
const M = "#6b7280";
const W = "#ffffff";
const S = "#f5f5f7";

/* ═══════════════════════════════════════════════════════
   PRODUCT DATA
═══════════════════════════════════════════════════════ */
const SECTIONS = [
  {
    id: "microatm",
    label: "MicroATM & 5G",
    title: "MicroATM & Hyper Terminal",
    subtitle: "From India's first 5G hyper terminal to doorstep banking all in one family.",
    products: [
      {
        name: "LeoPro®",
        tagline: "India's First 5G Hyper Terminal",
        desc: "Intelligent, identity-first Android POS device built for high-assurance identity, seamless payments, and last-mile service delivery with 5G speed.",
        img: "/images/leopro.png",
        badge: "5G Ready",
        color: "#0a84ff",
        features: ["5G / 4G Connectivity", "AI Face Authentication", "Aadhaar L1 Certified", "Dual Battery System"],
        specs: [["OS", "Android 15 GMS"], ["CPU", "Octa-core 2.3GHz"], ["Display", "6.74\" HD+"], ["Camera", "16MP AF + 13MP"]],
        certs: ["BIS", "WPC", "UIDAI", "IP5x", "RoHS"],
      },
      {
        name: "Leopard®",
        tagline: "Integrated Tablet Micro ATM",
        desc: "All-in-one portable Micro ATM combining fingerprint scanner, thermal printer, card reader, and tablet display for complete banking at the doorstep.",
        img: "/images/leopord.png",
        badge: "AEPS Ready",
        color: "#30d158",
        features: ["Aadhaar / MOSIP L1", "2\" Thermal Printer", "NFC + EMV + Mag", "MOSIP SBI Service"],
        specs: [["Display", "7/8/8.7\" Tablet"], ["Battery", "7.4V 2200mAh"], ["Weight", "950g"], ["OS", "Android"]],
        certs: ["BIS", "WPC", "RoHS"],
      },
      {
        name: "Falcon®",
        tagline: "Discrete Portable Micro ATM",
        desc: "Turns any smartphone or laptop into a full-featured Micro ATM with integrated printer, biometric scanner, and multi-card reader support.",
        img: "/images/falcon.png",
        badge: "Portable",
        color: "#ff9500",
        features: ["AEPS + eKYC", "2\" Thermal Printer", "Smart Card + NFC", "Bluetooth 2.1"],
        specs: [["Battery", "7.4V 1500mAh"], ["Weight", "300g"], ["Dims", "150×81×50mm"], ["OS", "Android/iOS/Win"]],
        certs: ["BIS", "WPC", "STQC", "RoHS"],
      },
    ],
  },
  {
    id: "pos",
    label: "Smart POS",
    title: "Android Smart POS",
    subtitle: "Endless possibilities for seamless payment solutions.",
    products: [
      {
        name: "LeoPOS Bio",
        tagline: "Smart Bio POS Terminal",
        desc: "One device for payments and biometric authentication. Aadhaar L1/L0/MOSIP certified with Android 14 Secure OS, EMV compliance, and PCI PTS 6.0.",
        img: "/images/leoposbio.png",
        badge: "PCI PTS 6.0",
        color: "#d42020",
        features: ["Aadhaar L1 / L0", "EMV + NFC + Mag", "Android 14 Secure", "5600mAh Battery"],
        specs: [["Display", "5.5\" IPS 1280×720"], ["Printer", "2\" @ 30LPS"], ["Battery", "5600mAh"], ["Weight", "440g"]],
        certs: ["EMV L1/L2", "PCI PTS 6.0", "RuPay", "Visa", "MC", "BIS"],
      },
      {
        name: "LeoPOS Smart®",
        tagline: "High-Speed Android POS",
        desc: "Secure, stylish, high-performance payment terminal supporting all major payment modes — swipe, chip, tap, QR, and biometric in a compact form factor.",
        img: "/images/leopossmart.png",
        badge: "EMV Certified",
        color: "#5e5ce6",
        features: ["Mag + Chip + NFC", "Barcode Scanner", "Android 14 OS", "GPS / GLONASS"],
        specs: [["Display", "5.5\" IPS HD"], ["Printer", "2\" @ 30LPS"], ["Battery", "5600mAh"], ["Weight", "440g"]],
        certs: ["EMV", "PCI/PTS", "RuPay", "UnionPay"],
      },
      {
        name: "UniPOS A5®",
        tagline: "Omni-Channel Payment Solution",
        desc: "India's first certified POS with multi-biometric authentication — fingerprint, iris, face, and voice in a single rugged field-ready device.",
        img: "/images/UNIPOS-A5.png",
        badge: "Multi-Biometric",
        color: "#00b8d9",
        features: ["4-in-1 Biometrics", "Voice Authentication", "7800mAh Battery", "STQC Certified"],
        specs: [["Display", "5.5\" LCD 1280×720"], ["Battery", "7800mAh"], ["Weight", "480g"], ["Camera", "8MP AF + 5MP"]],
        certs: ["WPC", "PCI PTS", "Aadhaar"],
      },
    ],
  },
  {
    id: "fingerprint",
    label: "Biometrics",
    title: "Fingerprint Sensors",
    subtitle: "Precision biometric identity for enterprise and government.",
    products: [
      {
        name: "eScan",
        tagline: "Aadhaar L0 / L1 Fingerprint Module",
        desc: "FAP20 thermal fingerprint sensor with 500 DPI imaging, scratch-free sensor, anti-spoofing, and USB plug-and-play. MOSIP-compatible globally.",
        img: "/images/ecan.png",
        badge: "STQC Certified",
        color: "#30d158",
        features: ["500 DPI FAP20", "Scratch-Free Sensor", "Anti-Spoofing", "USB Plug & Play"],
        specs: [["Resolution", "500 DPI"], ["Capture Area", "312mm²"], ["Interface", "USB 2.0"], ["Weight", "45g"]],
        certs: ["STQC", "FBI PIV IQS", "MOSIP"],
      },
      {
        name: "Identi5®",
        tagline: "Portable Bluetooth Biometric Device",
        desc: "Pocket-sized Aadhaar L1 fingerprint scanner with wireless Bluetooth connectivity. Pairs instantly with any smartphone for mobile eKYC and payments.",
        img: "/images/Identi5.png",
        badge: "Bluetooth L1",
        color: "#0a84ff",
        features: ["Aadhaar L1 Certified", "Bluetooth 2.1", "Optional BLE 5.0", "800mAh Rechargeable"],
        specs: [["Resolution", "500 DPI"], ["Dims", "65×40×25mm"], ["Weight", "90g"], ["Battery", "800mAh"]],
        certs: ["BIS", "STQC", "RoHS", "MOSIP"],
      },
    ],
  },
  {
    id: "soundbox",
    label: "Sound Box",
    title: "Ampli5 Sound Box",
    subtitle: "Crystal-clear UPI payment confirmations for every merchant.",
    products: [
      {
        name: "Ampli5",
        tagline: "QR Code Sound Box for UPI Payments",
        desc: "Instant audio payment confirmation for UPI and QR payments. 3W loud speaker with real voice broadcast. Available in Static + LED and Dynamic variants.",
        img: "/images/Ampli5.png",
        badge: "UPI Ready",
        color: "#ff9500",
        features: ["3W / 4Ω Speaker", "Real Voice Broadcast", "4G + Optional Wi-Fi", "2000mAh Battery"],
        specs: [["Battery", "2000mAh"], ["Weight", "280g"], ["Dims", "135×97×29mm"], ["Speaker", "3W 4Ω"]],
        certs: ["RoHS", "WPC", "BIS"],
      },
    ],
  },
  {
    id: "printers",
    label: "Printers",
    title: "Thermal Printers",
    subtitle: "Fast, portable, and reliable printing for field operations.",
    products: [
      {
        name: "Impress+®",
        tagline: "2\" Bluetooth Thermal Printer",
        desc: "Compact, lightweight 2-inch thermal printer with Bluetooth, BLE 5.0, and USB. Supports barcode, QR code, Unicode, and multilingual printing. IP54 rated.",
        img: "/images/Impress-.png",
        badge: "IP54 Rated",
        color: "#636366",
        features: ["203 DPI Thermal", "Bluetooth + BLE 5.0", "Barcode & QR", "Multi-language Unicode"],
        specs: [["Print Width", "48mm"], ["Speed", "20LPS / 60mm/s"], ["Weight", "160–237g"], ["Battery", "7.4V 2600mAh"]],
        certs: ["IP54", "RoHS"],
      },
      {
        name: "Impress Pro®",
        tagline: "3\" Wide-Format Bluetooth Printer",
        desc: "High-speed wide-format 3-inch thermal printer for field-intensive operations. QR codes, multilingual, missing paper alarm, and easy paper loading.",
        img: "/images/Impress-Pro.png",
        badge: "Wide Format",
        color: "#8e8e93",
        features: ["3\" Wide 72mm Print", "High-Speed 70mm/s", "Bluetooth 2.1", "QR + 1D/2D Barcodes"],
        specs: [["Print Width", "72mm"], ["Speed", "70mm/s"], ["Weight", "230–300g"], ["Battery", "7.4V"]],
        certs: ["RoHS"],
      },
    ],
  },
  {
    id: "geo",
    label: "GeoSync",
    title: "Geo-Intelligence Solutions",
    subtitle: "Sub-meter precision positioning for identity and governance.",
    products: [
      {
        name: "GeoSync®",
        tagline: "High-Accuracy GNSS GPS Receiver",
        desc: "Dual-band GNSS receiver with NavIC, GPS, GLONASS, BDS, Galileo, and QZSS support. Sub-meter precision for Aadhaar enrolment and government field programs.",
        img: "/images/GeoSync.png",
        badge: "IP6X Rated",
        color: "#30d158",
        features: ["NavIC + GPS + GLONASS", "Sub-meter Precision", "72 Satellite Support", "USB Plug & Play"],
        specs: [["Hot Start", "4 seconds"], ["Cold Start", "30–40 sec"], ["Interface", "USB 2.0 Type-A"], ["Power", "5V / 45mA"]],
        certs: ["WPC", "IP6X", "Drop Test"],
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════════ */
const Badge = ({ text, color }) => (
  <span style={{ display: "inline-flex", alignItems: "center", padding: "5px 12px", borderRadius: 980, background: `${color}15`, color, fontSize: 12, fontWeight: 700, letterSpacing: 0.3, border: `1px solid ${color}25` }}>
    {text}
  </span>
);

const Cert = ({ text }) => (
  <span style={{ padding: "4px 10px", borderRadius: 6, background: S, color: "#3a3a3c", fontSize: 11, fontWeight: 600, border: "1px solid rgba(0,0,0,0.07)", letterSpacing: 0.2 }}>
    {text}
  </span>
);

const ProductCard = ({ product, delay = 0 }) => {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: W, borderRadius: 20, border: "1px solid rgba(0,0,0,0.07)",
          overflow: "hidden", transition: "all .3s ease",
          transform: hov ? "translateY(-5px)" : "translateY(0)",
          boxShadow: hov ? "0 20px 50px rgba(0,0,0,0.08)" : "0 1px 8px rgba(0,0,0,0.04)",
          flex: 1, display: "flex", flexDirection: "column",
        }}
      >
        {/* ── Image area – fixed 200px ── */}
        <div style={{
          background: S, height: 200, position: "relative", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <img
            src={product.img} alt={product.name}
            style={{ maxHeight: 170, maxWidth: "75%", objectFit: "contain", transition: "transform .35s ease", transform: hov ? "scale(1.05)" : "scale(1)" }}
          />
          <div style={{ position: "absolute", top: 12, left: 12 }}>
            <Badge text={product.badge} color={product.color} />
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ padding: "20px 22px 22px", flex: 1, display: "flex", flexDirection: "column", gap: 0 }}>

          {/* Name + tagline */}
          <div style={{ marginBottom: 10 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.4, margin: "0 0 3px", color: T, lineHeight: 1.2 }}>{product.name}</h3>
            <p style={{ fontSize: 12, fontWeight: 600, color: product.color, margin: 0, letterSpacing: 0.1 }}>{product.tagline}</p>
          </div>

          {/* Description */}
          <p style={{ fontSize: 13.5, color: M, lineHeight: 1.6, margin: "0 0 16px", textAlign: "left" }}>{product.desc}</p>

          {/* Features – strict 2-column grid, always 2 per row */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 8px", marginBottom: 16,
          }}>
            {product.features.map((f, i) => (
              <div key={i} style={{
                fontSize: 11.5, color: "#3a3a3c", background: S,
                padding: "6px 10px", borderRadius: 7, fontWeight: 500,
                display: "flex", alignItems: "flex-start", gap: 5, lineHeight: 1.35,
              }}>
                <span style={{ color: product.color, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>

          {/* Specs – 2×2 grid, equal height cells */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 16 }}>
            {product.specs.map(([k, v], i) => (
              <div key={i} style={{ background: S, borderRadius: 9, padding: "9px 11px", minHeight: 52 }}>
                <div style={{ fontSize: 9.5, color: M, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 3 }}>{k}</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: T, lineHeight: 1.3 }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Certs – natural flow after specs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {product.certs.map((c, i) => <Cert key={i} text={c} />)}
          </div>
        </div>
      </div>
    </Reveal>
  );
};

/* ═══════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════ */
export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenu(false);
  };

  return (
    <div style={{ fontFamily: "-apple-system,'SF Pro Display','Helvetica Neue',Helvetica,sans-serif", background: W, color: T, width: "100%",  maxWidth: "100vw",minHeight: "100vh", overflowX: "clip" }}>

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 72, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(16px,4vw,52px)", background: scrolled ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.80)", backdropFilter: "saturate(180%) blur(20px)", WebkitBackdropFilter: "saturate(180%) blur(20px)", borderBottom: scrolled ? "0.5px solid rgba(0,0,0,0.1)" : "0.5px solid transparent", transition: "all .3s ease" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <img
            src="/images/logo.png"
            alt="Evolute Fintech"
            style={{ height: 36, width: "auto", objectFit: "contain", display: "block" }}
          />
        </div>

        {/* Desktop nav links */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="nav-links">
          {["microatm", "pos", "fingerprint", "soundbox", "printers", "geo"].map((id) => {
            const sec = SECTIONS.find(s => s.id === id);
            return (
              <button key={id} onClick={() => scrollTo(id)} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: activeSection === id ? `${R}10` : "transparent", color: activeSection === id ? R : M, fontWeight: 500, fontSize: 13.5, cursor: "pointer", fontFamily: "inherit", transition: "all .2s", whiteSpace: "nowrap" }}
                onMouseEnter={e => e.currentTarget.style.background = `${R}08`}
                onMouseLeave={e => e.currentTarget.style.background = activeSection === id ? `${R}10` : "transparent"}
              >
                {sec?.label}
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button   className="nav-chat-btn" onClick={() => setChatOpen(true)} style={{ padding: "9px 22px", borderRadius: 999, border: "none", background: R, color: W, fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "inherit", transition: "all .2s", flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.background = "#b71c1c"; e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = R; e.currentTarget.style.transform = "scale(1)"; }}
          >
            Chat with Us
          </button>
          {/* Hamburger */}
          <button onClick={() => setMobileMenu(!mobileMenu)} className="hamburger" style={{ background: "none", border: "none", cursor: "pointer", display: "none", padding: 6, flexDirection: "column", gap: 5 }}>
            <span style={{ width: 22, height: 2, background: T, borderRadius: 2, display: "block", transition: "all .2s", transform: mobileMenu ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ width: 22, height: 2, background: T, borderRadius: 2, display: "block", opacity: mobileMenu ? 0 : 1, transition: "all .2s" }} />
            <span style={{ width: 22, height: 2, background: T, borderRadius: 2, display: "block", transition: "all .2s", transform: mobileMenu ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      {mobileMenu && (
        <div style={{ position: "fixed", top: 72, left: 0, right: 0, zIndex: 190, background: W, borderBottom: "1px solid rgba(0,0,0,0.08)", padding: "16px clamp(16px,4vw,52px)", display: "flex", flexDirection: "column", gap: 4 }}>
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)} style={{ padding: "12px 16px", borderRadius: 10, border: "none", background: "transparent", color: T, fontWeight: 500, fontSize: 15, cursor: "pointer", fontFamily: "inherit", textAlign: "left", transition: "background .2s" }}
              onMouseEnter={e => e.currentTarget.style.background = S}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "110px clamp(16px,5vw,60px) 80px", background: W, position: "relative", overflow: "hidden" }}>
        {/* background decoration */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "10%", left: "5%", width: "clamp(300px,40vw,600px)", height: "clamp(300px,40vw,600px)", borderRadius: "50%", background: `radial-gradient(circle, ${R}08 0%, transparent 70%)`, filter: "blur(40px)" }} />
          <div style={{ position: "absolute", bottom: "15%", right: "5%", width: "clamp(200px,30vw,400px)", height: "clamp(200px,30vw,400px)", borderRadius: "50%", background: "radial-gradient(circle, #0a84ff08 0%, transparent 70%)", filter: "blur(40px)" }} />
        </div>

        <Reveal>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 980, border: "1px solid rgba(212,32,32,0.2)", background: `${R}08`, marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: R, animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: R, letterSpacing: 1.5, textTransform: "uppercase" }}>Techpowering the World</span>
          </div>

          <h1 style={{ fontSize: "clamp(44px,9vw,96px)", fontWeight: 800, lineHeight: 1.02, letterSpacing: -4, margin: "0 0 24px", color: T }}>
            Fintech Devices<br />
            <span style={{ color: R }}>Built for Bharat.</span>
          </h1>

          <p style={{ fontSize: "clamp(17px,2.2vw,24px)", color: M, maxWidth: 600, margin: "0 auto 44px", lineHeight: 1.5, fontWeight: 400 }}>
            Aadhaar-certified terminals, biometric scanners, smart POS, and payment solutions engineered for India's digital economy.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 60 }}>
            <button onClick={() => scrollTo("microatm")} style={{ padding: "14px 36px", borderRadius: 980, border: "none", background: T, color: W, fontWeight: 600, fontSize: 16, cursor: "pointer", fontFamily: "inherit", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#000"; e.currentTarget.style.transform = "scale(1.03)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = T; e.currentTarget.style.transform = "scale(1)"; }}
            >
              Explore Products
            </button>
            <button onClick={() => setChatOpen(true)} style={{ padding: "14px 36px", borderRadius: 980, border: `1.5px solid rgba(0,0,0,0.12)`, background: W, color: T, fontWeight: 600, fontSize: 16, cursor: "pointer", fontFamily: "inherit", transition: "all .2s" }}
              onMouseEnter={e => e.currentTarget.style.background = S}
              onMouseLeave={e => e.currentTarget.style.background = W}
            >
              💬 Talk to an Expert
            </button>
          </div>

          {/* Product lineup image */}
          <div style={{ width: "100%", maxWidth: 1000, margin: "0 auto", borderRadius: 24, overflow: "hidden", boxShadow: "0 32px 100px rgba(0,0,0,0.1)", border: "1px solid rgba(0,0,0,0.06)" }}>
            <img src="/images/Fintech-Website-Banner_jpg.jpeg" alt="Evolute Product Lineup" style={{ width: "100%", height: "auto", display: "block" }} />
          </div>
        </Reveal>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: T, padding: "clamp(32px,4vw,52px) clamp(16px,5vw,60px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(200px,100%),1fr))", gap: 1 }}>
          {[
            ["12+", "Product Families"],
            ["Aadhaar L1", "Certified Devices"],
            ["MOSIP", "Compatible"],
            ["PCI PTS 6.0", "Compliant POS"],
            ["BIS / WPC", "Certified Portfolio"],
          ].map(([val, label], i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div style={{ textAlign: "center", padding: "clamp(20px,2.5vw,32px) clamp(12px,2vw,24px)" }}>
                <div style={{ fontSize: "clamp(20px,2.8vw,30px)", fontWeight: 800, color: W, letterSpacing: -0.5, marginBottom: 4 }}>{val}</div>
                <div style={{ fontSize: "clamp(11px,1.2vw,13px)", color: "rgba(255,255,255,0.55)", fontWeight: 500, letterSpacing: 0.3, textTransform: "uppercase" }}>{label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PRODUCT SECTIONS ── */}
      {SECTIONS.map((sec, si) => {
        const n = sec.products.length;
        // Max-width constrains the grid so fewer cards don't stretch full width
        const maxW = n === 1 ? 500 : n === 2 ? 800 : 1120;
        const bg = si % 2 === 0 ? W : S;
        return (
          <section key={sec.id} id={sec.id} style={{ width: "100%", padding: "clamp(80px,10vw,120px) clamp(16px,5vw,60px)", background: bg }}>
            {/* Section header */}
            <Reveal>
              <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto clamp(40px,5vw,64px)" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: R, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 10 }}>{sec.label}</p>
                <h2 style={{ fontSize: "clamp(30px,5vw,54px)", fontWeight: 700, letterSpacing: -2, lineHeight: 1.07, color: T, margin: "0 0 14px" }}>{sec.title}</h2>
                <p style={{ fontSize: "clamp(15px,1.7vw,19px)", color: M, lineHeight: 1.55 }}>{sec.subtitle}</p>
              </div>
            </Reveal>

            <div style={{
              display: "grid",
              gridTemplateColumns: `repeat(auto-fit, minmax(min(${n === 1 ? "400px" : "280px"}, 100%), 1fr))`,
              gap: "clamp(16px,2vw,22px)",
              maxWidth: maxW,
              margin: "0 auto",
              width: "100%",
              alignItems: "stretch",
            }}>
              {sec.products.map((p, pi) => (
                <ProductCard key={pi} product={p} delay={pi * 0.08} />
              ))}
            </div>
          </section>
        );
      })}

      {/* ── WHY EVOLUTE ── */}
      <section style={{ background: T, padding: "clamp(80px,10vw,120px) clamp(16px,5vw,60px)", color: W }}>
        <Reveal>
          <p style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: R, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 10 }}>Why Evolute</p>
          <h2 style={{ textAlign: "center", fontSize: "clamp(30px,5vw,52px)", fontWeight: 700, letterSpacing: -2, color: W, margin: "0 0 16px", lineHeight: 1.07 }}>
            The Complete FinTech Stack.
          </h2>
          <p style={{ textAlign: "center", fontSize: "clamp(15px,1.7vw,19px)", color: "rgba(255,255,255,0.6)", maxWidth: 560, margin: "0 auto 60px", lineHeight: 1.55 }}>
            From identity verification to payment acceptance every layer covered.
          </p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px,100%),1fr))", gap: 14, maxWidth: 980, margin: "0 auto", width: "100%" }}>
          {[
            { icon: "🏅", title: "Aadhaar Certified", desc: "L0 and L1 certified devices for every authentication need from sensors to full POS terminals." },
            { icon: "🌍", title: "MOSIP Compatible", desc: "Built for global digital identity programs. Compatible with MOSIP's open-source identity platform." },
            { icon: "🔒", title: "Bank-Grade Security", desc: "PCI PTS 6.0, EMV compliant, DUKPT encrypted. Every transaction protected end-to-end." },
            { icon: "📡", title: "5G Ready", desc: "India's first 5G fintech terminal. Real-time transactions wherever there's a signal." },
            { icon: "🛠️", title: "SDK & Integration", desc: "Java, .NET, C#, Android, iOS comprehensive SDKs for rapid application development." },
            { icon: "🔬", title: "Indigenous Technology", desc: "Designed and built in India. Purpose-engineered for Indian regulatory and field conditions." },
          ].map((f, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div style={{ padding: "clamp(22px,2.5vw,30px)", borderRadius: 18, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.border = `1px solid ${R}30`; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)"; }}
              >
                <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontSize: "clamp(16px,1.6vw,18px)", fontWeight: 700, margin: "0 0 8px", color: W }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CERTIFICATIONS MARQUEE ── */}
      <section style={{ background: S, padding: "clamp(60px,7vw,80px) 0", overflow: "hidden" }}>
        <Reveal>
          <p style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: R, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 8 }}>Certifications & Compliance</p>
          <h2 style={{ textAlign: "center", fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 700, letterSpacing: -1, color: T, margin: "0 0 40px", lineHeight: 1.1 }}>
            Certified at every level.
          </h2>
        </Reveal>
        <div style={{ overflow: "hidden", position: "relative" }}>
          <div style={{ display: "flex", gap: 12, animation: "marquee 28s linear infinite", width: "max-content" }}>
            {["Aadhaar L1", "Aadhaar L0", "MOSIP", "STQC", "BIS", "WPC", "RoHS", "EMV Contact L1/L2", "EMV Contactless", "PCI PTS 6.0", "FBI PIV IQS", "IP6X", "IP54", "IP5x", "RuPay qSPARC", "Visa PayWave", "Mastercard PayPass", "UnionPay", "UIDAI", "Drop Test", "CE", "Aadhaar L1", "Aadhaar L0", "MOSIP", "STQC", "BIS", "WPC", "RoHS", "EMV Contact L1/L2", "EMV Contactless", "PCI PTS 6.0", "FBI PIV IQS", "IP6X", "IP54", "IP5x", "RuPay qSPARC"].map((cert, i) => (
              <div key={i} style={{ flexShrink: 0, padding: "10px 20px", borderRadius: 12, background: W, border: "1px solid rgba(0,0,0,0.07)", fontSize: 13, fontWeight: 600, color: T, whiteSpace: "nowrap", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section style={{ background: W, padding: "clamp(80px,10vw,120px) clamp(16px,5vw,60px)" }}>
        <Reveal>
          <p style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: R, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 10 }}>Industries</p>
          <h2 style={{ textAlign: "center", fontSize: "clamp(30px,5vw,52px)", fontWeight: 700, letterSpacing: -2, color: T, margin: "0 0 16px", lineHeight: 1.07 }}>
            Trusted across sectors.
          </h2>
          <p style={{ textAlign: "center", fontSize: "clamp(15px,1.7vw,18px)", color: M, maxWidth: 520, margin: "0 auto 52px", lineHeight: 1.55 }}>
            From village kirana stores to central bank programs Evolute powers them all.
          </p>
        </Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, maxWidth: 960, margin: "0 auto", width: "100%" }}>
          {["🏦 BFSI & Banking", "🏧 Micro ATM / AEPS", "🏛️ e-Governance", "📡 Telecom", "🏪 Retail & Kirana", "🚌 Transit", "💊 Healthcare", "🌾 Agriculture / DBT", "🎓 Education", "🏗️ NBFCs & Microfinance", "⛽ Fuel Stations", "📋 eKYC Centers"].map((ind, i) => (
            <Reveal key={i} delay={i * 0.03}>
              <div style={{ padding: "11px 22px", borderRadius: 980, background: S, border: "1px solid rgba(0,0,0,0.06)", fontSize: "clamp(13px,1.4vw,15px)", fontWeight: 500, color: T, cursor: "default", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = `${R}08`; e.currentTarget.style.borderColor = `${R}20`; e.currentTarget.style.color = R; }}
                onMouseLeave={e => { e.currentTarget.style.background = S; e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)"; e.currentTarget.style.color = T; }}
              >
                {ind}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: S, padding: "clamp(80px,10vw,120px) clamp(16px,5vw,60px)", textAlign: "center" }}>
        <Reveal>
          <p style={{ fontSize: 12, fontWeight: 700, color: R, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 14 }}>Get Started</p>
          <h2 style={{ fontSize: "clamp(30px,5.5vw,58px)", fontWeight: 800, letterSpacing: -2.5, color: T, margin: "0 0 18px", lineHeight: 1.05 }}>
            Ready to power<br />your business?
          </h2>
          <p style={{ fontSize: "clamp(15px,1.8vw,20px)", color: M, maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.5 }}>
            Talk to our product experts or browse the complete portfolio.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setChatOpen(true)} style={{ padding: "15px 40px", borderRadius: 980, border: "none", background: R, color: W, fontWeight: 700, fontSize: 16, cursor: "pointer", fontFamily: "inherit", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#b71c1c"; e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = R; e.currentTarget.style.transform = "scale(1)"; }}
            >
              💬 Chat with an Expert
            </button>
            <button onClick={() => scrollTo("microatm")} style={{ padding: "15px 40px", borderRadius: 980, border: "1.5px solid rgba(0,0,0,0.12)", background: W, color: T, fontWeight: 600, fontSize: 16, cursor: "pointer", fontFamily: "inherit", transition: "all .2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#ebebeb"}
              onMouseLeave={e => e.currentTarget.style.background = W}
            >
              Browse Products
            </button>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: T, padding: "clamp(40px,5vw,60px) clamp(16px,5vw,60px) clamp(24px,3vw,36px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(200px,100%),1fr))", gap: "clamp(32px,4vw,48px)", marginBottom: "clamp(32px,4vw,48px)" }}>
            {/* Brand */}
            <div>
              <div style={{ marginBottom: 14 }}>
                <img src="/images/logo.png" alt="Evolute Fintech" style={{ height: 30, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)", display: "block" }} />
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: 0 }}>Techpowering the world with secure, certified, and innovative fintech solutions.</p>
            </div>

            {/* Products */}
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: 1.2, textTransform: "uppercase", margin: "0 0 16px" }}>Products</h4>
              {["LeoPro®", "Leopard®", "Falcon®", "LeoPOS Bio", "LeoPOS Smart®", "UniPOS A5®"].map((p, i) => (
                <div key={i} style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 8, cursor: "pointer", transition: "color .2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = W}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                >{p}</div>
              ))}
            </div>

            {/* More products */}
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: 1.2, textTransform: "uppercase", margin: "0 0 16px" }}>More</h4>
              {["eScan", "Identi5®", "Ampli5", "Impress+®", "Impress Pro®", "GeoSync®"].map((p, i) => (
                <div key={i} style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 8, cursor: "pointer", transition: "color .2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = W}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                >{p}</div>
              ))}
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: 1.2, textTransform: "uppercase", margin: "0 0 16px" }}>Support</h4>
              {[["💬 Live Chat", true], ["Documentation", false], ["Developer SDK", false], ["Privacy Policy", false], ["Terms of Service", false]].map(([label, isChat], i) => (
                <div key={i} onClick={isChat ? () => setChatOpen(true) : undefined}
                  style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 8, cursor: "pointer", transition: "color .2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = W}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                >{label}</div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "clamp(20px,2.5vw,28px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>© 2026 Evolute Fintech Innovations Pvt. Ltd. All rights reserved.</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Made in India 🇮🇳</div>
          </div>
        </div>
      </footer>

      <Chatbot chatOpen={chatOpen} setChatOpen={setChatOpen} />

      <style>{`
        *,*::before,*::after { box-sizing: border-box; }
        
        html,body,#root { margin:0; padding:0; width:100%; max-width:100%; overflow-x:clip; background:#ffffff; }
        body { font-family:-apple-system,'SF Pro Display','Helvetica Neue',Helvetica,sans-serif; color:#1d1d1f; }
        h1,h2,h3,h4,h5,h6 { margin:0; }
        p { margin:0; }
        button { font-family:inherit; }
        html, body {
  scrollbar-width: none;      /* Firefox */
  -ms-overflow-style: none;   /* IE/Edge */
}

html::-webkit-scrollbar,
body::-webkit-scrollbar {
  display: none;              /* Chrome/Safari */
}

        @keyframes pulse {
          0%,100% { opacity:.5; transform:scale(1); }
          50% { opacity:1; transform:scale(1.3); }
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* Hide nav links on mobile, show hamburger */
        @media (max-width: 760px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
        }

        @media (max-width: 900px) {
          .nav-links button { font-size: 12px !important; padding: 6px 10px !important; }
        }

        @media (max-width: 760px) {
  .nav-links { display: none !important; }
  .hamburger { display: flex !important; }
  .nav-chat-btn { display: none !important; }
}

        /* Smooth scroll */
        html { scroll-behavior: smooth; }

        /* Remove tap highlight on mobile */
        button { -webkit-tap-highlight-color: transparent; }

        /* Image rendering */
        img { -webkit-user-drag: none; }
      `}</style>
    </div>
  );
}