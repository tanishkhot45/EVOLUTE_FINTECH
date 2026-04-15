
const API_URL = import.meta.env.VITE_CHAT_API_URL || "";

const T = {
  en: {
    overview: "Overview",
    features: "Key features",
    applications: "Applications",
    os: "Operating system",
    processor: "Processor",
    display: "Display",
    camera: "Camera",
    memory: "Memory",
    biometric: "Biometric",
    payments: "Payments",
    connectivity: "Connectivity",
    battery: "Battery",
    printer: "Printer",
    cards: "Card reader",
    dimensions: "Dimensions",
    weight: "Weight",
    environment: "Environment",
    certifications: "Certifications",
    integration: "SDK / integration",
    modelOnly: "AI mode",
    localOnly: "",
    unknown: "I can help with these products: LeoPOS Bio, LeoPOS Smart, UniPOS A5, LeoPro, Leopard, Falcon, Identi5, eScan L0, eScan L1, Ampli5, Impress+, Impress Pro, and GeoSync. Ask about a specific product, or ask me to compare two of them.",
    price: "For the latest price, please contact our customer care or sales team. Pricing can vary by model, configuration, and order quantity.",
    compareLead: (a, b) => `Here is a quick comparison between ${a.name} and ${b.name}:`,
    suggested: (name) => `I think you are asking about ${name}.`,
    noIntent: (name) => `Here is a simple overview of ${name}.`,
    apiFailed: "",
  },
  hi: {
    overview: "ओवरव्यू",
    features: "मुख्य फीचर्स",
    applications: "उपयोग",
    os: "ऑपरेटिंग सिस्टम",
    processor: "प्रोसेसर",
    display: "डिस्प्ले",
    camera: "कैमरा",
    memory: "मेमोरी",
    biometric: "बायोमेट्रिक",
    payments: "पेमेंट",
    connectivity: "कनेक्टिविटी",
    battery: "बैटरी",
    printer: "प्रिंटर",
    cards: "कार्ड रीडर",
    dimensions: "डायमेंशन्स",
    weight: "वज़न",
    environment: "एनवायरनमेंट",
    certifications: "सर्टिफिकेशन्स",
    integration: "SDK / इंटीग्रेशन",
    modelOnly: "AI मोड",
    localOnly: "",
    unknown: "मैं इन प्रोडक्ट्स पर मदद कर सकता हूँ: LeoPOS Bio, LeoPOS Smart, UniPOS A5, LeoPro, Leopard, Falcon, Identi5, eScan L0, eScan L1, Ampli5, Impress+, Impress Pro, और GeoSync. किसी एक प्रोडक्ट का नाम बोलें या दो प्रोडक्ट compare करने को कहें।",
    price: "ताज़ा कीमत के लिए कृपया हमारी customer care या sales team से संपर्क करें। कीमत मॉडल, configuration और quantity के हिसाब से बदल सकती है।",
    compareLead: (a, b) => `${a.name} और ${b.name} का practical comparison:`,
    suggested: (name) => `लगता है आप ${name} के बारे में पूछ रहे हैं।`,
    noIntent: (name) => `${name} के बारे में एक आसान overview:`,
    apiFailed: "",
  },
  mr: {
    overview: "ओव्हरव्ह्यू",
    features: "मुख्य फीचर्स",
    applications: "वापर",
    os: "ऑपरेटिंग सिस्टम",
    processor: "प्रोसेसर",
    display: "डिस्प्ले",
    camera: "कॅमेरा",
    memory: "मेमरी",
    biometric: "बायोमेट्रिक",
    payments: "पेमेंट",
    connectivity: "कनेक्टिव्हिटी",
    battery: "बॅटरी",
    printer: "प्रिंटर",
    cards: "कार्ड रीडर",
    dimensions: "डायमेन्शन्स",
    weight: "वजन",
    environment: "एन्व्हायर्नमेंट",
    certifications: "सर्टिफिकेशन्स",
    integration: "SDK / इंटिग्रेशन",
    modelOnly: "AI मोड",
    localOnly: "",
    unknown: "मी या products बद्दल मदत करू शकतो: LeoPOS Bio, LeoPOS Smart, UniPOS A5, LeoPro, Leopard, Falcon, Identi5, eScan L0, eScan L1, Ampli5, Impress+, Impress Pro, आणि GeoSync. एखाद्या specific product चे नाव विचारा किंवा दोन products compare करायला सांगा.",
    price: "नवीन किंमतीसाठी कृपया आमच्या customer care किंवा sales team शी संपर्क साधा. किंमत model, configuration आणि quantity नुसार बदलू शकते.",
    compareLead: (a, b) => `${a.name} आणि ${b.name} यांची practical comparison:`,
    suggested: (name) => `बहुतेक तुम्ही ${name} बद्दल विचारत आहात.`,
    noIntent: (name) => `${name} बद्दल सोपी माहिती:`,
    apiFailed: "",
  },
};

const PRODUCTS = [
  {
    id: "escan_l0",
    name: "eScan L0",
    category: "Fingerprint Sensor",
    aliases: ["escan l0", "escan", "escan l zero", "escan sensor l0"],
    overview: {
      en: "eScan L0 is a compact Aadhaar-ready and MOSIP-ready fingerprint module for identity, enrolment, and verification use cases.",
      hi: "eScan L0 एक compact Aadhaar-ready और MOSIP-ready fingerprint module है जो identity, enrolment और verification workflows के लिए बना है।",
      mr: "eScan L0 हे compact Aadhaar-ready आणि MOSIP-ready fingerprint module आहे जे identity, enrolment आणि verification workflows साठी बनवलेले आहे.",
    },
    features: [
      "L0 compliant fingerprint module",
      "FBI PIV IQS compliant / certified sensor quality",
      "MOSIP-ready for identity projects",
      "FAP20 scratch-free thermal sensor",
      "Supports ISO 19794-2 and ISO 19794-4",
      "Compact and lightweight design",
    ],
    applications: ["BFSI", "e-Governance", "Telecom", "National ID programs", "MOSIP implementations", "Enterprise enrolment"],
    facts: {
      os: "Android and Windows",
      display: "No built-in display; fingerprint module form factor",
      biometric: "FAP20 thermal fingerprint sensor, 500 DPI, 312 mm² capture area, 400 × 300 output image",
      connectivity: "High-speed USB 2.0, USB powered",
      battery: "USB-powered, 5V / 500mA",
      dimensions: "61 × 41 × 14 mm",
      weight: "45 g",
      environment: "Operating temperature 0°C to 50°C",
      certifications: "L0 compliant, FBI PIV IQS compliant / certified sensor quality, MOSIP ready",
      integration: "Supports ISO 19794-2 minutiae and ISO 19794-4 image formats",
    },
  },
  {
    id: "escan_l1",
    name: "eScan L1",
    category: "Fingerprint Sensor",
    aliases: ["escan l1", "escan sensor l1", "l1 escan"],
    overview: {
      en: "eScan L1 is an Aadhaar STQC-certified fingerprint scanner built for secure eKYC, AEPS, telecom, and e-Governance workflows.",
      hi: "eScan L1 एक Aadhaar STQC-certified fingerprint scanner है जो secure eKYC, AEPS, telecom और e-Governance workflows के लिए बना है।",
      mr: "eScan L1 हा Aadhaar STQC-certified fingerprint scanner आहे जो secure eKYC, AEPS, telecom आणि e-Governance workflows साठी बनवला आहे.",
    },
    features: [
      "Aadhaar STQC-certified",
      "Active thermal spoof detection",
      "Encrypted PID block support",
      "FBI PIV IQS certified",
      "Supports ISO 19794-2 and ISO 19794-4",
      "Compact field-ready design",
    ],
    applications: ["Telecom", "Micro ATM", "e-Governance", "AEPS", "BFSI"],
    facts: {
      os: "Android 7.0+ and Windows 10+",
      biometric: "Aadhaar authentication-ready FAP20 thermal sensor, 500 PPI, 312 mm² capture area, active thermal spoof detection",
      connectivity: "High-speed USB 2.0",
      battery: "5V / 500mA via USB",
      dimensions: "60.5 × 41 × 14 mm",
      weight: "45 g",
      environment: "Operating temperature 0°C to 50°C, storage temperature 0°C to 60°C, humidity 95% RH non-condensing",
      certifications: "Aadhaar STQC certified, FBI PIV IQS certified",
      integration: "Encrypted PID block support and ISO 19794-2/4 templates",
    },
  },
  {
    id: "identi5",
    name: "Identi5",
    category: "Bluetooth Biometric Device",
    aliases: ["identi5", "identi 5", "identity5", "portable bluetooth biometric"],
    overview: {
      en: "Identi5 is a pocket-sized Bluetooth biometric device designed for fast Aadhaar L1 authentication, eKYC, and mobile identity workflows.",
      hi: "Identi5 एक pocket-sized Bluetooth biometric device है जो तेज Aadhaar L1 authentication, eKYC और mobile identity workflows के लिए बना है।",
      mr: "Identi5 हे pocket-sized Bluetooth biometric device आहे जे जलद Aadhaar L1 authentication, eKYC आणि mobile identity workflows साठी तयार केलेले आहे.",
    },
    features: [
      "Portable Bluetooth biometric device",
      "MOSIP and Aadhaar L1 fingerprint scanner",
      "STQC-certified thermal sensor",
      "Rechargeable battery for mobile usage",
      "Android and iOS compatibility",
      "SDK available",
    ],
    applications: ["Aadhaar verification", "Banking", "Biometric identification", "e-KYC", "Merchant payments", "Telecom"],
    facts: {
      biometric: "STQC-certified thermal fingerprint sensor, 500 DPI, supports ISO 19794-2/4 and ANSI/INCITS 378",
      connectivity: "Bluetooth v2.1, optional BLE 5.0, optional USB",
      battery: "3.7V / 800mAh rechargeable battery with USB charging",
      dimensions: "65 × 40 × 25 mm",
      weight: "90 g",
      environment: "Operating temperature 0°C to 50°C, humidity tolerance 95% RH non-condensing",
      certifications: "BIS, RoHS, STQC, Aadhaar L1 ready, MOSIP compatible",
      integration: "SDK support for Java and .NET with Evolute communication protocol",
    },
  },
  {
    id: "falcon",
    name: "Falcon",
    category: "Integrated Micro ATM",
    aliases: ["falcon", "falcon micro atm", "falcon atm", "integrated micro atm"],
    overview: {
      en: "Falcon is an Aadhaar L1 enabled biometric Micro ATM with an integrated thermal printer for AEPS, financial inclusion, and mobile banking operations.",
      hi: "Falcon एक Aadhaar L1 enabled biometric Micro ATM है जिसमें integrated thermal printer है और यह AEPS, financial inclusion और mobile banking operations के लिए बना है।",
      mr: "Falcon हे Aadhaar L1 enabled biometric Micro ATM आहे ज्यात integrated thermal printer आहे आणि ते AEPS, financial inclusion आणि mobile banking operations साठी तयार केलेले आहे.",
    },
    features: [
      "AEPS machine with Aadhaar-enabled banking support",
      "Aadhaar / MOSIP L1 fingerprint scanner",
      "Integrated thermal printer",
      "Supports cash withdrawal, balance inquiry, and fund transfer",
      "Optional advanced card-reading capabilities",
      "Field-ready portable design",
    ],
    applications: ["Utility and bill payment", "Banking", "e-Government", "Merchant payments", "Microfinance", "NBFCs", "Financial inclusion"],
    facts: {
      biometric: "STQC-certified optical sensor, 500 DPI, Aadhaar / MOSIP L1 fingerprint scanner, supports ISO 19794-2/4 and ANSI/INCITS 378",
      printer: "2-inch thermal printer, 203 DPI, 48 mm print area, 60 mm/s print speed, 1D/2D barcode and graphics printing",
      cards: "Magnetic card reader, smart card reader, contactless reader, NFC, ISO 7816 and ISO 14443 A/B support, Mifare, single SAM slot",
      connectivity: "Bluetooth v2.1, optional BLE 5.0, USB, optional serial",
      battery: "7.4V / 1500mAh rechargeable battery, charger 9V / 1.5A",
      os: "Windows, Android, and iOS",
      dimensions: "150 × 81 × 50 mm",
      weight: "300 g",
      certifications: "BIS, WPC, RoHS, STQC",
      integration: "SDK available with Java, .NET, C#, ESC printer protocol, Windows and Android printer services, MOSIP SBI and Aadhaar RD support",
    },
  },
  {
    id: "leopro",
    name: "LeoPro",
    category: "Hyper Terminal",
    aliases: ["leopro", "leo pro", "5g hyper terminal", "hyper terminal"],
    overview: {
      en: "LeoPro is an identity-first 5G Android Hyper Terminal designed for secure payments, biometric onboarding, and last-mile service delivery.",
      hi: "LeoPro एक identity-first 5G Android Hyper Terminal है जो secure payments, biometric onboarding और last-mile service delivery के लिए बना है।",
      mr: "LeoPro हे identity-first 5G Android Hyper Terminal आहे जे secure payments, biometric onboarding आणि last-mile service delivery साठी तयार केलेले आहे.",
    },
    features: [
      "5G connectivity",
      "AI-enabled face authentication",
      "Aadhaar / MOSIP L1 certified fingerprint scanner",
      "External iris authentication support",
      "External Bluetooth mPOS payment acceptance",
      "Dual battery design",
    ],
    applications: ["AEPS", "Banking and Micro ATM", "eGovernment", "Hospitality and travel", "Retail banking", "Social welfare", "Telecom"],
    facts: {
      os: "Android 15 with GMS certification",
      processor: "64-bit octa-core processor at 2.3 GHz",
      display: "6.745-inch HD+ capacitive display, 720 × 1600, sunlight-readable",
      camera: "13 MP front camera and 16 MP rear autofocus camera with flash",
      memory: "4 GB RAM + 64 GB storage standard, optional 8 GB RAM + 128 GB storage",
      biometric: "Aadhaar STQC-certified L1 fingerprint sensor, RD compliant scanner, optional Aadhaar STQC L0 iris scanner, AI-enabled face authentication",
      payments: "External Bluetooth mPOS payment acceptance",
      connectivity: "5G / 4G / 3G / 2G, Wi-Fi 2.4 GHz and 5 GHz, Bluetooth 5.3, USB, Type-C USB OTG, dual Nano SIM",
      printer: "2-inch thermal printer, 48 mm print area, 70 mm/s print speed",
      battery: "Dual battery design: 3.85V 5000mAh and 7.4V 2600mAh",
      dimensions: "245 × 91.2 × 68 mm",
      weight: "600 g",
      environment: "Operating temperature 0°C to 50°C, humidity 5–93% RH",
      certifications: "BIS, WPC, UIDAI, RoHS, EMI/EMC, IP5x, drop test certified",
    },
  },
  {
    id: "leopard",
    name: "Leopard",
    category: "Micro ATM Machine",
    aliases: ["leopard", "leopard micro atm", "leopard atm"],
    overview: {
      en: "Leopard is an all-in-one Micro ATM with inbuilt Aadhaar / MOSIP L1 fingerprint authentication, card acceptance, and doorstep banking support.",
      hi: "Leopard एक all-in-one Micro ATM है जिसमें inbuilt Aadhaar / MOSIP L1 fingerprint authentication, card acceptance और doorstep banking support है।",
      mr: "Leopard हे all-in-one Micro ATM आहे ज्यात inbuilt Aadhaar / MOSIP L1 fingerprint authentication, card acceptance आणि doorstep banking support आहे.",
    },
    features: [
      "Micro ATM with inbuilt biometric fingerprint scanner",
      "Supports deposits, withdrawals, fund transfer, and balance inquiry",
      "Supports secure RuPay and EMV card transactions",
      "Supports e-KYC and account opening",
      "Optional STQC-certified iris scanner",
      "Cloud-based architecture",
    ],
    applications: ["Financial inclusion", "Microfinance", "eGovernance", "Agency banking", "Sales force automation"],
    facts: {
      os: "Android",
      display: "Tablet options: 7 / 8 / 8.7 inch",
      processor: "1 GHz processor",
      camera: "5 MP autofocus camera",
      memory: "1 GB RAM and 8 GB flash, higher configurations on request",
      biometric: "Aadhaar / MOSIP L1 fingerprint scanner, STQC-certified optical sensor, 500 DPI, optional STQC-certified iris scanner, Aadhaar RD and MOSIP SBI support",
      payments: "AEPS-enabled transactions, sales transactions, secure RuPay and EMV card transactions",
      cards: "Magnetic card reader, smart card reader, dual card slots, contactless reader, ISO 7816 and ISO 14443 A/B, Mifare, NFC, single SAM slot",
      connectivity: "GSM / GPRS, Wi-Fi, Bluetooth v4.0, optional external serial connectivity",
      printer: "2-inch thermal printer, 203 DPI, 48 mm print area, 60 mm/s, 1D and 2D barcodes, graphics and Unicode printing",
      battery: "7.4V / 2200mAh base battery and 3.7V / 2800mAh tablet battery",
      dimensions: "298 × 166 × 58 mm",
      weight: "950 g",
      environment: "Operating temperature 0°C to 50°C, humidity 95% RH non-condensing",
      certifications: "BIS, WPC, RoHS",
      integration: "SDK available, Java support, Evolute proprietary protocol, Aadhaar RD and MOSIP SBI support",
    },
  },
  {
    id: "leopos_bio",
    name: "LeoPOS Bio",
    category: "Smart Bio POS",
    aliases: ["leopos bio", "leo pos bio", "bio pos", "smart bio pos"],
    overview: {
      en: "LeoPOS Bio is a compact Android Smart Bio POS terminal for secure payments and biometric authentication across retail, BFSI, telecom, transit, and e-Governance use cases.",
      hi: "LeoPOS Bio एक compact Android Smart Bio POS terminal है जो secure payments और biometric authentication के लिए retail, BFSI, telecom, transit और e-Governance use cases में काम करता है।",
      mr: "LeoPOS Bio हे compact Android Smart Bio POS terminal आहे जे secure payments आणि biometric authentication साठी retail, BFSI, telecom, transit आणि e-Governance use cases मध्ये वापरले जाते.",
    },
    features: [
      "One device for payments and biometric authentication",
      "Aadhaar L1, Aadhaar L0, and MOSIP-certified sensor options",
      "FAP10 / FAP20 optical or thermal sensor options",
      "Supports magnetic card, IC card, NFC, and barcode payments",
      "2-inch thermal printer",
      "Android 14 Secure OS",
    ],
    applications: ["Retail services", "Sales force automation", "Telecom services", "BFSI", "e-Governance", "Transit"],
    facts: {
      os: "Android 14 Secure OS",
      processor: "64-bit Quad-Core Cortex-A53 processor at 2.0 GHz",
      display: "5.5-inch IPS display, 1280 × 720 HD, capacitive multi-point touch screen",
      camera: "Optional 13 MP front camera and 16 MP rear autofocus camera with zoom",
      memory: "8 GB + 1 GB RAM, 16 GB + 2 GB RAM, 32 GB + 3 GB RAM, and 64 GB to 128 GB flash options",
      biometric: "Aadhaar L1, Aadhaar L0, and MOSIP-compliant biometric sensor options, FAP10 / FAP20, optical or thermal variants",
      payments: "Magnetic stripe, IC card, NFC, and barcode-based digital transactions",
      cards: "MSR ISO 7810–7813 3-track support, IC card reader with ISO 7816, NFC 13.56 MHz, ISO/IEC 14443 Type A/B",
      connectivity: "4G LTE, 3G WCDMA, 2G GPRS, Wi-Fi 2.4 GHz and 5 GHz, BLE 5.0, GPS, GLONASS, BeiDou",
      printer: "2-inch thermal printer, 30 LPS, 58 mm × 40 mm paper roll",
      battery: "3.7V / 5600mAh removable lithium-ion battery",
      dimensions: "222.23 × 84.35 × 63.56 mm",
      weight: "440 g",
      environment: "Operating temperature 10°C to 50°C, storage temperature 20°C to 60°C, humidity up to 95%",
      certifications: "EMV Contact L1/L2, EMV Contactless L1, PCI PTS 6.0, RuPay qSPARC, Visa PayWave, Mastercard PayPass, Amex, Discover, JCB, UnionPay, CE, RoHS, BIS, EMI/EMC, Drop Test, IP5x, TQM, WPC",
      integration: "Supports regulatory and authentication frameworks across India and global identity programs",
    },
  },
  {
    id: "leopos_smart",
    name: "LeoPOS Smart",
    category: "Android POS",
    aliases: ["leopos smart", "leo pos smart", "smart pos"],
    overview: {
      en: "LeoPOS Smart is a secure Android POS terminal designed for high-speed transactions, retail payments, and field merchant operations.",
      hi: "LeoPOS Smart एक secure Android POS terminal है जो high-speed transactions, retail payments और field merchant operations के लिए बना है।",
      mr: "LeoPOS Smart हे secure Android POS terminal आहे जे high-speed transactions, retail payments आणि field merchant operations साठी तयार केलेले आहे.",
    },
    features: [
      "Supports magnetic stripe, IC card, NFC, barcode, and biometric payment workflows",
      "Built-in 2-inch thermal printer",
      "High battery capacity",
      "Android Secure OS",
      "Quad-core 64-bit Cortex-A53 processor",
      "PCI, PTS, UnionPay, and EMV certified",
    ],
    applications: ["BFSI", "e-Governance", "Retail payments", "Sales force and automation", "Telecom services", "Transit services"],
    facts: {
      os: "Android 14 Secure OS",
      processor: "64-bit Quad-Core Cortex-A53 at 2 GHz",
      display: "5.5-inch IPS screen, 1280 × 720 HD, multi-point touch",
      camera: "Optional 0.3 MP front camera and 5 MP rear autofocus camera",
      memory: "8 GB + 1 GB RAM, 16 GB + 2 GB RAM, 32 GB + 3 GB RAM, 64 GB flash",
      payments: "Magnetic stripe, IC card, NFC, barcode-based transactions, and biometric payment workflows",
      cards: "Magnetic stripe reader with 3-track support, IC card with ISO 7816, NFC reader, ISO/IEC 14443 Type A/B",
      connectivity: "Wi-Fi 2.4G, 4G, 3G, 2G, Bluetooth 4.2, GPS, GLONASS",
      printer: "2-inch thermal printer, 30 LPS, 58 mm × 40 mm paper roll",
      battery: "3.7V / 5600mAh removable lithium-ion battery",
      dimensions: "192.7 × 85 × 63.4 mm",
      weight: "440 g",
      environment: "Operating temperature 10°C to 50°C, storage temperature 20°C to 60°C, humidity up to 95%",
      certifications: "EMV Contact L1-L2, RuPay qSPARC, Drop Test certified, PCI / PTS certified, UnionPay certified",
    },
  },
  {
    id: "unipos_a5",
    name: "UniPOS A5",
    category: "Multi-biometric POS",
    aliases: ["unipos a5", "uni pos a5", "unipos", "a5 pos"],
    overview: {
      en: "UniPOS A5 is an Android omni-channel POS terminal with multi-biometric authentication for secure card, biometric, and digital payments.",
      hi: "UniPOS A5 एक Android omni-channel POS terminal है जिसमें multi-biometric authentication है और यह secure card, biometric और digital payments के लिए बना है।",
      mr: "UniPOS A5 हे Android omni-channel POS terminal आहे ज्यात multi-biometric authentication आहे आणि ते secure card, biometric आणि digital payments साठी तयार केलेले आहे.",
    },
    features: [
      "Universal card acceptance",
      "Fingerprint, iris, face, and voice authentication options",
      "STQC-certified biometric modules",
      "Magnetic swipe, smart card, and NFC support",
      "Type-C fast charging",
      "Rugged ergonomic field-tested design",
    ],
    applications: ["BFSI", "Sales force automation", "e-Government", "Retail", "Telecom", "Transit"],
    facts: {
      os: "Android 10",
      processor: "1.4 GHz ARM Cortex-A53 security CPU",
      display: "5.5-inch LCD, 1280 × 720",
      camera: "5 MP front camera and 8 MP rear autofocus camera with flash",
      memory: "1 GB / 2 GB RAM and 8 GB / 16 GB ROM",
      biometric: "STQC-certified fingerprint scanner, STQC-certified iris scanner, optional face authentication, optional voice authentication",
      payments: "Contact card, contactless card, smart card, NFC, and digital payment support",
      connectivity: "Wi-Fi, Bluetooth 4.2, GSM, 3G, 4G, RS232, Micro USB, Type-C charging",
      battery: "3.7V / 7800mAh battery",
      cards: "Magnetic stripe reader, smart card reader, NFC reader",
      dimensions: "197 × 89 × 68.2 mm",
      weight: "480 g with battery",
      certifications: "WPC certified, PCI PTS certified, Aadhaar certified",
      integration: "Supported by a certified app ecosystem and SDKs",
    },
  },
  {
    id: "ampli5",
    name: "Ampli5",
    category: "Soundbox",
    aliases: ["ampli5", "ampli 5", "soundbox", "qr soundbox"],
    overview: {
      en: "Ampli5 is a QR payment soundbox for instant UPI payment alerts with loud voice announcements and merchant-friendly deployment.",
      hi: "Ampli5 एक QR payment soundbox है जो instant UPI payment alerts और loud voice announcements के लिए बना है।",
      mr: "Ampli5 हे QR payment soundbox आहे जे instant UPI payment alerts आणि loud voice announcements साठी बनवलेले आहे.",
    },
    features: [
      "Instant audio alerts for QR payments",
      "Loud and clear payment confirmation announcements",
      "Static and Dynamic variants",
      "Long battery life",
      "Optional display configurations",
      "Merchant-friendly compact form factor",
    ],
    applications: ["Kirana stores", "Grocery stores", "Pharmacies", "QSRs", "Cafés", "Retail outlets", "Service businesses"],
    facts: {
      processor: "High-performance CPU",
      display: "Optional dot-matrix display on Static variant and optional 2.4-inch display on Dynamic variant",
      memory: "4 MB RAM + 16 MB Flash, with optional programmable memory configurations",
      connectivity: "4G connectivity with optional Wi-Fi, SIM card slot, optional eSIM",
      battery: "3.7V / 2000mAh lithium-ion battery",
      dimensions: "135 × 97 × 29 mm",
      weight: "280 g",
      environment: "Operating temperature –10°C to 55°C, relative humidity 5–95% non-condensing",
      certifications: "RoHS, WPC, BIS",
    },
  },
  {
    id: "impress_201",
    name: "Impress+ 201",
    category: "2-inch Thermal Printer",
    aliases: ["impress 201", "impress+ 201", "imp-201", "impress plus 201"],
    overview: {
      en: "Impress+ 201 is a portable 2-inch Bluetooth thermal printer built for field collections, utility payments, and mobile receipt printing.",
      hi: "Impress+ 201 एक portable 2-inch Bluetooth thermal printer है जो field collections, utility payments और mobile receipt printing के लिए बना है।",
      mr: "Impress+ 201 हे portable 2-inch Bluetooth thermal printer आहे जे field collections, utility payments आणि mobile receipt printing साठी तयार केलेले आहे.",
    },
    features: [
      "Bluetooth 2.1 and BLE 5.0 support",
      "USB communication support",
      "Optional serial communication",
      "Multilingual, barcode, and graphics printing",
      "Long-lasting rechargeable battery",
    ],
    applications: ["NBFCs", "Loan collection", "Receipt printing", "Taxi metering", "Sales force automation", "Utility bill payments", "Retail payments"],
    facts: {
      printer: "2-inch thermal printer, 203 DPI, 48 mm print width, 20 LPS / 60 mm/s",
      connectivity: "Bluetooth 2.1, BLE 5.0, USB, optional serial",
      battery: "7.4V / 2600mAh, charger 9V / 1A",
      os: "Android, Windows, iOS",
      dimensions: "103 × 75 × 46 mm",
      weight: "160 g",
      environment: "Operating temperature 0°C to 50°C, humidity ≤ 95% RH non-condensing",
      integration: "SDK support for Java, .NET, C#, Android Printer Service, Windows Printer",
    },
  },
  {
    id: "impress_202",
    name: "Impress+ 202",
    category: "2-inch Thermal Printer",
    aliases: ["impress 202", "impress+ 202", "imp-202", "impress plus 202"],
    overview: {
      en: "Impress+ 202 is a portable 2-inch direct thermal printer with Bluetooth, USB, Type-C charging, and faster print speed for field and retail use.",
      hi: "Impress+ 202 एक portable 2-inch direct thermal printer है जिसमें Bluetooth, USB, Type-C charging और तेज print speed है।",
      mr: "Impress+ 202 हे portable 2-inch direct thermal printer आहे ज्यात Bluetooth, USB, Type-C charging आणि जास्त print speed आहे.",
    },
    features: [
      "Bluetooth + USB",
      "ESC/POS protocol support",
      "Type-C charging",
      "70 mm/sec print speed",
      "Multilingual printing",
    ],
    applications: ["NBFCs", "Loan collection", "Utility bill payments", "Taxi meter receipts", "Retail and payments", "Sales force automation"],
    facts: {
      printer: "2-inch direct thermal printer, 58 mm paper, 48 mm effective print width, 70 mm/sec, ESC/POS",
      connectivity: "Bluetooth and USB",
      battery: "3.7V / 2600mAh, 5V / 2A Type-C charger",
      os: "Android, Windows, Linux, iOS",
      dimensions: "125 × 91.01 × 58.44 mm",
      weight: "237 g",
      environment: "Operating temperature 0°C to 45°C, storage temperature 10°C to 60°C, operating humidity 10% to 80% RH",
    },
  },
  {
    id: "impress_pro_301",
    name: "Impress Pro 301",
    category: "3-inch Thermal Printer",
    aliases: ["impress pro 301", "imp-301", "301 printer"],
    overview: {
      en: "Impress Pro 301 is a compact 3-inch wireless thermal printer for high-performance field printing and wide-format receipts.",
      hi: "Impress Pro 301 एक compact 3-inch wireless thermal printer है जो high-performance field printing और wide-format receipts के लिए बना है।",
      mr: "Impress Pro 301 हे compact 3-inch wireless thermal printer आहे जे high-performance field printing आणि wide-format receipts साठी तयार केलेले आहे.",
    },
    features: [
      "3-inch thermal printing",
      "Bluetooth 2.1 with optional BLE 5.0",
      "USB serial communication",
      "Unicode, barcode, and graphics printing",
      "Rugged ergonomic body",
    ],
    applications: ["On-the-go ticketing", "Kitchen order tokens", "Retail payments", "e-Governance"],
    facts: {
      printer: "3-inch thermal printer, 72 mm print width, 576 dots per line, 1D/2D barcodes and graphics printing",
      connectivity: "Bluetooth 2.1, optional BLE 5.0, USB serial",
      battery: "7.4V / 2200mAh",
      os: "Android and Windows",
      dimensions: "120 × 100 × 50 mm",
      weight: "230 g",
      environment: "Operating temperature 0°C to 50°C, humidity ≤ 95% RH",
      integration: "Evolute protocol, Windows Printer Service, Android Printer Service, Java, .NET",
    },
  },
  {
    id: "impress_pro_302",
    name: "Impress Pro 302",
    category: "3-inch Thermal Printer",
    aliases: ["impress pro 302", "imp-302", "302 printer"],
    overview: {
      en: "Impress Pro 302 is a portable 3-inch direct thermal printer with Bluetooth, USB, ESC/POS support, and wide receipt printing.",
      hi: "Impress Pro 302 एक portable 3-inch direct thermal printer है जिसमें Bluetooth, USB, ESC/POS support और wide receipt printing है।",
      mr: "Impress Pro 302 हे portable 3-inch direct thermal printer आहे ज्यात Bluetooth, USB, ESC/POS support आणि wide receipt printing आहे.",
    },
    features: [
      "3-inch direct thermal printing",
      "Bluetooth + USB",
      "ESC/POS support",
      "QR and 1D barcode printing",
      "Field-ready design",
    ],
    applications: ["NBFCs", "Loan collection", "Receipt printing", "Utility bill payments", "Sales force automation", "Retail payments", "Taxi metering"],
    facts: {
      printer: "3-inch direct thermal printer, 80 mm paper width, 72 mm printable width, 70 mm/sec, 203 DPI",
      connectivity: "Bluetooth and USB",
      battery: "7.4V / 2000mAh, charger 5V / 2A",
      os: "Android, Windows, iOS",
      dimensions: "135 × 105 × 61.5 mm",
      weight: "300 g",
      environment: "Operating temperature 0°C to 45°C, storage temperature 10°C to 60°C, operating humidity 10% to 80% RH",
    },
  },
  {
    id: "geosync",
    name: "GeoSync",
    category: "GNSS GPS Receiver",
    aliases: ["geosync", "geo sync", "gnss gps receiver", "gps receiver"],
    overview: {
      en: "GeoSync is a high-accuracy plug-and-play GNSS GPS receiver for precise real-time location capture in government and enterprise workflows.",
      hi: "GeoSync एक high-accuracy plug-and-play GNSS GPS receiver है जो government और enterprise workflows में precise real-time location capture के लिए बना है।",
      mr: "GeoSync हे high-accuracy plug-and-play GNSS GPS receiver आहे जे government आणि enterprise workflows मध्ये precise real-time location capture साठी बनवलेले आहे.",
    },
    features: [
      "Dual-band GNSS with L1 and L5",
      "Supports GPS, GLONASS, NavIC, BDS, Galileo, and QZSS",
      "USB plug-and-play",
      "Sub-meter precision support",
      "IP6X protected rugged body",
    ],
    applications: ["Location identification for workstations", "Aadhaar enrolment", "Identity verification", "Field-based government schemes", "Enterprise location operations"],
    facts: {
      connectivity: "USB 2.0 Type-A, optional Micro USB / Type-C, NMEA 0183 encrypted data at 115200 bps",
      processor: "Dual-band GNSS engine with concurrent L1 and L5 reception",
      battery: "5V supply with maximum current consumption of 45 mA",
      dimensions: "Compact rugged plug-and-play receiver form factor",
      environment: "Operating temperature –35°C to 80°C",
      certifications: "WPC certified, IP certified, Drop test certified, IP6X rated",
      integration: "Windows Service Application and Java SDK",
    },
  },
];

const EXTRA_ALIASES = {
  escan_l0: ["ईस्कैन एल0", "ई-स्कैन एल0", "एस्कैन एल0", "इस्कैन एल0"],
  escan_l1: ["ईस्कैन एल1", "ई-स्कैन एल1", "एस्कैन एल1", "इस्कैन एल1"],
  identi5: ["आइडेंटी5", "आयडेंटी5", "आइडेंटी 5", "आयडेंटी 5"],
  falcon: ["फाल्कन", "फैल्कन"],
  leopro: ["लियोप्रो", "लिओप्रो", "लेओप्रो"],
  leopard: ["लेपर्ड", "लियोपर्ड", "लिओपर्ड"],
  leopos_bio: ["लियोपोस बायो", "लिओपोस बायो", "लियो पीओएस बायो", "बायो पीओएस", "लेओपोस बायो"],
  leopos_smart: ["लियोपोस स्मार्ट", "लिओपोस स्मार्ट", "लियो पीओएस स्मार्ट", "स्मार्ट पीओएस", "लेओपोस स्मार्ट"],
  unipos_a5: ["यूनीपोस ए5", "युनीपोस ए5", "युनी POS A5", "यूनी POS A5", "ए5 पीओएस"],
  ampli5: ["एम्प्ली5", "एम्प्ली5", "एम्प्ली 5", "साउंड बॉक्स", "साउंडबॉक्स", "यूपीआई साउंड बॉक्स"],
  impress_201: ["इम्प्रेस प्लस", "इम्प्रेस+", "इम्प्रेस 201", "इम्प्रेस प्लस 201"],
  impress_202: ["इम्प्रेस 202", "इम्प्रेस प्लस 202"],
  impress_pro_301: ["इम्प्रेस प्रो", "इम्प्रेस प्रो 301"],
  impress_pro_302: ["इम्प्रेस प्रो 302"],
  geosync: ["जियोसिंक", "जीयोसिंक", "जिओसिंक", "जियो सिंक"],
};

const TOPIC_SUGGESTIONS = [
  {
    patterns: ["fingerprint", "scanner", "biometric", "aadhaar", "mosip", "फिंगरप्रिंट", "बायोमेट्रिक", "आधार", "फिंगरप्रिंट", "बायोमेट्रिक"],
    productIds: ["escan_l1", "identi5", "escan_l0"],
  },
  {
    patterns: ["micro atm", "aeps", "cash withdrawal", "doorstep banking", "माइक्रो एटीएम", "एईपीएस", "कॅश विथड्रॉल", "डोअरस्टेप बैंकिंग", "मायक्रो एटीएम"],
    productIds: ["falcon", "leopard", "leopro"],
  },
  {
    patterns: ["pos", "payment terminal", "merchant", "retail payments", "पेमेंट", "पीओएस", "merchant", "payment"],
    productIds: ["leopos_bio", "leopos_smart", "unipos_a5"],
  },
  {
    patterns: ["sound box", "soundbox", "upi", "qr", "साउंड बॉक्स", "यूपीआई", "क्यूआर"],
    productIds: ["ampli5"],
  },
  {
    patterns: ["printer", "receipt", "thermal", "प्रिंटर", "रसीद", "थर्मल"],
    productIds: ["impress_201", "impress_202", "impress_pro_301", "impress_pro_302"],
  },
  {
    patterns: ["gps", "gnss", "navic", "location", "जियोटैग", "जीपीएस", "लोकेशन"],
    productIds: ["geosync"],
  },
];

const byId = Object.fromEntries(PRODUCTS.map((product) => [product.id, product]));

for (const product of PRODUCTS) {
  product.aliases = Array.from(new Set([...(product.aliases || []), ...(EXTRA_ALIASES[product.id] || [])]));
}

for (const product of PRODUCTS) {
  const searchParts = [
    product.name,
    product.category,
    ...(product.aliases || []),
    getLangText(product.overview, "en"),
    getLangText(product.overview, "hi"),
    getLangText(product.overview, "mr"),
    ...(product.features || []),
    ...(product.applications || []),
    ...Object.values(product.facts || {}),
  ];
  product.searchBlob = searchParts.join(" ");
}

const SECTION_LEADS = {
  en: {
    features: (name) => `${name} comes with:
`,
    applications: (name) => `${name} is commonly used for:
`,
    fact: (name, label, value) => `For ${name}, ${label} includes: ${value}`,
    topicLead: "The closest matching products are:",
  },
  hi: {
    features: (name) => `${name} के मुख्य फीचर्स:
`,
    applications: (name) => `${name} आमतौर पर इन उपयोगों के लिए उपयुक्त है:
`,
    fact: (name, label, value) => `${name} के लिए ${label}: ${value}`,
    topicLead: "आपके सवाल के हिसाब से ये products सबसे करीब हैं:",
  },
  mr: {
    features: (name) => `${name} ची मुख्य वैशिष्ट्ये:
`,
    applications: (name) => `${name} साधारणपणे या वापरांसाठी योग्य आहे:
`,
    fact: (name, label, value) => `${name} साठी ${label}: ${value}`,
    topicLead: "तुमच्या प्रश्नानुसार हे products सर्वात जवळचे आहेत:",
  },
};

const STOP_WORDS = {
  en: new Set(["what", "is", "the", "a", "an", "about", "tell", "me", "please", "can", "you", "do", "does", "how", "to", "i", "want", "know", "this", "that", "of", "for", "and", "with", "in", "on", "my", "it", "its", "there", "right", "now"]),
  hi: new Set(["क्या", "है", "के", "का", "की", "को", "में", "और", "यह", "वह", "मुझे", "बताओ", "कृपया", "कैसे", "कौन", "कहां", "केलिए", "इसके", "उसके"]),
  mr: new Set(["काय", "आहे", "च्या", "ची", "चे", "मध्ये", "आणि", "हे", "ते", "मला", "सांगा", "कृपया", "कसे", "कोण", "कुठे", "याचे", "याच्या"]),
};

const INTENTS = [
  { id: "compare", phrases: { en: ["compare", "difference", "vs", "versus", "better than"], hi: ["compare", "अंतर", "फर्क", "vs", "versus", "बेहतर"], mr: ["compare", "फरक", "vs", "versus", "better"] } },
  { id: "recommend", phrases: { en: ["best", "recommended", "recommend", "which one should i choose", "which is best", "suitable", "good for me"], hi: ["best", "recommend", "recommended", "कौन सा बेहतर", "सबसे अच्छा", "सुझाव", "कौन सा लें"], mr: ["best", "recommend", "recommended", "सर्वोत्तम", "कोणता चांगला", "सुचवा", "कोणता घ्यावा"] } },
  { id: "price", phrases: { en: ["price", "cost", "pricing", "how much", "quote"], hi: ["price", "कीमत", "दाम", "cost", "quote"], mr: ["price", "किंमत", "दर", "cost", "quote"] } },
  { id: "features", phrases: { en: ["features", "key features", "highlights", "main features", "capabilities"], hi: ["features", "मुख्य फीचर्स", "विशेषताएं", "हाइलाइट्स"], mr: ["features", "मुख्य फीचर्स", "वैशिष्ट्ये", "हायलाइट्स"] } },
  { id: "applications", phrases: { en: ["applications", "use cases", "who is it for", "industries", "where to use"], hi: ["उपयोग", "use cases", "किनके लिए", "कहां use", "industries"], mr: ["वापर", "use cases", "कोणासाठी", "कुठे वापरायचे"] } },
  { id: "os", phrases: { en: ["operating system", "os", "android", "software"], hi: ["operating system", "os", "android", "सॉफ्टवेयर"], mr: ["operating system", "os", "android", "software"] } },
  { id: "processor", phrases: { en: ["processor", "cpu", "chip", "performance", "speed"], hi: ["processor", "cpu", "chip", "performance", "speed", "प्रोसेसर"], mr: ["processor", "cpu", "chip", "performance", "speed", "प्रोसेसर"] } },
  { id: "display", phrases: { en: ["display", "screen", "screen size", "resolution"], hi: ["display", "screen", "screen size", "resolution", "डिस्प्ले"], mr: ["display", "screen", "screen size", "resolution", "डिस्प्ले"] } },
  { id: "camera", phrases: { en: ["camera", "front camera", "rear camera"], hi: ["camera", "front camera", "rear camera", "कैमरा"], mr: ["camera", "front camera", "rear camera", "कॅमेरा"] } },
  { id: "memory", phrases: { en: ["memory", "ram", "storage", "rom"], hi: ["memory", "ram", "storage", "rom", "मेमोरी"], mr: ["memory", "ram", "storage", "rom", "मेमरी"] } },
  { id: "biometric", phrases: { en: ["biometric", "fingerprint", "iris", "face auth", "aadhaar", "mosip"], hi: ["biometric", "fingerprint", "iris", "face auth", "aadhaar", "mosip", "बायोमेट्रिक"], mr: ["biometric", "fingerprint", "iris", "face auth", "aadhaar", "mosip", "बायोमेट्रिक"] } },
  { id: "payments", phrases: { en: ["payment", "payments", "upi", "nfc", "aeps", "merchant payments"], hi: ["payment", "payments", "upi", "nfc", "aeps", "पेमेंट"], mr: ["payment", "payments", "upi", "nfc", "aeps", "पेमेंट"] } },
  { id: "connectivity", phrases: { en: ["connectivity", "wifi", "bluetooth", "4g", "5g", "usb", "network"], hi: ["connectivity", "wifi", "bluetooth", "4g", "5g", "usb", "network", "कनेक्टिविटी"], mr: ["connectivity", "wifi", "bluetooth", "4g", "5g", "usb", "network", "कनेक्टिव्हिटी"] } },
  { id: "battery", phrases: { en: ["battery", "battery life", "mah", "charging"], hi: ["battery", "battery life", "mah", "charging", "बैटरी"], mr: ["battery", "battery life", "mah", "charging", "बॅटरी"] } },
  { id: "printer", phrases: { en: ["printer", "printing", "receipt", "thermal printer", "print speed"], hi: ["printer", "printing", "receipt", "thermal printer", "print speed", "प्रिंटर"], mr: ["printer", "printing", "receipt", "thermal printer", "print speed", "प्रिंटर"] } },
  { id: "cards", phrases: { en: ["card", "card reader", "emv", "magnetic", "ic card", "nfc card"], hi: ["card", "card reader", "emv", "magnetic", "ic card"], mr: ["card", "card reader", "emv", "magnetic", "ic card"] } },
  { id: "dimensions", phrases: { en: ["dimensions", "size", "form factor", "how big"], hi: ["dimensions", "size", "डायमेंशन्स"], mr: ["dimensions", "size", "डायमेन्शन्स"] } },
  { id: "weight", phrases: { en: ["weight", "how heavy", "lightweight"], hi: ["weight", "how heavy", "वज़न"], mr: ["weight", "how heavy", "वजन"] } },
  { id: "environment", phrases: { en: ["temperature", "humidity", "durability", "ip", "environment"], hi: ["temperature", "humidity", "durability", "ip", "environment"], mr: ["temperature", "humidity", "durability", "ip", "environment"] } },
  { id: "certifications", phrases: { en: ["certification", "certifications", "certified", "compliance"], hi: ["certification", "certifications", "certified", "compliance", "सर्टिफिकेशन"], mr: ["certification", "certifications", "certified", "compliance", "सर्टिफिकेशन"] } },
  { id: "integration", phrases: { en: ["sdk", "integration", "api", "developer", "protocol"], hi: ["sdk", "integration", "api", "developer", "protocol"], mr: ["sdk", "integration", "api", "developer", "protocol"] } },
  { id: "overview", phrases: { en: ["what is", "tell me about", "overview", "summary", "about"], hi: ["क्या है", "बताओ", "overview", "summary", "about"], mr: ["काय आहे", "सांगा", "overview", "summary", "about"] } },
];

const FIELD_BY_INTENT = {
  overview: "overview",
  features: "features",
  applications: "applications",
  os: "os",
  processor: "processor",
  display: "display",
  camera: "camera",
  memory: "memory",
  biometric: "biometric",
  payments: "payments",
  connectivity: "connectivity",
  battery: "battery",
  printer: "printer",
  cards: "cards",
  dimensions: "dimensions",
  weight: "weight",
  environment: "environment",
  certifications: "certifications",
  integration: "integration",
};

const normalizeText = (text = "") =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[®©™]/g, " ")
    .replace(/[^\p{L}\p{N}\s/+.-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const detectLang = (text = "") => {
  if (!/[\u0900-\u097F]/.test(text)) return "en";
  if (/(आहे|करा|आहेत|करू|शकतो|शकता|शकते|काय|कसे|कुठे|तुम्ही|बद्दल|साठी|मध्ये|आणि|किंवा|पण|सांगा|बोला|येते|वजन|वैशिष्ट्ये|वापर)/i.test(text)) return "mr";
  return "hi";
};

const tokenize = (text, lang) =>
  normalizeText(text)
    .split(" ")
    .filter((word) => word.length > 1 && !STOP_WORDS[lang]?.has(word));

const overlapScore = (left, right, lang) => {
  const a = tokenize(left, lang);
  const b = tokenize(right, lang);
  if (!a.length || !b.length) return 0;
  const overlap = a.filter((token) => b.includes(token)).length;
  return overlap ? overlap / Math.max(1, a.length) + overlap / Math.max(1, b.length) : 0;
};

function getLangText(value, lang) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[lang] || value.en || Object.values(value)[0] || "";
}

const listToBullets = (items = []) => items.map((item) => `• ${item}`).join("\n");

const detectIntent = (text, lang) => {
  const normalized = normalizeText(text);
  let best = { id: null, score: 0 };

  for (const intent of INTENTS) {
    const phrases = intent.phrases[lang] || intent.phrases.en || [];
    for (const phrase of phrases) {
      const p = normalizeText(phrase);
      let score = 0;
      if (normalized.includes(p)) score = Math.max(score, 4 + p.length / 20);
      score = Math.max(score, overlapScore(normalized, p, lang) * 3);
      if (score > best.score) best = { id: intent.id, score };
    }
  }

  return best.score >= 1.6 ? best.id : null;
};

const detectProducts = (text, lang = detectLang(text)) => {
  const normalized = normalizeText(text);
  const matches = [];

  for (const product of PRODUCTS) {
    let score = 0;
    for (const alias of product.aliases || []) {
      const normalizedAlias = normalizeText(alias);
      if (normalized.includes(normalizedAlias)) score = Math.max(score, normalizedAlias.length + 5);
    }
    score += overlapScore(normalized, product.searchBlob, lang) * 8;
    if (score > 2) matches.push({ product, score });
  }

  return matches.sort((a, b) => b.score - a.score);
};

const suggestProductsByTopic = (text, lang) => {
  const normalized = normalizeText(text);
  let best = null;

  for (const topic of TOPIC_SUGGESTIONS) {
    let score = 0;
    for (const pattern of topic.patterns) {
      const p = normalizeText(pattern);
      if (normalized.includes(p)) score += 2;
      score += overlapScore(normalized, p, lang);
    }
    if (!best || score > best.score) best = { topic, score };
  }

  if (!best || best.score < 1.2) return [];
  return best.topic.productIds.map((id) => byId[id]).filter(Boolean);
};

const pickActiveProduct = (explicitMatches, currentProductId, history = []) => {
  if (explicitMatches.length) return explicitMatches[0].product;
  if (currentProductId && byId[currentProductId]) return byId[currentProductId];

  for (let index = history.length - 1; index >= 0; index -= 1) {
    const item = history[index];
    if (item?.productId && byId[item.productId]) return byId[item.productId];
  }

  return null;
};

const getFieldValue = (product, field, lang) => {
  if (!product || !field) return "";
  if (field === "overview") return getLangText(product.overview, lang);
  if (field === "features") return listToBullets(product.features || []);
  if (field === "applications") return listToBullets(product.applications || []);
  return product.facts?.[field] || "";
};

const renderSectionAnswer = (product, intent, lang) => {
  const locale = T[lang] || T.en;
  const leads = SECTION_LEADS[lang] || SECTION_LEADS.en;
  const field = FIELD_BY_INTENT[intent] || "overview";
  const value = getFieldValue(product, field, lang);

  if (!value) {
    return `${locale.noIntent(product.name)}

${getLangText(product.overview, lang)}

${locale.features}:
${listToBullets(product.features.slice(0, 5))}`;
  }

  if (field === "overview") {
    return getLangText(product.overview, lang);
  }

  if (field === "features") {
    return `${leads.features(product.name)}${value}`;
  }

  if (field === "applications") {
    return `${leads.applications(product.name)}${value}`;
  }

  return leads.fact(product.name, locale[field] || field, value);
};

const compareProducts = (left, right, lang) => {
  const locale = T[lang] || T.en;
  const rows = [
    [locale.overview, getLangText(left.overview, lang), getLangText(right.overview, lang)],
    [locale.features, (left.features || []).slice(0, 4).join(", "), (right.features || []).slice(0, 4).join(", ")],
    [locale.biometric, left.facts?.biometric || "—", right.facts?.biometric || "—"],
    [locale.payments, left.facts?.payments || "—", right.facts?.payments || "—"],
    [locale.connectivity, left.facts?.connectivity || "—", right.facts?.connectivity || "—"],
    [locale.printer, left.facts?.printer || "—", right.facts?.printer || "—"],
    [locale.battery, left.facts?.battery || "—", right.facts?.battery || "—"],
    [locale.certifications, left.facts?.certifications || "—", right.facts?.certifications || "—"],
  ];

  return [
    locale.compareLead(left, right),
    "",
    ...rows.map(([label, a, b]) => `${label}\n• ${left.name}: ${a}\n• ${right.name}: ${b}`),
  ].join("\n\n");
};

const compactReason = (value = "") =>
  String(value || "")
    .replace(/\s+/g, " ")
    .split(/[.;]/)[0]
    .split(",")
    .slice(0, 2)
    .join(",")
    .trim();

const getReasonBullets = (product) => {
  const candidates = [
    ...(product.features || []),
    product.facts?.biometric,
    product.facts?.payments,
    product.facts?.printer,
    product.facts?.connectivity,
    product.facts?.battery,
    product.facts?.certifications,
  ]
    .filter(Boolean)
    .map((item) => compactReason(item));

  return Array.from(new Set(candidates)).slice(0, 3);
};

const recommendProducts = (products, lang) => {
  const [first, second] = products.filter(Boolean);
  if (!first) return (T[lang] || T.en).unknown;

  const firstReasons = getReasonBullets(first);
  const secondHook = second ? compactReason((second.features || [])[0] || second.facts?.biometric || second.facts?.payments || getLangText(second.overview, lang)) : "";

  if (lang === "hi") {
    return [
      `हर use case के लिए एक ही POS सबसे अच्छा नहीं होता, लेकिन overall choice के रूप में ${first.name} strong option लगता है।`,
      firstReasons.length ? `क्योंकि इसमें ${firstReasons.join(", ")} मिलता है।` : getLangText(first.overview, lang),
      second ? `${second.name} भी अच्छा विकल्प है, खासकर अगर आपकी priority ${secondHook} है।` : "",
    ].filter(Boolean).join(" ");
  }

  if (lang === "mr") {
    return [
      `प्रत्येक use case साठी एकच POS सर्वोत्तम नसतो, पण all-round choice म्हणून ${first.name} मजबूत पर्याय वाटतो।`,
      firstReasons.length ? `कारण यात ${firstReasons.join(", ")} मिळते.` : getLangText(first.overview, lang),
      second ? `${second.name} हाही चांगला पर्याय आहे, विशेषतः तुमची priority ${secondHook} असेल तर.` : "",
    ].filter(Boolean).join(" ");
  }

  return [
    `There is not one universally best POS for every use case, but ${first.name} looks like the strongest all-round choice.`,
    firstReasons.length ? `That is because it offers ${firstReasons.join(", ")}.` : getLangText(first.overview, lang),
    second ? `${second.name} is also a strong alternative if your priority is ${secondHook}.` : "",
  ].filter(Boolean).join(" ");
};

const buildSmartLocalReply = ({ text, lang, history = [], currentProductId = null }) => {
  const locale = T[lang] || T.en;
  const productMatches = detectProducts(text, lang);
  const topProducts = productMatches.slice(0, 2).map((item) => item.product);
  const intent = detectIntent(text, lang);

  if (intent === "price") {
    const active = pickActiveProduct(productMatches, currentProductId, history);
    return {
      answer: active ? `${active.name}: ${locale.price}` : locale.price,
      lang,
      productId: active?.id || currentProductId,
      mode: "local",
    };
  }

  if (intent === "compare" && topProducts.length >= 2) {
    return {
      answer: compareProducts(topProducts[0], topProducts[1], lang),
      lang,
      productId: topProducts[0].id,
      mode: "local",
    };
  }

  const topicMatches = suggestProductsByTopic(text, lang);

  if (intent === "recommend") {
    const candidates = (topProducts.length ? topProducts : topicMatches).slice(0, 3);
    if (candidates.length) {
      return {
        answer: recommendProducts(candidates, lang),
        lang,
        productId: candidates[0].id,
        mode: "local",
      };
    }
  }

  const activeProduct = pickActiveProduct(productMatches, currentProductId, history);

  if (!activeProduct) {
    if (productMatches[0]) {
      return {
        answer: `${locale.suggested(productMatches[0].product.name)}\n\n${renderSectionAnswer(productMatches[0].product, intent || "overview", lang)}`,
        lang,
        productId: productMatches[0].product.id,
        mode: "local",
      };
    }

    if (topicMatches.length) {
      const names = topicMatches.map((product) => `• ${product.name}: ${getLangText(product.overview, lang)}`).join("\n");
      return {
        answer: `${(SECTION_LEADS[lang] || SECTION_LEADS.en).topicLead}\n${names}`,
        lang,
        productId: topicMatches[0]?.id || currentProductId,
        mode: "local",
      };
    }

    return { answer: locale.unknown, lang, productId: currentProductId, mode: "local" };
  }

  if (intent) {
    return {
      answer: renderSectionAnswer(activeProduct, intent, lang),
      lang,
      productId: activeProduct.id,
      mode: "local",
    };
  }

  const summary = [
    locale.noIntent(activeProduct.name),
    "",
    getLangText(activeProduct.overview, lang),
    "",
    `${locale.features}:`,
    listToBullets((activeProduct.features || []).slice(0, 5)),
    "",
    `${locale.applications}:`,
    listToBullets((activeProduct.applications || []).slice(0, 5)),
  ].join("\n");

  return {
    answer: summary,
    lang,
    productId: activeProduct.id,
    mode: "local",
  };
};

const buildApiPayload = ({ text, lang, history, currentProductId }) => {
  const intent = detectIntent(text, lang);
  const explicitProducts = detectProducts(text, lang).slice(0, 4).map((item) => item.product);
  const topicProducts = suggestProductsByTopic(text, lang).slice(0, 4);
  const candidateProducts = explicitProducts.length ? explicitProducts : topicProducts;
  const advisoryMode = intent === "recommend" ? "recommendation" : "default";
  const apiCurrentProductId = advisoryMode === "recommendation" && !explicitProducts.length ? null : currentProductId;

  return {
    message: text,
    language: lang,
    advisoryMode,
    currentProductId: apiCurrentProductId,
    candidateProductIds: candidateProducts.map((product) => product.id),
    history: (history || []).slice(-8).map((item) => ({ role: item.role, text: item.text, productId: item.productId || null })),
    products: PRODUCTS.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      aliases: product.aliases,
      overview: product.overview.en,
      features: product.features,
      applications: product.applications,
      facts: product.facts,
    })),
  };
};

const LOCAL_FIRST_INTENTS = new Set([
  "overview",
  "features",
  "applications",
  "os",
  "processor",
  "display",
  "camera",
  "memory",
  "biometric",
  "payments",
  "connectivity",
  "battery",
  "printer",
  "cards",
  "dimensions",
  "weight",
  "environment",
  "certifications",
  "integration",
  "price",
  "compare",
]);

const shouldUseLocalFirst = ({ text, lang, history = [], currentProductId = null }) => {
  const productMatches = detectProducts(text, lang);
  const activeProduct = pickActiveProduct(productMatches, currentProductId, history);
  const intent = detectIntent(text, lang);

  if (!activeProduct) return false;
  if (!intent) return true;
  return LOCAL_FIRST_INTENTS.has(intent);
};

const isWeakApiAnswer = ({ answer, fallback, activeProduct, intent }) => {
  const normalizedAnswer = normalizeText(answer || "");
  if (!normalizedAnswer) return true;

  const weakPatterns = [
    "i don t have any information",
    "i do not have any information",
    "not in the provided product context",
    "don t have information",
    "do not have information",
    "not enough information",
    "information is not available",
    "not available in the context",
  ];

  if (weakPatterns.some((pattern) => normalizedAnswer.includes(pattern))) {
    return true;
  }

  if (activeProduct) {
    const productTokens = [activeProduct.name, ...(activeProduct.aliases || [])]
      .map((value) => normalizeText(value))
      .filter(Boolean);

    const mentionsMatchedProduct = productTokens.some((token) => normalizedAnswer.includes(token));
    if (!mentionsMatchedProduct && fallback?.productId === activeProduct.id) {
      return true;
    }
  }

  const normalizedFallback = normalizeText(fallback?.answer || "");
  if (normalizedFallback && normalizedAnswer.length < Math.max(24, Math.floor(normalizedFallback.length * 0.45))) {
    return true;
  }

  if (intent === "recommend") {
    const recommendationMarkers = [
      "because",
      "recommended",
      "recommend",
      "best",
      "better for",
      "good choice",
      "strong choice",
      "suitable",
      "ideal",
      "because",
      "क्योंकि",
      "इसलिए",
      "कारण",
      "म्हणून",
    ];
    const hasRecommendationReason = recommendationMarkers.some((marker) => normalizedAnswer.includes(normalizeText(marker)));
    if (!hasRecommendationReason || normalizedAnswer.length < 60) {
      return true;
    }
  }

  return false;
};

const getAssistantReply = async ({ text, history = [], currentProductId = null, langHint = null }) => {
  const lang = langHint || detectLang(text);
  const intent = detectIntent(text, lang);
  const fallback = buildSmartLocalReply({ text, lang, history, currentProductId });
  const productMatches = detectProducts(text, lang);
  const activeProduct = pickActiveProduct(productMatches, currentProductId, history);

  if (shouldUseLocalFirst({ text, lang, history, currentProductId })) {
    return fallback;
  }

  if (!API_URL) return fallback;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildApiPayload({ text, lang, history, currentProductId })),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!data?.answer) return fallback;

    if (isWeakApiAnswer({ answer: data.answer, fallback, activeProduct, intent })) {
      return fallback;
    }

    return {
      answer: data.answer,
      lang: data.lang || lang,
      productId: data.productId || fallback.productId,
      mode: data.mode || "api",
    };
  } catch {
    return fallback;
  }
};

const findAnswer = (input, lang = detectLang(input), options = {}) =>
  buildSmartLocalReply({ text: input, lang, history: options.history || [], currentProductId: options.currentProductId || null }).answer;

export { PRODUCTS, detectLang, findAnswer, getAssistantReply };
