function $(el) {return document.querySelector(el);}
const arrow = $("#cursor");
const langData = {
    en: {
        greeting: 'Hello!',
        aboutme: "My name is ",
        role: "System Developer",
        sectionProjects:'Projects',
        sectionExperience:'Experience',
        motto: 'Passion in details',
    },
    pt: {
        greeting: 'Olá!',
        aboutme: "Meu nome é ",
        role: "Desenvolvedor de Sistemas",
        sectionProjects:'Projetos',
        sectionExperience:'Experiência',
        motto: 'Paixão nos detalhes',
    }
};
arrow.style.display = "block";
document.addEventListener("click",(e) => {
    document.querySelectorAll('*').forEach((element) => {
        element.style.cursor = 'none';
    });
})
document.addEventListener('mousemove', (e) => {
    arrow.style.left = `${e.pageX - arrow.clientWidth/2}px`;
    arrow.style.top = `${e.pageY - arrow.clientHeight/2}px`;
})

const cursor = {
    up: '0,0 25,75 75,75 35,60 20,20 60,35 60,60 35,60 75,75 75,25',
    down: '0,0 75,25 75,75 25,75',
    inside: '60,60 35,60 20,20, 60,35',
    link: '60,0 80,20 35,20 80,65 65,80 20,35 20,80 0,60 0,0',
    oldlink: '80,0 100,20 35,20 100,85 85,100 20,35 20,100 0,80 0,0)',
    arrow: '0,0 100,50 70,60 50,50 60,70 50,100'
}
function changeCursor(state = 'up'){
    arrow.querySelector("polygon").setAttribute("points",cursor[state] || cursor.up);
}
document.addEventListener('mouseup', () => changeCursor('up'));
document.addEventListener('mousedown', () => changeCursor("down"));
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
const userLang = (navigator.language || navigator.userLanguage).slice(0, 2);
const language = userLang === 'en' || userLang === 'pt' ? userLang : 'en';
languageSelection(language);
$("#languageSwitch").addEventListener("click",(e) => {
    languageSelection(e.target.value);
    if (e.target.value === "en"){
        e.target.value = "pt"
        e.target.innerHTML = "PT";
    } else{
        e.target.value = "en"
        e.target.innerHTML = "EN";
    }
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
document.addEventListener('mouseup', () => changeCursor('up'));

// apply to all articles pending:
const readingTime = article => Math.ceil( article.textContent.trim().split(/\s+/).length / 220);
$("time").textContent = `${readingTime($("article"))} ${readingTime($("article")) == 1 ? "min" : "mins"}`;
document.addEventListener("DOMContentLoaded", function() {
    const article = document.querySelector("section");
    article.addEventListener("scroll", function() {
        console.log(`Scroll Height: ${article.scrollHeight} Scroll Top: ${article.scrollTop} e ${article.clientHeight}`); // Total height of content
    });
});

document.addEventListener("contextmenu",(e)=>{
    console.log("right clicked");
    
    // e.preventDefault();
});

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'g') {
        $("menu").style.visibility = (window.getComputedStyle($("menu")).visibility === "visible") ? "hidden" : "visible";
        event.preventDefault();
    }
});

document.querySelectorAll('sup').forEach(info => {
    let dialog = document.querySelector("dialog");
    info.addEventListener('click', () =>{
        dialog.innerHTML = info.getAttribute("title");
        dialog.setAttribute('open','');
    });
});

$("dialog").addEventListener('click',()=>{$("dialog").removeAttribute('open');});
