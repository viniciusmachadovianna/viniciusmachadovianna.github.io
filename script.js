import { lang } from './lang.js';
const btnLanguage = document.getElementById('language'),
    btnTheme = document.getElementById('theme'),
    projectsSection = document.getElementById('projects'),
    scrollProgress = document.getElementById('percentNumber'),
    articles = document.querySelectorAll('article'),
    progressBar = document.getElementById('progressBar'),
    progressContainer = document.getElementById('progress'),
    progressBars = document.getElementById('progress').querySelector('div'),
    progressSlash = document.getElementById('progressValue'),
    projectDescriptions = document.querySelectorAll('.projectDescription'),
    projectCount = document.querySelectorAll('article').length;
function setProjectCounter(){
    document.documentElement.style.setProperty('--projectCount', projectCount);
    progressSlash.textContent=`0/${projectCount}`;
}
function setProjectsColors(){
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
    articles.forEach((p)=>{p.querySelector('.shortcuts').style.background = `linear-gradient(115deg, ${colors[p.id][0]} 35%, ${colors[p.id][1]} 35%, ${colors[p.id][1]} 65%, ${colors[p.id][2]} 35%)`})
}
function addProgressBars(){
    for (let i = 0; i < projectCount; i++) {
        const div = document.createElement('div');
        div.setAttribute('id',`bar${i+1}`);
        progressBars.appendChild(div);
    }
}
function zigZagAlignArticles(){articles.forEach((p,i)=>{p.classList.toggle('bottom',i%2===1);})}
function handleScroll(e){projectsSection.scrollLeft+=e.deltaY;updateProgress()}
function handleKeys(e){
    if(!(e.type==='keydown'&&['ArrowDown','ArrowUp','ArrowLeft','ArrowRight'].includes(e.key)))return;
    if(e.key==='ArrowDown'||e.key==='ArrowRight')projectsSection.scrollLeft+=200
    else if(e.key==='ArrowUp'||e.key==='ArrowLeft')projectsSection.scrollLeft-=200
    updateProgress()
    
}
function updateProgress(){
    const max = projectsSection.scrollWidth - projectsSection.clientWidth;
    const progress = `${parseInt((projectsSection.scrollLeft/max)*100)}%`;
    progressBar.style.width=progress
    scrollProgress.innerText=progress
}
function changeTheme(){
    const theme = document.documentElement.getAttribute("data-theme");
    btnTheme.querySelector('img').src =`assets/icons/${theme}mode.svg`;
    document.documentElement.setAttribute("data-theme", theme==='dark'?'light':'dark');
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
    !tgt.parentNode.getAttribute('data-seen')&&tgt.parentNode.setAttribute('data-seen','true');
    updateProjectsSeenCounter();
}
function updateProjectsSeenCounter(){
    const seenProjects = document.querySelectorAll('[data-seen="true"]').length;
    document.getElementById('progressValue').innerText = `${seenProjects}/${projectCount}`;
    seenProjects!==projectCount?document.getElementById(`bar${seenProjects}`).classList.add('seen'):progressContainer.classList.add('completed');
}
function setupEventListeners(){
    window.addEventListener('wheel',handleScroll,{passive:false})
    window.addEventListener('keydown',handleKeys,{passive:false})
    btnTheme.addEventListener('click',changeTheme)
    btnLanguage.addEventListener('click',changeLang)
    projectDescriptions.forEach((desc =>{desc.addEventListener('click',()=>{toggleInfoVisibility(desc)})}))
}
function init(){
    setupEventListeners();
    setProjectCounter();
    setProjectsColors();
    addProgressBars();
    zigZagAlignArticles();
}
document.addEventListener('DOMContentLoaded', init);
