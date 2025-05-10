import { lang } from './lang.js';

const btnLanguage = document.getElementById('language'),
    btnTheme = document.getElementById('theme'),
    projectsSection = document.getElementById('projects'),
    scrollProgress = document.getElementById('scrollProgress'),
    projectCount = document.querySelectorAll('article').length,
    articles = document.querySelectorAll('article');
     
function setProjectCounter(){
    document.documentElement.style.setProperty('--projectCount', projectCount);
    document.getElementById('progressValue').innerText = `0/${projectCount}`;
    const projectList = document.getElementById('progress').querySelector('div');
    for (let i = 0; i < projectCount; i++) {
        const div = document.createElement('div');
        div.setAttribute('id',`bar${i+1}`);
        projectList.appendChild(div);
    }
}

function setArticlesColors(){
    const colors = {
        arariama:           ['#25344f','#b2becb','#632024'],
        betterYou:          ['#39ceba','#484848','#2d977b'],
        chatbot:            ['#60c760','#d3d3d3','#008000'],
        portfolio:          ['#63c3c3','#013854','#dab71f'],
        speedLog:           ['#333333','#00c49d','#c9c9c9'],
        sublime:            ['#b28059','#7e5a3d','#402f23'],
        talesTrails:        ['#606060','#b4b4b4','#313131'],
        ticTacToe:          ['#bb00ff','#a40094','#800080'],
        youtubeConverter:   ['#9b1f00','#dcdcdc','#9b1f00'],
    };
}

  

articles.forEach((el)=>{
    const infoContainer = el.querySelector('.projectDescription').querySelector('.more')
    el.querySelector('.projectDescription').addEventListener('click',()=>{
        infoContainer.style.display = infoContainer.style.display === 'flex' ? 'none' : 'flex';
        el.setAttribute('data-seen', 'true');
        updateProjectsSeen();
    })
})

   
function changeLang() {
    const docLang=document.documentElement.getAttribute("lang")==='pt'?'en':'pt';
    document.documentElement.setAttribute("lang",docLang);
    document.querySelectorAll("[data-lang]").forEach((element) => {
        const key = element.getAttribute("data-lang");
        element.innerHTML = lang[docLang][key] || lang['en'][key];
    });
}

function updateProjectsSeen() {
    const seenProjects = document.querySelectorAll('[data-seen="true"]'),

    orange = getComputedStyle(document.documentElement).getPropertyValue('--orange').trim(),
    green = getComputedStyle(document.documentElement).getPropertyValue('--green').trim();
    document.getElementById('progressValue').innerText = `${seenProjects.length}/${projectCount}`;
    document.querySelector(`#bar${seenProjects.length}`).style.backgroundColor = orange;
    if (seenProjects.length === projectCount) {
        document.getElementById('progressValue').style.color =  green
        document.querySelectorAll('[id^="bar"]').forEach(bar => {
            bar.style.backgroundColor = green;
        });
    }
}

function zigZagAlignArticles(){articles.forEach((p,i)=>{p.classList.toggle('right',i%2===1);})}

function handleScroll(e){projectsSection.scrollTop+=e.deltaY;updateProgress()}

function updateProgress(){scrollProgress.innerText = `${parseInt(projectsSection.scrollTop / (projectsSection.scrollHeight - projectsSection.clientHeight) * 100)}%`}
  
function changeTheme(){
    const theme = document.documentElement.getAttribute("data-theme"),
        newTheme=theme==='dark'?'light':'dark';
    btnTheme.querySelector('img').src =`assets/icons/${theme}mode.svg`;
    document.documentElement.setAttribute("data-theme", newTheme);
}

function setupEventListeners(){
    window.addEventListener('wheel',handleScroll,{passive:false});
    btnTheme.addEventListener('click',changeTheme)
    btnLanguage.addEventListener('click',changeLang)
}

function init(){
    setupEventListeners();
    setProjectCounter();
    zigZagAlignArticles();
}


// 1. Constants and Configuration
// 2. DOM Elements
// 3. Utility Functions
// 4. Core Logic / Feature-Specific Functions
// 5. Event Listeners
// 6. Initialization
document.addEventListener('DOMContentLoaded', init);

