function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

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

function validateForm() {
  let isValid = true;
  
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
    alert("Votre prénom doit contenir au moins 2 caractères.");
    isValid = false;
  }
  if (formData.lastName.length < 2) {
    alert("Votre nom doit contenir au moins 2 caractères.");
    isValid = false;
  }
  
  // Email validation (basic regex check)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    alert("Veuillez entrer une adresse email valide.");
    isValid = false;
  }
  
  // Birthdate validation (must be at least 13 years old)
  if (formData.birthdate) {
    const birthYear = new Date(formData.birthdate).getFullYear();
    const currentYear = new Date().getFullYear();
    if (currentYear - birthYear < 13) {
      alert("Vous devez avoir au moins 13 ans pour vous inscrire.");
      isValid = false;
    }
  } else {
    alert("Veuillez entrer votre date de naissance.");
    isValid = false;
  }
  
  // Tournament selection validation
  if (!formData.location) {
    alert("Veuillez sélectionner un tournoi.");
    isValid = false;
  }
  
  // Terms and conditions validation
  if (!formData.terms) {
    alert("Vous devez accepter les conditions d'utilisation.");
    isValid = false;
  }
  
  return isValid;
}


