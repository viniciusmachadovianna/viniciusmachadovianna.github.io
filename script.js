import { lang } from './lang.js';

const btnLanguage = document.getElementById('language'),
    btnTheme = document.getElementById('theme'),
    projectsSection = document.getElementById('projects'),
    scrollProgress = document.getElementById('scrollProgress'),
    projectCount = document.querySelectorAll('article').length,
    articles = document.querySelectorAll('article'),
    progressBars = document.getElementById('progress').querySelector('div'),
    progressSlash = document.getElementById('progressValue'),
    projectDescriptions = document.querySelectorAll('.projectDescription');
     
function setProjectCounter(){
    document.documentElement.style.setProperty('--projectCount', projectCount);
    progressSlash.textContent=`0/${projectCount}`;
}


function addProgressBars(){
    for (let i = 0; i < projectCount; i++) {
        const div = document.createElement('div');
        div.setAttribute('id',`bar${i+1}`);
        progressBars.appendChild(div);
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

function zigZagAlignArticles(){articles.forEach((p,i)=>{p.classList.toggle('right',i%2===1);})}

function handleScroll(e){projectsSection.scrollTop+=e.deltaY;updateProgress()}

function updateProgress(){scrollProgress.innerText = `${parseInt(projectsSection.scrollTop / (projectsSection.scrollHeight - projectsSection.clientHeight) * 100)}%`}
  
function changeTheme(){
    const theme = document.documentElement.getAttribute("data-theme"),
        newTheme=theme==='dark'?'light':'dark';
    btnTheme.querySelector('img').src =`assets/icons/${theme}mode.svg`;
    document.documentElement.setAttribute("data-theme", newTheme);
}

function changeLang() {
    const newLang=document.documentElement.getAttribute("lang")==='pt'?'en':'pt';
    document.documentElement.setAttribute("lang",newLang);
    document.querySelectorAll("[data-lang]").forEach((element)=>{
        const key=element.getAttribute("data-lang");
        element.innerHTML=lang[newLang][key]||lang['pt'][key];
    });
}

function toggleInfoVisibility(tgt){
    const info = tgt.querySelector('.more');
    info.style.display=info.style.display==='flex'?'none':'flex';
    !tgt.parentNode.getAttribute('data-seen') && markProjectAsSeen(tgt.parentNode);
}

function markProjectAsSeen(proj){
    proj.setAttribute('data-seen', 'true');
    const seenProjects = document.querySelectorAll('[data-seen="true"]'),
    orange = getComputedStyle(document.documentElement).getPropertyValue('--orange').trim(),
    green = getComputedStyle(document.documentElement).getPropertyValue('--green').trim();
    document.getElementById('progressValue').innerText = `${seenProjects.length}/${projectCount}`;
    document.querySelector(`#bar${seenProjects.length}`).classList.add('seen');
    if (seenProjects.length === projectCount) {
        document.getElementById('progressValue').classList.add('completed');
        document.getElementById('progress').querySelector('div').classList.add('completed');
    }
}

function setupEventListeners(){
    window.addEventListener('wheel',handleScroll,{passive:false});
    btnTheme.addEventListener('click',changeTheme)
    btnLanguage.addEventListener('click',changeLang)
    projectDescriptions.forEach((desc =>{desc.addEventListener('click',()=>{toggleInfoVisibility(desc)})}))
}

function init(){
    setupEventListeners();
    zigZagAlignArticles();
    setProjectCounter();
    addProgressBars();
}


// 1. Constants and Configuration
// 2. DOM Elements
// 3. Utility Functions
// 4. Core Logic / Feature-Specific Functions
// 5. Event Listeners
// 6. Initialization
document.addEventListener('DOMContentLoaded', init);

