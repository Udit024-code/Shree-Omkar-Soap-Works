export const BUSINESS = {
  nameEn: "Shree Omkar Soap Works",
  nameHi: "श्री ओमकार सोप वर्क्स",
  since: 1989,
  phone: "9319088541",
  email: "uditchaudhary0406@gmail.com",
  whatsapp: "918077138959",
  addressEn: "Village Kaithal, Chandausi, Sambhal, Uttar Pradesh",
  addressHi: "ग्राम कैथल, चंदौसी, संभल, उत्तर प्रदेश",
};

export type Product = {
  slug: string;
  nameEn: string;
  nameHi: string;
  typeEn: string;
  typeHi: string;
  image: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "shambhu-soap",
    nameEn: "Shambhu Soap",
    nameHi: "शम्भू सोप",
    typeEn: "Laundry Soap",
    typeHi: "कपड़े धोने का साबुन",
    image: "/products/shambhu-soap2.png",
  },
  {
    slug: "shambhu-hifi",
    nameEn: "Shambhu Hi-Fi",
    nameHi: "शम्भू हाई-फाई",
    typeEn: "Detergent Powder",
    typeHi: "डिटर्जेन्ट पाउडर",
    image: "/products/shambhu-hifi.png",
  },
  {
    slug: "shambhu-super-white",
    nameEn: "Shambhu Super White",
    nameHi: "शम्भू सुपर व्हाइट",
    typeEn: "Detergent Powder",
    typeHi: "डिटर्जेन्ट पाउडर",
    image: "/products/shambhu-super-white.png",
  },
  {
    slug: "shambhu-cake",
    nameEn: "Shambhu Detergent Cake",
    nameHi: "शम्भू डिटर्जेन्ट केक",
    typeEn: "Detergent Cake",
    typeHi: "डिटर्जेन्ट केक",
    image: "/products/shambhu-cake.png",
  },
  {
    slug: "dulara-gold",
    nameEn: "Dulara Gold",
    nameHi: "दुलारा गोल्ड",
    typeEn: "Machine Wash Detergent Powder",
    typeHi: "मशीन वॉश डिटर्जेन्ट पाउडर",
    image: "/products/dulara-gold.png",
  },
  {
    slug: "rajdulara",
    nameEn: "Rajdulara",
    nameHi: "राजदुलारा",
    typeEn: "Detergent Powder",
    typeHi: "डिटर्जेन्ट पाउडर",
    image: "/products/rajdulara.png",
  },
  {
    slug: "dulara-soap",
    nameEn: "Dulara Soap",
    nameHi: "दुलारा साबुन",
    typeEn: "Laundry Soap",
    typeHi: "कपड़े धोने का साबुन",
    image: "/products/dulara-soap.png",
  },
  {
    slug: "rajdulara-soap",
    nameEn: "Rajdulara Soap",
    nameHi: "राजदुलारा साबुन",
    typeEn: "Laundry Soap",
    typeHi: "कपड़े धोने का साबुन",
    image: "/products/rajdulara-soap.png",
  },
  {
    slug: "rajdulara-cake",
    nameEn: "Rajdulara Detergent Cake",
    nameHi: "राजदुलारा डिटर्जेन्ट केक",
    typeEn: "Detergent Cake",
    typeHi: "डिटर्जेन्ट केक",
    image: "/products/rajdulara-cake.png",
  },
];

export const T = {
  en: {
    home: "Home",
    products: "Products",
    about: "About Us",
    contact: "Contact",
    tagline: "Trusted wholesale soaps & detergents since 1989",
    heroSub: "Bulk supplier of quality soaps, detergent powders and cakes across Uttar Pradesh",
    enquireNow: "Enquire Now",
    whatsappUs: "WhatsApp Us",
    highlights: ["Bulk supply across UP", "Quality assured", "Fast dispatch"],
    ourProducts: "Our Products",
    enquireQuote: "Enquire for quote",
    viewAll: "View all products",
    aboutTitle: "Our Story",
    aboutBody:
      "Shree Omkar Soap Works has been manufacturing quality soaps and detergents since 1989. Based in Chandausi, Sambhal (Uttar Pradesh), we supply wholesale buyers across most districts of the state. Three decades of consistent quality have made our brands — Shambhu, Dulara and Rajdulara — trusted names for retailers and distributors.",
    aboutQuality: "Quality commitment",
    aboutQualityBody:
      "Every batch is made with consistent formulation and checked before dispatch. We believe long-term wholesale relationships are built on quality that retailers can rely on, pack after pack.",
    contactTitle: "Contact Us",
    callUs: "Call us",
    emailUs: "Email us",
    address: "Address",
    deliveryAreas: "Delivery areas",
    deliveryAreasBody: "Most districts of Uttar Pradesh",
    formTitle: "Send an enquiry",
    formName: "Your name",
    formBusiness: "Business name",
    formPhone: "Phone number",
    formProduct: "Product of interest",
    formQty: "Approximate quantity",
    formMessage: "Message",
    formSend: "Send via WhatsApp",
    formNote: "Your enquiry opens in WhatsApp — just press send.",
    footerRights: "All rights reserved.",
    wholesaleOnly: "Wholesale / bulk enquiries welcome",
  },
  hi: {
    home: "होम",
    products: "उत्पाद",
    about: "हमारे बारे में",
    contact: "संपर्क करें",
    tagline: "1989 से भरोसेमंद थोक साबुन और डिटर्जेन्ट",
    heroSub: "पूरे उत्तर प्रदेश में गुणवत्तापूर्ण साबुन, डिटर्जेन्ट पाउडर और केक के थोक आपूर्तिकर्ता",
    enquireNow: "पूछताछ करें",
    whatsappUs: "व्हाट्सऐप करें",
    highlights: ["पूरे यूपी में थोक आपूर्ति", "गुणवत्ता की गारंटी", "तेज़ डिलीवरी"],
    ourProducts: "हमारे उत्पाद",
    enquireQuote: "भाव के लिए पूछें",
    viewAll: "सभी उत्पाद देखें",
    aboutTitle: "हमारी कहानी",
    aboutBody:
      "श्री ओमकार सोप वर्क्स 1989 से गुणवत्तापूर्ण साबुन और डिटर्जेन्ट बना रहा है। चंदौसी, संभल (उत्तर प्रदेश) में स्थित, हम राज्य के अधिकांश जिलों में थोक खरीदारों को आपूर्ति करते हैं। तीन दशकों की निरंतर गुणवत्ता ने हमारे ब्रांड — शम्भू, दुलारा और राजदुलारा — को खुदरा विक्रेताओं और वितरकों के लिए भरोसेमंद नाम बना दिया है।",
    aboutQuality: "गुणवत्ता का वादा",
    aboutQualityBody:
      "हर बैच एक समान फॉर्मूले से बनता है और भेजने से पहले जाँचा जाता है। हमारा मानना है कि थोक व्यापार का रिश्ता उसी गुणवत्ता पर टिकता है जिस पर दुकानदार हर पैक के साथ भरोसा कर सकें।",
    contactTitle: "संपर्क करें",
    callUs: "कॉल करें",
    emailUs: "ईमेल करें",
    address: "पता",
    deliveryAreas: "डिलीवरी क्षेत्र",
    deliveryAreasBody: "उत्तर प्रदेश के अधिकांश जिले",
    formTitle: "पूछताछ भेजें",
    formName: "आपका नाम",
    formBusiness: "व्यवसाय का नाम",
    formPhone: "फ़ोन नंबर",
    formProduct: "किस उत्पाद में रुचि है",
    formQty: "अनुमानित मात्रा",
    formMessage: "संदेश",
    formSend: "व्हाट्सऐप से भेजें",
    formNote: "आपकी पूछताछ व्हाट्सऐप में खुलेगी — बस भेजें दबाएँ।",
    footerRights: "सर्वाधिकार सुरक्षित।",
    wholesaleOnly: "थोक पूछताछ का स्वागत है",
  },
};

export type Lang = keyof typeof T;
