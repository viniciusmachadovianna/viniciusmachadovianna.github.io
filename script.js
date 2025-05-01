const $=(el)=>document.querySelector(el),
    langData = {
        en: {
            language: 'PT-BR',
            bio:'<b>FULLSTACK</b> WEB DEVELOPER FOCUSED ON <b>MINIMALIST</b> YET IMPACTFUL APLICATIONS, PROVIDING EFFICIENT AND <b>INTUITIVE</b> USER EXPERIENCE',
            projects:'PROJECTS SEEN'
        },
        pt: {
            language: 'EN-US',
            bio: 'DESENVOLVEDOR WEB <b>FULLSTACK</b> FOCADO EM APLICAÇÕES  <b>MINIMALISTAS</b> E DE IMPACTO, ENTREGANDO UMA EXPERIÊNCIA  <b>INTUITIVA</b> E EFICIENTE',
            projects:'PROJETOS VISTOS'
        }
    },
    userLang = (navigator.language || navigator.userLanguage).slice(0, 2),
    // language = userLang === 'en' || userLang === 'pt' ? userLang : 'en',
    btnLanguage = $("#language"),
    btnTheme = $("#theme");
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
        element.innerHTML = langData[language][key] || langData['en'][key];
    });
}
btnTheme.addEventListener('click',()=>{
    document.documentElement.setAttribute("data-theme", document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
})