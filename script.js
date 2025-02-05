const $=(el)=>document.querySelector(el),
    langData = {
        en: {
            language: 'PT',
            role: "System Developer",
            sectionProjects:'Projects',
            sectionExperience:'Experience',
        },
        pt: {
            language: 'EN',
            role: "Desenvolvedor de Sistemas",
            sectionProjects:'Projetos',
            sectionExperience:'Experiência',
        }
    },
    userLang = (navigator.language || navigator.userLanguage).slice(0, 2),
    language = userLang === 'en' || userLang === 'pt' ? userLang : 'en',
    arrow = document.getElementById("cursor"),
    cursor = {
    up: '0,0 25,75 75,75 35,60 20,20 60,35 60,60 35,60 75,75 75,25',
    // al: '0,0 0,80 45,90', //left
    // ar: '0,0 45,90 60,50', //right
    // a2: '0,0 0,80 45,90 60,50' //full
    down: '0,0 75,25 75,75 25,75',
    inside: '60,60 35,60 20,20, 60,35',
    link: '60,0 80,20 35,20 80,65 65,80 20,35 20,80 0,60 0,0',
    oldlink: '80,0 100,20 35,20 100,85 85,100 20,35 20,100 0,80 0,0)',
    arrow: '0,0 100,50 70,60 50,50 60,70 50,100'
    },
    glow=$('#glow');
arrow.style.display = "block";
document.addEventListener("click",() => {
    document.querySelectorAll('*').forEach((element) => {
        element.style.cursor = 'none';
    });
})
function adjustPos(element,coord,ref=arrow){
    element.style.left=`${coord.pageX-ref.clientWidth/2}px`;
    element.style.top=`${coord.pageY-ref.clientHeight/2}px`;
}
glow.style.display='none';
function toggleVisible(element){
    element.style.display=element.style.display==='none'?'block':'none';
}
document.addEventListener('mousemove', (e) => {
    adjustPos(arrow,e);
    adjustPos(glow,e);
})
function changeCursor(state = 'up'){
    arrow.querySelector("polygon").setAttribute("points",cursor[state] || cursor.up);
    glow.style.background=state==='down'?'rgb(180, 254, 255)':'rgb(255, 255, 255)'
}
document.addEventListener('mouseup', () => changeCursor('up'));
document.addEventListener('mousedown', () => changeCursor("down"));
document.addEventListener('mouseup', () => changeCursor('up'));
document.querySelectorAll('a').forEach(a => {
    a.addEventListener('mouseover', () => changeCursor('link'));
    a.addEventListener('mouseout', () => changeCursor('up'));
});
document.querySelectorAll('header,aside').forEach(item => {
    item.addEventListener('mouseenter', () => toggleVisible(glow));
    item.addEventListener('mouseleave', () => toggleVisible(glow));
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
    // icon.src = `/assets/icons/${icon.getAttribute("data-icon")}-${theme}-mode.svg`;
    });
    // theme==="light"?img.setAttribute("src",'/assets/icons/moon-light-mode.svg'): img.setAttribute("src",'/assets/icons/sun-dark-mode.svg');
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
