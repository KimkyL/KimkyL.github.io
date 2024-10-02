// Js para que las imagenes cambien a cada 5 segundos puede ser modificable.
let slides = document.querySelectorAll('.slide');
let currentIndex = 0;

function mostrarsiguienteslide() {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
}

// Cambia la imagen cada 5 segundos (5000 milisegundos)
setInterval(mostrarsiguienteslide, 5000);
