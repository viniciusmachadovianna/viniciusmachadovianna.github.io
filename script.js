import { lang } from './lang.js';
const $=(el)=>document.querySelector(el),
    projectsSeen = [];
    
const btnLanguage = $("#language"),
    btnTheme = $("#theme"),
    projects = document.querySelectorAll('article').length,
    orange = getComputedStyle(document.documentElement).getPropertyValue('--orange').trim(),
    green = getComputedStyle(document.documentElement).getPropertyValue('--green').trim(),
    articles = document.querySelectorAll('article');
     

function setProjectCounter(){
    document.documentElement.style.setProperty('--projectCount', projects);
    $('#progressValue').innerText = `0/${projects}`;
    const projectList = $('#progress').querySelector('div');
    for (let i = 0; i < projects; i++) {
        const div = document.createElement('div');
        div.setAttribute('id',`bar${i+1}`);
        projectList.appendChild(div);
    }
}

function setProjectColors(){
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

window.addEventListener('wheel',function(e){e.preventDefault();document.getElementById('projects').scrollTop+=e.deltaY},{passive:false});
    
btnTheme.addEventListener('click',()=>{
    document.documentElement.setAttribute("data-theme", document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
    btnTheme.querySelector('img').src = document.documentElement.getAttribute("data-theme") === "dark" ? "assets/icons/lightmode.svg" : "assets/icons/darkmode.svg"

})

function updateProgress(){
    $('#scrollProgress').innerText=`${parseInt($('#projects').scrollTop/($('#projects').scrollHeight-$('#projects').clientHeight)*100)}%`
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
    const seenProjects = document.querySelectorAll('[data-seen="true"]');
    $('#progressValue').innerText = `${seenProjects.length}/${projects}`;
    $(`#bar${seenProjects.length}`).style.backgroundColor = orange;
    if (seenProjects.length === projects) {
        $('#progressValue').style.color =  green
        document.querySelectorAll('[id^="bar"]').forEach(bar => {
            bar.style.backgroundColor = green;
        });
    }
}

function setupEventListeners(){
    btnLanguage.addEventListener('click',changeLang)
    $('#projects').addEventListener("scroll",updateProgress)
}

function init(){
    setupEventListeners();
    setProjectCounter();
}
document.querySelectorAll('article').forEach((project,i)=>{(i+1)%2===0&&project.classList.add('right')});

document.addEventListener('DOMContentLoaded', init);
