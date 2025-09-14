import { changeLang } from './lang.js';
const btnLanguage = document.getElementById('language'),
    btnTheme = document.getElementById('theme'),
    projectsSection = document.getElementById('projects'),
    scrollProgress = document.getElementById('percentNumber'),
    articles = document.querySelectorAll('article'),
    progressBar = document.getElementById('progressBar'),
    progressContainer = document.querySelector('footer'),
    progressBars = progressContainer.querySelector('div'),
    progressSlash = document.getElementById('progressValue'),
    projectDescriptions = document.querySelectorAll('.projectDescription'),
    projectLinks = document.querySelectorAll('.shortcut'),
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
        taskit:             ['#41B783','#34495E','#333333'],
        ticTacToe:          ['#bb00ff','#a40094','#800080'],
        youtubeConverter:   ['#9b1f00','#dcdcdc','#9b1f00'],
    };
    articles.forEach((p)=>{p.querySelector('.shortcuts').style.background = `linear-gradient(115deg, ${colors[p.id][0]} 35%, ${colors[p.id][1]} 35%, ${colors[p.id][1]} 65%, ${colors[p.id][2]} 35%)`})
}
function addProgressBars(){
    for (let i = 0; i < projectCount; i++) {
        const a = document.createElement('a');
        const p = projectsSection;
        a.setAttribute('id',`bar${i+1}`);
        a.setAttribute('href',`#${p.children[i].id}`);
        progressBars.appendChild(a);
    }
}
function zigZagAlignArticles(){articles.forEach((p,i)=>{p.classList.toggle('bottom',i%2===1);})}
function handleScroll(e){
    projectsSection.scrollTop+=e.deltaY;
    updateProgress();
}
function handleTouch(e){
    projectsSection.scrollLeft = scrollLeft + startX - e.touches[0].pageX;updateProgress()
}
function handleKeys(e){
    if(!(e.type==='keydown'&&['ArrowDown','ArrowUp','ArrowLeft','ArrowRight'].includes(e.key)))return;
    if(e.key==='ArrowDown'||e.key==='ArrowRight')projectsSection.scrollLeft+=200
    else if(e.key==='ArrowUp'||e.key==='ArrowLeft')projectsSection.scrollLeft-=200
    updateProgress()
    
}
function updateProgress(){
    const max = projectsSection.scrollHeight - projectsSection.clientHeight;
    const progress = parseInt((projectsSection.scrollTop/max)*100);
    const scrollTip = document.querySelector('[data-lang="scroll"]');
    const percent = `${progress}%`;
    progressBar.style.width=percent
    scrollProgress.innerText=percent
    if (progress > 95) scrollTip.classList.add('hidden')
    else {scrollTip.classList.remove('hidden')}

}
function changeTheme(){
    const theme = document.documentElement.getAttribute("data-theme");
    btnTheme.querySelector('img').src =`assets/icons/${theme}mode.svg`;
    document.documentElement.setAttribute("data-theme", theme==='dark'?'light':'dark');
}
function toggleInfoVisibility(tgt){
    const info = tgt.querySelector('.more');
    info.classList.toggle('hidden');
    markAsSeen(tgt.parentNode)
}
function markAsSeen(tgt){
    console.log('teste',tgt);
    !tgt.getAttribute('data-seen')&&tgt.setAttribute('data-seen','true');
    updateProjectsSeenCounter(tgt)
}
function updateProjectsSeenCounter(project){
    const seenProjects = document.querySelectorAll('[data-seen="true"]').length;
    document.getElementById('progressValue').innerText = `${seenProjects}/${projectCount}`;
    seenProjects!==projectCount?document.getElementById(`bar${seenProjects}`).classList.add('seen'):progressContainer.classList.add('completed');
}
function setupEventListeners(){
    window.addEventListener('wheel',handleScroll,{passive:false})
    window.addEventListener('touchmove',handleTouch,{passive:true})
    window.addEventListener('keydown',handleKeys,{passive:false})
    btnTheme.addEventListener('click',changeTheme)
    btnLanguage.addEventListener('click',changeLang)
    projectDescriptions.forEach((desc =>{desc.addEventListener('click',()=>{toggleInfoVisibility(desc)})}))
    projectLinks.forEach((link =>{link.addEventListener('click',()=>{markAsSeen(link.parentNode.parentNode)})}))
}
function init(){
    setupEventListeners();
    setProjectCounter();
    setProjectsColors();
    addProgressBars();
    zigZagAlignArticles();
}
document.addEventListener('DOMContentLoaded', init);
