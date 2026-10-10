const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const appointmentForm = document.querySelector("#appointment-form");
const formStatus = appointmentForm?.querySelector(".form-status");
const appointmentDate = appointmentForm?.querySelector('input[name="date"]');
const serviceSelect = appointmentForm?.querySelector('select[name="service"]');

// Mobile navigation
menuToggle?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

// Carry the selected service into the appointment form.
document
  .querySelectorAll(".service-card > a[href='#appointment']")
  .forEach((link) => {
    link.addEventListener("click", () => {
      const card = link.closest(".service-card");
      const serviceIndex = [
        ...document.querySelectorAll(".service-card"),
      ].indexOf(card);
      if (serviceSelect && serviceIndex >= 0) {
        serviceSelect.value = serviceOptions[serviceIndex];
      }
    });
  });

// Appointment form helpers
function setMinimumAppointmentDate() {
  if (!appointmentDate) return;

  const today = new Date();
  const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .split("T")[0];

  appointmentDate.min = localDate;
}

function getFieldError(field) {
  return field.parentElement?.querySelector(".error");
}

function validateField(field) {
  const error = getFieldError(field);

  if (field.type === "checkbox") {
    if (!field.checked) {
      if (error) error.textContent = "Please provide consent to continue.";
      return false;
    }

    if (error) error.textContent = "";
    return true;
  }

  if (!error) return true;

  if (field.required && !field.value.trim()) {
    error.textContent = "This field is required.";
    return false;
  }

  if (
    field.name === "phone" &&
    !/^[0-9+\s()-]{7,20}$/.test(field.value.trim())
  ) {
    error.textContent = "Please enter a valid phone number.";
    return false;
  }

  if (
    field.name === "date" &&
    field.value &&
    appointmentDate?.min &&
    field.value < appointmentDate.min
  ) {
    error.textContent = "Please choose today or a future date.";
    return false;
  }

  if (field.type === "email" && field.value && !field.validity.valid) {
    error.textContent = "Please enter a valid email address.";
    return false;
  }

  error.textContent = "";
  return true;
}

function setFormStatus(message, type) {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
}

appointmentForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const fields = [
    ...appointmentForm.querySelectorAll("input, select, textarea"),
  ];
  const isValid = fields.every(validateField);

  if (!isValid) {
    setFormStatus("Please review the highlighted fields.", "failure");
    appointmentForm.querySelector(":invalid")?.focus();
    return;
  }

  setFormStatus(
    "Your details are valid, but this website is not connected to a secure submission service yet. Please call 986-3930237 or email the clinic to send your enquiry.",
    "success",
  );
});

setMinimumAppointmentDate();

// English and Nepali interface text
const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.contact": "Contact",
    "nav.book": "Book an Appointment",
    "hero.eyebrow": "PRECISION CARE · WARMLY DELIVERED",
    "hero.title": "Confident smiles.<br /><em>Advanced dental care.</em>",
    "hero.text":
      "Thoughtful, technology-supported dentistry for you and your family — in a calm, comfortable setting in Imadol.",
    "hero.primary":
      'Book an Appointment <span class="nav-cue" aria-hidden="true"></span>',
    "hero.secondary": "Explore our services <span>→</span>",
    "hero.note": "Open Sunday–Friday · 9:00 AM–5:00 PM",
    "hero.badge": "Modern diagnostics<br /><strong>Patient-first care</strong>",
  },
  ne: {
    "nav.home": "गृहपृष्ठ",
    "nav.about": "हाम्रो बारेमा",
    "nav.services": "सेवाहरू",
    "nav.contact": "सम्पर्क",
    "nav.book": "अपोइन्टमेन्ट लिनुहोस्",
    "hero.eyebrow": "सटीक उपचार · आत्मीय सेवासहित",
    "hero.title": "आत्मविश्वासी मुस्कान।<br /><em>आधुनिक दन्त उपचार।</em>",
    "hero.text":
      "इमाडोलमा तपाईं र तपाईंको परिवारका लागि शान्त, सहज वातावरणमा प्रविधिमा आधारित दन्त सेवा।",
    "hero.primary":
      'अपोइन्टमेन्ट लिनुहोस् <span class="nav-cue" aria-hidden="true"></span>',
    "hero.secondary": "हाम्रा सेवाहरू हेर्नुहोस् <span>→</span>",
    "hero.note": "आइतबार–शुक्रबार · बिहान ९:००–बेलुका ५:००",
    "hero.badge":
      "आधुनिक परीक्षण<br /><strong>बिरामीप्रति केन्द्रित सेवा</strong>",
  },
};

const serviceOptions = [
  "Dental Implants & Implant Surgery",
  "Clear Aligners",
  "Orthodontic Braces",
  "Cosmetic Smile Makeover",
  "3D Digital Diagnostics",
  "Root Canal Treatment (RCT)",
  "Crowns & Bridges",
  "Tooth Fillings & Restorations",
  "Tooth Extractions",
  "Ultrasonic Scaling & Polishing",
  "Teeth Whitening",
  "Child Dental Care (Pediatric)",
  "Gum & Periodontal Care",
  "General Oral Consultations",
];

const serviceOptionLabelsNe = [
  "डेन्टल इम्प्लान्ट र इम्प्लान्ट सर्जरी",
  "क्लियर अलाइनर",
  "अर्थोडोन्टिक ब्रेसेस",
  "कस्मेटिक मुस्कान सुधार",
  "थ्रीडी डिजिटल परीक्षण",
  "रुट क्यानल उपचार",
  "क्राउन र ब्रिज",
  "दाँत भर्ने र पुनर्स्थापना",
  "दाँत निकाल्ने उपचार",
  "अल्ट्रासोनिक स्केलिङ र पोलिसिङ",
  "दाँत सेतो बनाउने उपचार",
  "बाल दन्त सेवा",
  "गिजा र पेरियोडोन्टल उपचार",
  "सामान्य मुख तथा दन्त परामर्श",
];

const fullNepaliContent = {
  eyebrows: [
    "A BETTER DENTAL VISIT",
    "SEE THE FULL PICTURE",
    "OUR SERVICES",
    "YOUR COMFORT MATTERS",
    "GOOD TO KNOW",
    "TAKE THE NEXT STEP",
    "FIND US",
  ],
  eyebrowNe: [
    "राम्रो दन्त अनुभव",
    "सम्पूर्ण जानकारी",
    "हाम्रा सेवाहरू",
    "तपाईंको आराम महत्वपूर्ण छ",
    "जान्नुपर्ने कुरा",
    "अर्को कदम चाल्नुहोस्",
    "हामीलाई भेट्नुहोस्",
  ],
  serviceTitles: [
    "डेन्टल इम्प्लान्ट र इम्प्लान्ट सर्जरी",
    "क्लियर अलाइनर",
    "अर्थोडोन्टिक ब्रेसेस",
    "कस्मेटिक मुस्कान सुधार",
    "थ्रीडी डिजिटल परीक्षण",
    "रुट क्यानल उपचार",
    "क्राउन र ब्रिज",
    "दाँत भर्ने र पुनर्स्थापना",
    "दाँत निकाल्ने उपचार",
    "अल्ट्रासोनिक स्केलिङ र पोलिसिङ",
    "दाँत सेतो बनाउने उपचार",
    "बाल दन्त सेवा",
    "गिजा र पेरियोडोन्टल उपचार",
    "सामान्य मुख तथा दन्त परामर्श",
  ],
  serviceDescriptions: [
    "हराएका दाँतका लागि उपयुक्त प्रतिस्थापन विकल्प र आवश्यकताअनुसार ग्राफ्टिङ उपचार।",
    "व्यावसायिक परीक्षणपछि दाँतको स्थिति सुधार गर्न प्रयोग गरिने निकाल्न मिल्ने पारदर्शी अलाइनर।",
    "उपयुक्त अर्थोडोन्टिक सुधारका लागि परम्परागत धातु तथा सौन्दर्ययुक्त सिरेमिक ब्रेसेस।",
    "उपयुक्त दाँतको खाली ठाउँ बन्द गर्ने, कम्पोजिट भिनियर र सौन्दर्यात्मक आकार सुधारका विकल्प।",
    "आवश्यकताअनुसार गरिने इन-हाउस CBCT थ्रीडी स्क्यान र प्यानोरामिक OPG एक्स-रे।",
    "दाँतको पल्पमा भएको रोग वा संक्रमणलाई सम्बोधन गर्ने र प्राकृतिक दाँत जोगाउन सहयोग गर्ने उपचार।",
    "उपयुक्त क्षतिग्रस्त वा हराएका दाँतका लागि सिरेमिक र जिरकोनिया पुनर्स्थापना विकल्प।",
    "क्याभिटी तथा क्षतिग्रस्त दाँतको उपयुक्त मर्मतका लागि दाँतको रंगसँग मिल्ने कम्पोजिट फिलिङ।",
    "आवश्यकताअनुसार गरिने सामान्य वा सर्जिकल दाँत निकाल्ने उपचार।",
    "प्लाक, टार्टर र सतही दाग हटाउन गरिने व्यावसायिक सफाइ।",
    "उपयुक्त बिरामीका लागि व्यावसायिक सौन्दर्यात्मक दाँत सेतो बनाउने उपचार।",
    "बालबालिकाका लागि उमेरअनुसारको रोकथाममुखी जाँच र दन्त सेवा।",
    "रगत आउने र सुन्निने जस्ता गिजासम्बन्धी समस्याको परीक्षण तथा व्यवस्थापन।",
    "नियमित दन्त जाँच, मुख परीक्षण र दन्त समस्याको व्यावसायिक मूल्याङ्कन।",
  ],
};

const localizedBlocks = [
  {
    selector: ".intro-section h2",
    value: "सुन्ने प्रक्रियाबाट<br /><em>सुरु हुने सेवा।</em>",
  },
  {
    selector: ".technology-section h2",
    value: "आधुनिक उपकरण।<br /><em>राम्रो संवाद।</em>",
  },
  {
    selector: ".services-section h2",
    value: "हरेक मुस्कानका लागि<br /><em>सोचविचारपूर्ण सेवा।</em>",
  },
  {
    selector: ".comfort-section h2",
    value: "राम्रो दन्त सेवा<br /><em>मानवीय हुन्छ।</em>",
  },
  {
    selector: ".faq-section h2",
    value: "तपाईंका प्रश्न,<br /><em>हाम्रा उत्तर।</em>",
  },
  {
    selector: ".appointment-section h2",
    value: "तपाईंको मुस्कानका लागि<br /><em>समय निकालौँ।</em>",
  },
  {
    selector: ".contact-section h2",
    value: "तपाईंलाई आवश्यक पर्दा<br /><em>हामी यहाँ छौँ।</em>",
  },
  {
    selector: ".section-heading > p",
    value:
      "नियमित जाँच होस् वा कुनै उपचारबारे जानकारी, हामी तपाईंलाई स्पष्ट र जिम्मेवार मार्गदर्शनसहित अर्को कदम चाल्न सहयोग गर्छौँ।",
  },
  {
    selector: ".intro-body .lead",
    value:
      "Shree Dental Care Pvt Ltd मा उत्कृष्ट दन्त सेवा साझेदारीबाट सुरु हुन्छ भन्ने हाम्रो विश्वास छ। हामी तपाईंका चिन्ता बुझ्न, विकल्पहरू स्पष्ट रूपमा बताउन र तपाईंको स्वास्थ्य तथा जीवनशैलीअनुसार निर्णय गर्न समय दिन्छौँ।",
  },
  {
    selector: ".intro-body p:not(.lead)",
    value:
      "नियमित जाँचदेखि उन्नत पुनर्स्थापना र अर्थोडोन्टिक सेवासम्म, हाम्रो दृष्टिकोणले आधुनिक परीक्षण प्रविधिलाई सावधानीपूर्वक क्लिनिकल मूल्याङ्कनसँग जोड्छ।",
  },
  {
    selector: ".intro-body .text-link",
    value: "कुराकानी सुरु गर्नुहोस् <span>→</span>",
  },
  {
    selector: ".tech-copy > p:not(.eyebrow)",
    value:
      "क्लिनिकल रूपमा उपयुक्त हुँदा CBCT थ्रीडी स्क्यान र प्यानोरामिक OPG इमेजिङले तपाईंको दन्त स्वास्थ्य तथा उपचार विकल्प बुझ्न थप स्पष्टता दिन सक्छ।",
  },
  {
    selector: ".comfort-copy > p:not(.eyebrow)",
    value:
      "हामी तपाईंको भेट शान्त, सम्मानजनक र सहज होस् भन्ने चाहन्छौँ। स्पष्ट व्याख्या, प्रश्न सोध्ने समय र तपाईंलाई व्यक्तिको रूपमा हेर्ने सेवा हाम्रो प्राथमिकता हो।",
  },
  {
    selector: ".comfort-copy blockquote",
    value: "हरेक भेटले तपाईंलाई अझ जानकारीपूर्ण र सहज महसुस गराउने अवसर हो।",
  },
  {
    selector: ".faq-section .muted",
    value:
      "अझै अन्योल छ? सम्पर्क गर्दा हामी तपाईंका चिन्ताबारे कुरा गर्न खुसी हुनेछौँ।",
  },
  {
    selector: ".faq-section .text-link",
    value: "क्लिनिकमा सम्पर्क गर्नुहोस् <span>→</span>",
  },
  {
    selector: ".appointment-grid > div > p:not(.eyebrow)",
    value:
      "अपोइन्टमेन्टको अनुरोध पठाउनुहोस् र क्लिनिक टोलीले तपाईंलाई सम्पर्क गर्नेछ। तपाईंले रोजेको समय अनुरोध मात्र हो, निश्चित बुकिङ होइन।",
  },
  {
    selector: ".contact-section .muted",
    value:
      "हामी इमाडोल, ललितपुर, नेपालमा छौँ। क्लिनिकको ठ्याक्कै सडक ठेगाना र नक्सा पिन प्रमाणित भएपछि थपिनेछ।",
  },
  {
    selector: ".map-placeholder strong",
    value: "Shree Dental Care Pvt Ltd",
  },
  {
    selector: ".map-placeholder > span:not(.map-action)",
    value: "Google Maps मा क्लिनिक हेर्नुहोस्<br />इमाडोल, ललितपुर, नेपाल",
  },
  {
    selector: ".map-action",
    value:
      'नक्सा हेर्नुहोस् <b class="nav-cue" aria-hidden="true"></b>',
  },
  {
    selector: "#appointment-form > .button",
    value:
      'अपोइन्टमेन्ट अनुरोध पठाउनुहोस् <span class="nav-cue" aria-hidden="true"></span>',
  },
  {
    selector: ".form-disclaimer",
    value:
      "यो फारम हाल अगाडिको इन्टिग्रेसन बिन्दु मात्र हो। उत्पादनमा प्रयोग गर्नुअघि यसलाई सुरक्षित ब्याकएन्ड वा प्रमाणित फारम सेवासँग जोड्नुहोस्। यो पृष्ठले बिरामीको जानकारी भण्डारण गर्दैन।",
  },
  {
    selector: ".consent > span",
    value:
      'म यो अनुरोधबारे सम्पर्क गर्न सहमत छु र <a href="#privacy">गोपनीयता सूचना</a> पढेको छु। <b>*</b>',
  },
];

const localizedLists = [
  {
    selector: ".faq-list summary",
    values: [
      "पहिलो भेटमा के अपेक्षा गर्ने?",
      "के तपाईं बालबालिकाको उपचार गर्नुहुन्छ?",
      "अपोइन्टमेन्टको अनुरोध कसरी गर्ने?",
      "के म कुनै विशेष उपचारबारे सोध्न सक्छु?",
    ],
  },
  {
    selector: ".faq-list details p",
    values: [
      "तपाईंको अपोइन्टमेन्ट सामान्यतया कुराकानी र क्लिनिकल परीक्षणबाट सुरु हुन्छ। थप परीक्षण आवश्यक भएमा हामी कारण र अर्को कदमबारे बताउँछौँ।",
      "हुन्छ। बालबालिकाको दन्त सेवा उमेरअनुसार सहज वातावरणमा गरिन्छ, जहाँ रोकथाम र सकारात्मक अनुभवमा ध्यान दिइन्छ।",
      "अपोइन्टमेन्ट अनुरोध फारम प्रयोग गर्नुहोस् वा फोनमार्फत सम्पर्क गर्नुहोस्। क्लिनिकले समीक्षा र पुष्टि नगरेसम्म अनुरोध निश्चित अपोइन्टमेन्ट हुँदैन।",
      "अवश्य। फारममा सेवा छानेर छोटो सन्देश लेख्नुहोस्। उपचारको उपयुक्तता, जोखिम र अपेक्षित परिणामका लागि व्यावसायिक परीक्षण आवश्यक हुन्छ।",
    ],
  },
  {
    selector: ".feature-list strong",
    values: ["जानकारीमा आधारित योजना", "शान्त व्याख्या", "व्यक्तिगत सेवा"],
  },
  {
    selector: ".feature-list small",
    values: [
      "सावधानीपूर्वक मूल्याङ्कनमा सहयोग गर्ने दृश्य जानकारी।",
      "हामीले देखेको कुरा बुझ्न तपाईंलाई समय दिन्छौँ।",
      "तपाईंको आवश्यकता र उपयुक्तताअनुसार योजना।",
    ],
  },
  {
    selector: ".contact-mini a",
    values: [
      "☎ <span>986-3930237</span>",
      "✉ <span>shreedentalcare26@gmail.com</span>",
    ],
  },
];

const originalContent = new Map();
document
  .querySelectorAll(
    "[data-i18n], .eyebrow, .service-card h3, .service-card p, .service-card > a, .section-heading > p, .intro-body p, .tech-copy > p:not(.eyebrow), .comfort-copy > p:not(.eyebrow), .muted, .faq-list summary, .faq-list details p, .appointment-grid > div > p:not(.eyebrow), .contact-details p, .footer-links a, .footer-bottom span, .footer-bottom a, .map-placeholder strong, .map-placeholder > span, .map-action, .section h2, #appointment-form > .button, .form-disclaimer, .consent > span, .contact-mini a",
  )
  .forEach((element) => {
    originalContent.set(element, element.innerHTML);
  });
localizedBlocks.forEach(({ selector }) => {
  document.querySelectorAll(selector).forEach((element) => {
    originalContent.set(element, element.innerHTML);
  });
});
localizedLists.forEach(({ selector }) => {
  document.querySelectorAll(selector).forEach((element) => {
    originalContent.set(element, element.innerHTML);
  });
});

function setTranslatedContent(language) {
  const isNepali = language === "ne";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const translation = translations[language][element.dataset.i18n];
    if (translation) element.innerHTML = translation;
  });

  document
    .querySelectorAll(".eyebrow:not([data-i18n])")
    .forEach((element, index) => {
      element.innerHTML = isNepali
        ? fullNepaliContent.eyebrowNe[index]
        : originalContent.get(element);
    });

  localizedBlocks.forEach(({ selector, value }) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.innerHTML = isNepali ? value : originalContent.get(element);
    });

    localizedLists.forEach(({ selector, values }) => {
      document.querySelectorAll(selector).forEach((element, index) => {
        element.innerHTML = isNepali
          ? values[index]
          : originalContent.get(element);
      });

      const formLabels = [
        ["name", "Patient name", "बिरामीको नाम"],
        ["phone", "Phone number", "फोन नम्बर"],
        ["email", "Email address ", "इमेल ठेगाना "],
        ["service", "Requested service", "चाहिएको सेवा"],
        ["date", "Preferred date", "रोजेको मिति"],
        ["time", "Time preference", "समयको प्राथमिकता"],
        ["message", "Message ", "सन्देश "],
      ];
      formLabels.forEach(([name, english, nepali]) => {
        const label = appointmentForm?.querySelector(
          `[name="${name}"]`,
        )?.parentElement;
        if (!label) return;
        const firstTextNode = [...label.childNodes].find(
          (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim(),
        );
        if (firstTextNode) {
          firstTextNode.textContent = `${isNepali ? nepali : english}`;
        }
      });

      const messageField = appointmentForm?.querySelector("[name='message']");
      if (messageField) {
        messageField.placeholder = isNepali
          ? "हामी कसरी सहयोग गर्न सक्छौँ छोटकरीमा लेख्नुहोस्। विस्तृत स्वास्थ्य इतिहास नलेख्नुहोस्।"
          : "Tell us briefly how we can help. Please do not include detailed medical history.";
      }

      appointmentForm
        ?.querySelectorAll("label > small:not(.error)")
        .forEach((element) => {
          if (
            element.textContent.includes("optional") ||
            element.textContent.includes("वैकल्पिक")
          ) {
            element.textContent = isNepali ? "(वैकल्पिक)" : "(optional)";
          }
        });

      serviceSelect?.querySelectorAll("option").forEach((option, index) => {
        if (index === 0) {
          option.textContent = isNepali
            ? "सेवा छान्नुहोस्"
            : "Select a service";
        } else {
          option.textContent = isNepali
            ? serviceOptionLabelsNe[index - 1]
            : serviceOptions[index - 1];
        }
      });
    });
  });

  document.querySelectorAll(".service-card").forEach((card, index) => {
    const title = card.querySelector("h3");
    const description = card.querySelector("p");
    const enquiry = card.querySelector(":scope > a");
    if (isNepali) {
      title.innerHTML = fullNepaliContent.serviceTitles[index];
      description.textContent = fullNepaliContent.serviceDescriptions[index];
      enquiry.innerHTML = "बुझ्नुहोस् <span>→</span>";
    } else {
      title.innerHTML = originalContent.get(title);
      description.innerHTML = originalContent.get(description);
      enquiry.innerHTML = originalContent.get(enquiry);
    }
  });

  document.documentElement.lang = language;
}

let currentLanguage = "en";
const languageToggle = document.querySelector(".language-toggle");

languageToggle?.addEventListener("click", () => {
  currentLanguage = currentLanguage === "en" ? "ne" : "en";
  setTranslatedContent(currentLanguage);
});
