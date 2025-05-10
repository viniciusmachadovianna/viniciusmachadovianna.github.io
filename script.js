const $=(el)=>document.querySelector(el),
    langData = {
        en: {
            // GENERAL UI
            language: 'PT-BR',
            bio:'<b>FULLSTACK</b> WEB DEVELOPER FOCUSED ON INTUITIVE AND <b>MINIMALIST</b> APLICATIONS',
            projects:'PROJECTS VIEWED',
            scroll:'SCROLL',
            // PROJECTS
            arariamaDesc:'',
            betterYouDesc:'',
            chatbotDesc:'',
            portfolio:'PORTFOLIO',
            portfolioDesc:'pt',
            speedLogDesc:'sp',
            sublimeDesc:'',
            talesTrailsDesc:'',
            ticTacToe:'TIC TAC TOE',
            ticTacToeDesc:'The classic tic-tac-toe game, with a <b>minimalist</b> and colorful design <b>aimed at children</b>',
            youtubeConverter:'YOUTUBE CONVERTER',
            youtubeConverterDesc:'yt',
            // FILTERS
            db:'Database',
            tools:'Tools',
            month2:'FEB',month4:'APR',month5:'MAY',month8:'AUG',month9:'SEP',month10:'OCT',month12:'DEC',
            // TAGS
            interactive:'Interactive',
            minigame:'Minigame',
            cart:'Cart',
            practical:"Practical",
            responsivity:'Responsive',
            colaboration:'Colaboration',
            logistics:'Logistics',
            permissions:'Permissions',
            showcase:'Showcase',
            vanilla:'Vanilla',
            mobile:'Mobile',
            ml:'Machine Learning',
            ai:'Artificial Intelligence',
            ux:'User Experience',
            ui:'User Interface',
        },
        pt: {
            language: 'EN-US',
            bio: 'DESENVOLVEDOR WEB <b>FULLSTACK</b> FOCADO EM APLICAÇÕES INTUITIVAS E <b>MINIMALISTAS</b>',
            projects:'PROJETOS VISTOS',
            scroll:'ROLE',

            arariamaDesc:'Comércio digital de livros usados',
            betterYouDesc:'',
            chatbotDesc:'',
            portfolio:'PORTFOLIO',
            portfolioDesc:'pt',
            speedLogDesc:'sp',
            sublimeDesc:'',
            talesTrailsDesc:'',
            ticTacToe:'JOGO DA VELHA',
            ticTacToeDesc:'O clássico jogo da velha, com um design <b>minimalista</b> voltado para o <b>público infantil</b>',
            youtubeConverter:"CONVERSOR DO YOUTUBE",
            youtubeConverterDesc:'YOUTUBE CONVERTER',

            db:'Banco de Dados',
            tools:'Ferramentas',
            month2:'FEV',month4:'ABR',month5:'MAI',month8:'AGO',month9:'SET',month10:'OUT',month12:'DEZ',
            
            interactive:'Interativo',
            minigame:'Minijogo',
            cart:'Carrinho',
            practical:"Prático",
            responsivity:'Responsivo',
            colaboration:'Colaboração',
            logistics:'Logística',
            permissions:'Permissões',
            showcase:'Amostragem',
            vanilla:'Puro',
            mobile:'Celular',
            ml:'Aprendizado Máquina',
            ai:'Inteligência Artificial',
            ux:'Experiência do Usuário',
            ui:'Interface do Usuário',
        }
    },
    userLang = (navigator.language || navigator.userLanguage).slice(0, 2),
    // language = userLang === 'en' || userLang === 'pt' ? userLang : 'en',
    btnLanguage = $("#language"),
    btnTheme = $("#theme"),
    projectsSeen = [],
    projects = document.querySelectorAll('article').length,
    orange = getComputedStyle(document.documentElement).getPropertyValue('--orange').trim(),
    green = getComputedStyle(document.documentElement).getPropertyValue('--green').trim(),
    articles = document.querySelectorAll('article');

document.querySelectorAll('article').forEach((project,i)=>{(i+1)%2===0&&project.classList.add('right')});

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
setProjectCounter();

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
$('#projects').addEventListener("scroll",()=>{$('#scrollProgress').innerText=`${parseInt($('#projects').scrollTop/($('#projects').scrollHeight-$('#projects').clientHeight)*100)}%`})

articles.forEach((el)=>{
    const infoContainer = el.querySelector('.projectDescription').querySelector('.more')
    el.querySelector('.projectDescription').addEventListener('click',()=>{
        infoContainer.style.display = infoContainer.style.display === 'flex' ? 'none' : 'flex';
        el.setAttribute('data-seen', 'true');
        updateProjectsSeen();
    })
})

btnLanguage.addEventListener('click',()=>{changeLang()})
   
function changeLang() {
    const lang=document.documentElement.getAttribute("lang")==='pt'?'en':'pt';
    document.documentElement.setAttribute("lang",lang);
    document.querySelectorAll("[data-lang]").forEach((element) => {
        const key = element.getAttribute("data-lang");
        element.innerHTML = langData[lang][key] || langData['en'][key];
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
