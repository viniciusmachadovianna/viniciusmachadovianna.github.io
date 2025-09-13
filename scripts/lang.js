const lang = {
    en: {
        // GENERAL UI
        language: 'PT-BR',
        bio:'<b>FULLSTACK</b> WEB DEVELOPER FOCUSED ON INTUITIVE AND <b>MINIMALIST</b> APLICATIONS',
        projects:'PROJECTS VIEWED',
        progressTip:'Click on a project title or links to view it',
        scroll:'SCROLL',
        // PROJECTS
        arariamaDesc:'',
        betterYouDesc:'',
        chatbotDesc:'',
        portfolio:'PORTFOLIO',
        portfolioDesc:'Made with technology and <b>pure creativity</b>, here you can discover my skills and connect with me. Some projects include design and prototyping references, take the opportunity to compare <b>expectation vs. reality</b>.',
        speedLogDesc:'',
        sublimeDesc:'',
        talesTrailsDesc:'',
        taskitDesc:"Task manager, the classic <b>To Do List</b>. Built using the Vue.js framework, it's my first project with this technology.",
        ticTacToe:'TIC TAC TOE',
        ticTacToeDesc:'The classic tic-tac-toe game, with a <b>playful</b> and colorful design <b>made for children</b>',
        youtubeConverter:'YOUTUBE CONVERTER',
        youtubeConverterDesc:'yt',
        // FILTERS
        db:'Database',
        tools:'Tools',
        month2:'FEB',month4:'APR',month5:'MAY',month8:'AUG',month9:'SEP',month10:'OCT',month12:'DEC',
        // TAGS
        ai:'Artificial Intelligence',
        cart:'Cart',
        classic:'Classic',
        colaboration:'Colaboration',
        interactive:'Interactive',
        logistics:'Logistics',
        minigame:'Minigame',
        minimalist:'Minimalist',
        ml:'Machine Learning',
        mobile:'Mobile',
        permissions:'Permissions',
        practical:"Practical",
        responsivity:'Responsive',
        showcase:'Showcase',
        vanilla:'Vanilla',
        ui:'User Interface',
        ux:'User Experience',

    },
    pt: {
        language: 'EN-US',
        bio: 'DESENVOLVEDOR WEB <b>FULLSTACK</b> FOCADO EM APLICAÇÕES INTUITIVAS E <b>MINIMALISTAS</b>',
        projects:'PROJETOS VISTOS',
        progressTip:'Clique no título ou links para visualizar',
        scroll:'ROLE',

        arariamaDesc:'Comércio digital de livros usados',
        betterYouDesc:'',
        chatbotDesc:'',
        portfolio:'PORTFÓLIO',
        portfolioDesc:'Feito com tecnologia e <b>criatividade pura</b>, aqui você conhece minhas habilidades e pode se conectar comigo.Alguns projetos contam com referências de design e prototipação, aproveite para comparar a <b>expectativa vs realidade</b>.',
        speedLogDesc:'',
        sublimeDesc:'',
        talesTrailsDesc:'',
        taskitDesc:'Gerenciador de tarefas, o clássico <b>To Do List</b>. Produzido com o framework Vue.js, é meu primeiro projeto com a tecnologia.',
        ticTacToe:'JOGO DA VELHA',
        ticTacToeDesc:'O clássico jogo da velha, com um design <b>minimalista</b> voltado para o <b>público infantil</b>',
        youtubeConverter:"CONVERSOR DO YOUTUBE",
        youtubeConverterDesc:'YOUTUBE CONVERTER',

        db:'Banco de Dados',
        tools:'Ferramentas',
        month2:'FEV',month4:'ABR',month5:'MAI',month8:'AGO',month9:'SET',month10:'OUT',month12:'DEZ',
        
        ai:'Inteligência Artificial',
        cart:'Carrinho',
        classic:'Clássico',
        colaboration:'Colaboração',
        interactive:'Interativo',
        logistics:'Logística',
        minigame:'Minijogo',
        minimalist:'Minimalista',
        ml:'Aprendizado Máquina',
        mobile:'Celular',
        permissions:'Permissões',
        practical:"Prático",
        responsivity:'Responsivo',
        showcase:'Amostragem',
        vanilla:'Puro',
        ui:'Interface do Usuário',
        ux:'Experiência do Usuário',
    }
};

export function changeLang() {
    const newLang=document.documentElement.getAttribute("lang")==='pt'?'en':'pt';
    document.documentElement.setAttribute("lang",newLang);
    document.querySelectorAll("[data-lang]").forEach((element)=>{
        const key=element.getAttribute("data-lang");
        element.innerHTML=lang[newLang][key]||lang['pt'][key];
    });
}