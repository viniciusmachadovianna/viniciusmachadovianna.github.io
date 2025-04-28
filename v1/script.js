const $=(el)=>document.querySelector(el),
    langData = {
        en: {
            language: 'PT-BR',
            role: "System Developer",
            dev: "DEVELOPER",
            sectionProjects:'Projects',
            sectionExperience:'Experience',
            project1title:'Tic Tac Toe Game',
            project1description:'A classic, very easy to play. Is it easy to program as well?',
        },
        pt: {
            language: 'EN-US',
            role: "Desenvolvedor de Sistemas",
            dev: "DESENVOLVEDOR",
            sectionProjects:'Projetos',
            sectionExperience:'Experiência',
            project1title:'Jogo da Velha',
            project1description:'Um clássico, bem fácil de jogar. Será que é fácil de programar também?',
        }
    },
    userLang = (navigator.language || navigator.userLanguage).slice(0, 2),
    language = userLang === 'en' || userLang === 'pt' ? userLang : 'en';
document.querySelectorAll('.shimmer').forEach(item => {
    item.addEventListener('mousemove',(e)=>{
        const square=item.getBoundingClientRect(),
            x=`${e.clientX-square.left}px`,
            y=`${e.clientY-square.top}px`
        document.documentElement.style.setProperty('--m-x',x)
        document.documentElement.style.setProperty('--m-y',y)
    });
});
function languageSelection(language) {
    const elements = document.querySelectorAll("[data-lang]");

    elements.forEach((element) => {
        const key = element.getAttribute("data-lang");
        element.innerHTML = langData[language][key] || langData['en'][key];
    });
}
document.documentElement.setAttribute("lang",language);
languageSelection(language);
$("#languageSwitch").addEventListener("click",() => {
    const pre = document.documentElement.getAttribute("lang"),
        lang = pre === "pt" ? "en" : "pt";
    document.documentElement.style.setProperty('--lang',`url(assets/icons/${pre}.svg)`)
    document.documentElement.style.setProperty('--lang-alt',`url(assets/icons/${lang}.svg)`)
        languageSelection(lang);
    document.documentElement.setAttribute("lang",lang);
});
document.documentElement.setAttribute("data-theme", window.matchMedia('(prefers-color-scheme: light)').matches ? "light" : "dark");
// document.documentElement.setAttribute("data-theme", "light");
$("#themeSwitch").addEventListener("click",(e) => {
    const theme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    const img = e.currentTarget.querySelector("img");
    // document.querySelectorAll('.icon').forEach(icon => {
    // document.documentElement.setAttribute("data-theme", theme);
        // icon.src = `/assets/icons/${icon.getAttribute("data-icon")}-${theme}-mode.svg`;
        
    // });
    // theme==="light"?img.setAttribute("src",'/assets/icons/moon-light-mode.svg'): img.setAttribute("src",'/assets/icons/sun-dark-mode.svg');
});
document.addEventListener("DOMContentLoaded", function() {
    const article = document.querySelector("section");
    article.addEventListener("scroll", function() {
        console.log(`Scroll Height: ${article.scrollHeight} Scroll Top: ${article.scrollTop} e ${article.clientHeight}`);
    });
});
document.querySelectorAll('sup').forEach(info => {
    const tooltip = $("#tooltip");
    info.addEventListener('mouseover', () =>{
        const trigger = info.getBoundingClientRect(),
            x = trigger.left+window.scrollX,
            y = trigger.top+window.scrollY;
        tooltip.style.left = `${x+100}px`;
        tooltip.style.top = `${y-20}px`;
        tooltip.innerHTML = info.getAttribute("title");
        tooltip.style.display='block';
    });
    info.addEventListener('mouseout', () =>{
        tooltip.style.display='none';
    });
});

document.querySelector("#switch").addEventListener("click",(e)=>{
    const use = document.querySelector("use");
    use.getAttribute("href") === "#sun" ? use.setAttribute("href","#moon") : use.setAttribute("href","#sun");
});
