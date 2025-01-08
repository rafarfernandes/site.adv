// Slide
let currentSlide = 0;
const slides = document.querySelectorAll('.slide-item');
const slideContainer = document.querySelector('.slide-container');

function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

document.querySelector('.prev').addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

document.querySelector('.next').addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

// Carrosséis
function setupCarrossel(carrosselSelector) {
    const carrossel = document.querySelector(carrosselSelector);
    const container = carrossel.querySelector('.carrossel-container');
    const items = carrossel.querySelectorAll('.carrossel-item');

    let isDragging = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    container.addEventListener('mouseup', () => {
        isDragging = false;
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed
        container.scrollLeft = scrollLeft - walk;
    });
}

setupCarrossel('.carrossel');
setupCarrossel('.carrossel-equipe');
