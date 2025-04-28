const $=(el)=>document.querySelector(el),
    langData = {
        en: {
            language: 'PT-BR'
        },
        pt: {
            language: 'EN-US'
        }
    },
    userLang = (navigator.language || navigator.userLanguage).slice(0, 2),
    // language = userLang === 'en' || userLang === 'pt' ? userLang : 'en',
    btnLanguage = $("#language");
btnLanguage.addEventListener('click',()=>{
    const pre = document.documentElement.getAttribute("lang"),
    lang = pre === "pt" ? "en" : "pt";
    document.documentElement.setAttribute("lang",lang);
    changeLang(lang)
})
    
function changeLang(language) {
    const elements = document.querySelectorAll("[data-lang]");
    elements.forEach((element) => {
        const key = element.getAttribute("data-lang");
        element.textContent = langData[language][key] || langData['en'][key];
    });
}