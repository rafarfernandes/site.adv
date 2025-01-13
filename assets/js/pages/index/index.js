// Seleciona o botão de toggle e o menu
document.getElementById('menu-toggle').addEventListener('click', function() {
    const menuItems = document.getElementById('menu-items');
    menuItems.classList.toggle('show');
});

// Alterna a exibição do menu ao clicar no ícone
menuToggle.addEventListener('click', () => {
    menuItems.classList.toggle('show');
});


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
const carousel = document.querySelector('.carousel');
const leftBtn = document.querySelector('.nav-btn.left');
const rightBtn = document.querySelector('.nav-btn.right');

let currentIndex = 0;

const updateCarousel = () => {
  const offset = currentIndex * -1440; // Move by section width
  carousel.style.transform = `translateX(${offset}px)`;
};

rightBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % 3; // Loop back after last
  updateCarousel();
});

leftBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + 3) % 3; // Loop back to first
  updateCarousel();
});


//Equipe 
document.addEventListener("DOMContentLoaded", () => {
    const photo = document.querySelector(".team-photo img");

    photo.addEventListener("mouseover", () => {
      photo.style.filter = "grayscale(50%)";
    });

    photo.addEventListener("mouseout", () => {
      photo.style.filter = "grayscale(0%)";
    });
  });




  

//forms
document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const fields = ["name", "phone", "email", "subject", "message"];
    let isValid = true;

    fields.forEach((field) => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            showError(input, "Este campo é obrigatório.");
            isValid = false;
        } else if (field === "email" && !validateEmail(input.value)) {
            showError(input, "Digite um e-mail válido.");
            isValid = false;
        } else {
            showSuccess(input);
        }
    });

    if (isValid) {
        alert("Formulário enviado com sucesso!");
        form.reset(); // Opcional: limpa o formulário após o envio
    }
});

// Função para exibir erro
function showError(input, message) {
    input.classList.add("error");
    input.classList.remove("success");

    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains("error-message")) {
        errorElement = document.createElement("span");
        errorElement.classList.add("error-message");
        errorElement.style.color = "#FF4D4D";
        errorElement.style.fontSize = "0.8rem";
        errorElement.style.marginTop = "5px";
        errorElement.style.display = "block";
        input.after(errorElement);
    }
    errorElement.textContent = message;
}

// Função para exibir sucesso
function showSuccess(input) {
    input.classList.add("success");
    input.classList.remove("error");

    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains("error-message")) {
        errorElement.remove();
    }
}

// Validação simples de e-mail
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
