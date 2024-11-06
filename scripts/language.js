
const langData = {
    en: {
        greeting: 'Hello!',
    },
    pt: {
        greeting: 'Olá!',
    }
};

function loadContent(language) {
    const elements = document.querySelectorAll("[data-lang]");

    elements.forEach((element) => {
        const key = element.getAttribute("data-lang");
        element.innerHTML = langData[language][key] || langData['en'][key];
    });
}

const userLang = (navigator.language || navigator.userLanguage).slice(0, 2);
const language = userLang === 'en' || userLang === 'pt' ? userLang : 'en';
loadContent(language);
    
