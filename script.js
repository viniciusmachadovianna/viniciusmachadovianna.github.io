const $=(el)=>document.querySelector(el),
    langData = {
        en: {
            language: 'PT-BR',
            bio:'<b>FULLSTACK</b> WEB DEVELOPER FOCUSED ON INTUITIVE AND <b>MINIMALIST</b> APLICATIONS',
            ticTacToe:'TIC TAC TOE',
            projects:'PROJECTS VIEWED',
            db:'Database',
            tools:'Tools',
        },
        pt: {
            language: 'EN-US',
            bio: 'DESENVOLVEDOR WEB <b>FULLSTACK</b> FOCADO EM APLICAÇÕES INTUITIVAS E <b>MINIMALISTAS</b>',
            ticTacToe:'JOGO DA VELHA',
            projects:'PROJETOS VISTOS',
            db:'Banco de Dados',
            tools:'Ferramentas',
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