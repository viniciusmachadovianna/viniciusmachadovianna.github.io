const $=(el)=>document.querySelector(el),
    langData = {
        en: {
            language: 'PT-BR',
            bio:'<b>FULLSTACK</b> WEB DEVELOPER FOCUSED ON INTUITIVE AND <b>MINIMALIST</b> APLICATIONS',
            ticTacToe:'TIC TAC TOE',
            portfolio:'PORTFOLIO',
            projects:'PROJECTS VIEWED',
            db:'Database',
            tools:'Tools',
            month2:'FEB',month4:'APR',month5:'MAY',month8:'AUG',month9:'SEP',month10:'OCT',month12:'DEC',
            interactive:'Interactive',
            minigame:'Minigame',
            cart:'Cart',
            responsivity:'Responsive',
            scroll:'SCROLL'
        },
        pt: {
            language: 'EN-US',
            bio: 'DESENVOLVEDOR WEB <b>FULLSTACK</b> FOCADO EM APLICAÇÕES INTUITIVAS E <b>MINIMALISTAS</b>',
            ticTacToe:'JOGO DA VELHA',
            portfolio:'PORTIFÓLIO',
            projects:'PROJETOS VISTOS',
            db:'Banco de Dados',
            tools:'Ferramentas',
            month2:'FEV',month4:'ABR',month5:'MAI',month8:'AGO',month9:'SET',month10:'OUT',month12:'DEZ',
            interactive:'Interativo',
            minigame:'Minijogo',
            cart:'Carrinho',
            responsivity:'Responsivo',
            scroll:'ROLE'
        }
    },
    userLang = (navigator.language || navigator.userLanguage).slice(0, 2),
    // language = userLang === 'en' || userLang === 'pt' ? userLang : 'en',
    btnLanguage = $("#language"),
    btnTheme = $("#theme"),
    projectsSeen = [],
    projects = document.querySelectorAll('article').length,
    green = getComputedStyle(document.documentElement).getPropertyValue('--green').trim(),
    textColor = getComputedStyle(document.documentElement).getPropertyValue('--text').trim(),
    titles = document.querySelectorAll('.projectTitle');

    
    window.addEventListener('wheel',function(e){e.preventDefault();document.getElementById('projects').scrollTop+=e.deltaY},{passive:false});
    
btnTheme.addEventListener('click',()=>{
    document.documentElement.setAttribute("data-theme", document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
    btnTheme.querySelector('img').src = document.documentElement.getAttribute("data-theme") === "dark" ? "assets/icons/lightmode.svg" : "assets/icons/darkmode.svg"

})
$('#projects').addEventListener("scroll",()=>{$('#scrollProgress').innerText=`${parseInt($('#projects').scrollTop/($('#projects').scrollHeight-$('#projects').clientHeight)*100)}%`})

titles.forEach((el)=>{
    el.addEventListener('click',()=>{
        el.nextElementSibling.style.display = el.nextElementSibling.style.display === 'flex' ? 'none' : 'flex';
        el.parentNode.setAttribute('data-seen', 'true');
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
    $(`#bar${seenProjects.length}`).style.backgroundColor = '#ffbe46';
    if (seenProjects.length === projects) {
        $('#progressValue').style.color =  green
        document.querySelectorAll('[id^="bar"]').forEach(bar => {
            bar.style.backgroundColor = green;
        });
    }
}
