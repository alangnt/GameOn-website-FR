function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalContent = document.querySelector(".modal-content");
const modalCloseBtn = document.querySelector(".close-modal-btn");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

function closeModal() {
  modalbg.style.display = "none";
}

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  
  let isValid = true;
  
  // Reset the entire form
  document.querySelectorAll(".data-error").forEach((el) => {
    el.innerHTML = "";
    el.style.display = "none";
  });
  
  const formData = {
    firstName: document.getElementById("first").value.trim(),
    lastName: document.getElementById("last").value.trim(),
    email: document.getElementById("email").value.trim(),
    birthdate: document.getElementById("birthdate").value,
    quantity: document.getElementById("quantity").value,
    location: document.querySelector("input[name='location']:checked"),
    terms: document.getElementById("checkbox1").checked
  }
  
  // Name validation (at least 2 characters)
  if (formData.firstName.length < 2) {
    let error = document.querySelector(".first-error");
    error.innerHTML = "Votre prénom doit contenir au moins 2 caractères.";
    error.style.display = "block";
    isValid = false;
  }
  if (formData.lastName.length < 2) {
    let error = document.querySelector(".last-error");
    error.innerHTML = "Votre nom doit contenir au moins 2 caractères.";
    error.style.display = "block";
    isValid = false;
  }
  
  // Email validation (basic regex check)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    let error = document.querySelector(".email-error");
    error.innerHTML = "Veuillez entrer une adresse email valide.";
    error.style.display = "block";
    isValid = false;
  }
  
  // Birthdate validation
  if (!formData.birthdate) {
    let error = document.querySelector(".birthdate-error");
    error.innerHTML = "Veuillez entrer votre date de naissance.";
    error.style.display = "block";
    isValid = false;
  }
  
  // Quantity validation
  if (!formData.quantity || formData.quantity < 0 || formData.quantity > 99) {
    let error = document.querySelector(".quantity-error");
    error.innerHTML = "Veuillez entrer un nombre valide.";
    error.style.display = "block";
    isValid = false;
  }
  
  // Tournament selection validation
  if (!formData.location) {
    let error = document.querySelector(".location-error");
    error.innerHTML = "Veuillez sélectionner un tournoi";
    error.style.display = "block";
    isValid = false;
  }
  
  // Terms and conditions validation
  if (!formData.terms) {
    let error = document.querySelector(".terms-error");
    error.innerHTML = "Vous devez accepter les conditions d'utilisation.";
    error.style.display = "block";
    isValid = false;
  }
  
  if (isValid) {
    modalContent.innerHTML = "Merci pour votre inscription";
    modalCloseBtn.classList.remove("close-modal-btn");
    modalContent.classList.add("close-modal-content");
  }
  
  return isValid;
});

function closeValidatedModal() {
  modalbg.style.display = "none";
  window.location.reload();
}


