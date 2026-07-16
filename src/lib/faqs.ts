// FAQ knowledge base for the chatbot (owner-approved 2026-07-16).
// For topics not covered here, the chatbot must share the owner's phone + email
// (see FALLBACK_TOPICS) instead of guessing.

export type Faq = { qEn: string; aEn: string; qHi: string; aHi: string };

export const FAQS: Faq[] = [
  {
    qEn: "Can I mix different products in one order?",
    aEn: "Yes, you can order any combination of our soaps, detergent powders and cakes in a single order.",
    qHi: "क्या मैं एक ऑर्डर में अलग-अलग उत्पाद मिला सकता हूँ?",
    aHi: "हाँ, आप एक ही ऑर्डर में हमारे साबुन, डिटर्जेन्ट पाउडर और केक किसी भी संयोजन में मँगा सकते हैं।",
  },
  {
    qEn: "Do you provide samples before a bulk order?",
    aEn: "No, we do not provide samples. You can start with a small first order to check the quality.",
    qHi: "क्या थोक ऑर्डर से पहले सैंपल मिलता है?",
    aHi: "नहीं, हम सैंपल नहीं देते। गुणवत्ता जाँचने के लिए आप छोटे ऑर्डर से शुरुआत कर सकते हैं।",
  },
  {
    qEn: "How do I get a price quote?",
    aEn: "Call or WhatsApp us, or send the enquiry form on the Contact page — we will share the latest wholesale rates.",
    qHi: "भाव/कोटेशन कैसे मिलेगा?",
    aHi: "हमें कॉल या व्हाट्सऐप करें, या संपर्क पेज पर पूछताछ फॉर्म भेजें — हम ताज़ा थोक भाव बता देंगे।",
  },
  {
    qEn: "Which areas do you deliver to?",
    aEn: "We supply to most districts of Uttar Pradesh.",
    qHi: "आप किन क्षेत्रों में डिलीवरी करते हैं?",
    aHi: "हम उत्तर प्रदेश के अधिकांश जिलों में आपूर्ति करते हैं।",
  },
  {
    qEn: "Who pays the transport / freight?",
    aEn: "Transport is included in the price — no separate freight charges.",
    qHi: "ट्रांसपोर्ट/भाड़ा कौन देता है?",
    aHi: "ट्रांसपोर्ट कीमत में शामिल है — अलग से कोई भाड़ा नहीं लगता।",
  },
  {
    qEn: "Since when are you in business?",
    aEn: "Shree Omkar Soap Works has been manufacturing soaps and detergents since 1989 in Chandausi, Sambhal (Uttar Pradesh).",
    qHi: "आप कब से इस व्यवसाय में हैं?",
    aHi: "श्री ओमकार सोप वर्क्स 1989 से चंदौसी, संभल (उत्तर प्रदेश) में साबुन और डिटर्जेन्ट बना रहा है।",
  },
  {
    qEn: "What products do you make?",
    aEn: "We make laundry soaps (Shambhu, Dulara, Rajdulara), detergent powders (Shambhu Super White, Shambhu Hi-Fi, Dulara Gold, Rajdulara) and detergent cakes (Shambhu, Rajdulara).",
    qHi: "आप कौन-कौन से उत्पाद बनाते हैं?",
    aHi: "हम कपड़े धोने के साबुन (शम्भू, दुलारा, राजदुलारा), डिटर्जेन्ट पाउडर (शम्भू सुपर व्हाइट, शम्भू हाई-फाई, दुलारा गोल्ड, राजदुलारा) और डिटर्जेन्ट केक (शम्भू, राजदुलारा) बनाते हैं।",
  },
  {
    qEn: "Are your products good for machine wash?",
    aEn: "Yes, our products work well in washing machines — especially Dulara Gold, which is made for machine wash.",
    qHi: "क्या आपके उत्पाद मशीन वॉश के लिए अच्छे हैं?",
    aHi: "हाँ, हमारे उत्पाद वॉशिंग मशीन में अच्छा काम करते हैं — खासकर दुलारा गोल्ड, जो मशीन वॉश के लिए ही बना है।",
  },
];

// Topics the chatbot must NOT answer on its own — direct the visitor to
// phone + email instead (owner decision 2026-07-16).
export const FALLBACK_TOPICS = [
  "minimum order quantity (MOQ)",
  "payment terms / credit",
  "discounts on larger quantities",
  "delivery time",
  "free delivery thresholds",
  "becoming a distributor / dealer",
  "GST registration / invoices",
  "custom or private-label manufacturing",
  "pack sizes",
];
