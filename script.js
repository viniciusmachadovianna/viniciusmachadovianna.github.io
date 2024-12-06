const $=(el)=>document.querySelector(el),
    langData = {
        en: {
            language: 'PT',
            greeting: 'Hello!',
            aboutme: "My name is ",
            role: "System Developer",
            sectionProjects:'Projects',
            sectionExperience:'Experience',
            motto: 'Attention for details',
        },
        pt: {
            language: 'EN',
            greeting: 'Olá!',
            aboutme: "Meu nome é ",
            role: "Desenvolvedor de Sistemas",
            sectionProjects:'Projetos',
            sectionExperience:'Experiência',
            motto: 'Atenção aos detalhes',
        }
    },
    userLang = (navigator.language || navigator.userLanguage).slice(0, 2),
    language = userLang === 'en' || userLang === 'pt' ? userLang : 'en',
    arrow = document.getElementById("cursor"),
    cursor = {
    up: '0,0 25,75 75,75 35,60 20,20 60,35 60,60 35,60 75,75 75,25',
    down: '0,0 75,25 75,75 25,75',
    inside: '60,60 35,60 20,20, 60,35',
    link: '60,0 80,20 35,20 80,65 65,80 20,35 20,80 0,60 0,0',
    oldlink: '80,0 100,20 35,20 100,85 85,100 20,35 20,100 0,80 0,0)',
    arrow: '0,0 100,50 70,60 50,50 60,70 50,100'
    };
arrow.style.display = "block";
document.addEventListener("click",() => {
    document.querySelectorAll('*').forEach((element) => {
        element.style.cursor = 'none';
    });
})
document.addEventListener('mousemove', (e) => {
    arrow.style.left = `${e.pageX - arrow.clientWidth/2}px`;
    arrow.style.top = `${e.pageY - arrow.clientHeight/2}px`;
})

function changeCursor(state = 'up'){
    arrow.querySelector("polygon").setAttribute("points",cursor[state] || cursor.up);
}
document.addEventListener('mouseup', () => changeCursor('up'));
document.addEventListener('mousedown', () => changeCursor("down"));
document.addEventListener('mouseup', () => changeCursor('up'));
document.querySelectorAll('a').forEach(a => {
    a.addEventListener('mouseover', () => changeCursor('link'));
    a.addEventListener('mouseout', () => changeCursor('up'));
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
    const lang = document.documentElement.getAttribute("lang") === "pt" ? "en" : "pt";
    languageSelection(lang);
    document.documentElement.setAttribute("lang",lang);
});
document.documentElement.setAttribute("data-theme", window.matchMedia('(prefers-color-scheme: light)').matches ? "light" : "dark");
$("#themeSwitch").addEventListener("click",(e) => {
    const theme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    const img = e.currentTarget.querySelector("img");
    document.querySelectorAll('.icon').forEach(icon => {
    document.documentElement.setAttribute("data-theme", theme);
    icon.src = `/assets/icons/${icon.getAttribute("data-icon")}-${theme}-mode.svg`;
    });
    theme === "light" ? img.setAttribute("src",'/assets/icons/moon-light-mode.svg'): img.setAttribute("src",'/assets/icons/sun-dark-mode.svg');
});

// apply to all articles pending:
const readingTime = article => Math.ceil( article.textContent.trim().split(/\s+/).length / 220);
$("time").textContent = `${readingTime($("article"))} ${readingTime($("article")) == 1 ? "min" : "mins"}`;
document.addEventListener("DOMContentLoaded", function() {
    const article = document.querySelector("section");
    article.addEventListener("scroll", function() {
        console.log(`Scroll Height: ${article.scrollHeight} Scroll Top: ${article.scrollTop} e ${article.clientHeight}`);
    });
});

document.addEventListener("contextmenu",(e)=>{
    console.log("right mouse button clicked");
    // e.preventDefault();
});

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'g') {
        event.preventDefault();
        $("menu").style.display = (window.getComputedStyle($("menu")).display === "flex") ? "none" : "flex";
    }
});
document.querySelectorAll('sup').forEach(info => {
    let dialog = document.querySelector("dialog");
    info.addEventListener('mouseover', () =>{
        const trigger = info.getBoundingClientRect();
        const x = trigger.left+window.scrollX;
        const y = trigger.top+window.scrollY;
        dialog.style.left = `${x+100}px`;
        dialog.style.top = `${y-20}px`;
        dialog.innerHTML = info.getAttribute("title");
        dialog.setAttribute('open','');
    });
    info.addEventListener('mouseout', () =>{
        dialog.removeAttribute('open');
    });
});

document.querySelector("#switch").addEventListener("click",(e)=>{
    const use = document.querySelector("use");
    use.getAttribute("href") === "#sun" ? use.setAttribute("href","#moon") : use.setAttribute("href","#sun");
});
