function $(el) {return document.querySelector(el);}

const langData = { //attr[data-lang]
    en: {
        greeting: 'Hello!',
        aboutme: "My name is Vinícius Machado,",
        // color switch button?
    },
    pt: {
        greeting: 'Olá!',
        aboutme: "Meu nome é Vinícius Machado",
    }
};

function languageSelection(language) {
    const elements = document.querySelectorAll("[data-lang]");

    elements.forEach((element) => {
        const key = element.getAttribute("data-lang");
        element.innerHTML = langData[language][key] || langData['en'][key];
    });
}

const userLang = (navigator.language || navigator.userLanguage).slice(0, 2);
const language = userLang === 'en' || userLang === 'pt' ? userLang : 'en';
languageSelection(language);

$("#languageSwitch").addEventListener("click",(e) => {
    e.target.value = e.target.value === "pt" ? "en" : "pt";
    e.target.innerHTML = e.target.innerHTML === "Português" ? "English" : "Português";
    languageSelection(e.target.value);
});

