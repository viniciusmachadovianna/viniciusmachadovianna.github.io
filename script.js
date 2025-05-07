const $=(el)=>document.querySelector(el),
    langData = {
        en: {
            language: 'PT-BR',
            bio:'<b>FULLSTACK</b> WEB DEVELOPER FOCUSED ON INTUITIVE AND <b>MINIMALIST</b> APLICATIONS',
            ticTacToe:'TIC TAC TOE',
            projects:'PROJECTS VIEWED',
            db:'Database',
            tools:'Tools',
            month2:'FEB',month4:'APR',month5:'MAY',month8:'AUG',month9:'SEP',month10:'OCT',month12:'DEC',
            interactive:'Interactive',
            minigame:'Minigame',
            cart:'Cart',
            responsivity:'Responsive',
        },
        pt: {
            language: 'EN-US',
            bio: 'DESENVOLVEDOR WEB <b>FULLSTACK</b> FOCADO EM APLICAÇÕES INTUITIVAS E <b>MINIMALISTAS</b>',
            ticTacToe:'JOGO DA VELHA',
            projects:'PROJETOS VISTOS',
            db:'Banco de Dados',
            tools:'Ferramentas',
            month2:'FEV',month4:'ABR',month5:'MAI',month8:'AGO',month9:'SET',month10:'OUT',month12:'DEZ',
            interactive:'Interativo',
            minigame:'Minijogo',
            cart:'Carrinho',
            responsivity:'Responsivo',
        }
    },
    userLang = (navigator.language || navigator.userLanguage).slice(0, 2),
    // language = userLang === 'en' || userLang === 'pt' ? userLang : 'en',
    btnLanguage = $("#language"),
    btnTheme = $("#theme"),
    projectsSeen = [];
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
    btnTheme.querySelector('img').src = document.documentElement.getAttribute("data-theme") === "dark" ? "assets/icons/lightmode.svg" : "assets/icons/darkmode.svg"

})

async function getProjects() {
    fetch('projects.json')
    .then(response=>response.ok?response.json():Promise.reject(new Error('Network not ok')))
    .then(data=>{console.log(data)})
    .catch(error=>{console.error('Fetch error:',error)});
}
getProjects();

$('#projects').addEventListener("scroll", ()=>{
    $('#scrollProgress').style.height = ($('#projects').scrollTop/($('#projects').scrollHeight - $('#projects').clientHeight)*100)+ "%";
    
})

const titles = document.querySelectorAll('.projectTitle');
titles.forEach((el)=>{
    el.addEventListener('click',()=>{
        el.nextElementSibling.style.display = el.nextElementSibling.style.display === 'flex' ? 'none' : 'flex';
        el.parentNode.setAttribute('data-seen', 'true');
        updateProjectsSeen();
    })
})
function updateProjectsSeen() {
    const seenProjects = document.querySelectorAll('[data-seen="true"]');
    $('#progressValue').innerText = `${seenProjects.length}/2`;
    $(`#bar${seenProjects.length}`).style.backgroundColor = '#ffbe46';
    if (seenProjects.length === 2) { //change 2 later, make it dynamic
        $('#progressValue').style.color =  "#6cff76"
        document.querySelectorAll('.progressBar').forEach(bar => {
            bar.style.backgroundColor = "#6cff76"; //dynamic color as well
        });
    }
}