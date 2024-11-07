function $(el) {return document.querySelector(el);}

$("#cursor").style.display = "block";

document.querySelectorAll('*').forEach((element) => {
    element.style.cursor = 'none';
});

document.addEventListener('mousemove', (e) => {
    const arrow = $("#cursor");
    arrow.style.left = `${e.pageX - arrow.clientWidth/2}px`;
    arrow.style.top = `${e.pageY - arrow.clientHeight/2}px`;
})
