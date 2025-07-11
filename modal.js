document.addEventListener("DOMContentLoaded", () => {
  // Toggle nav on mobile
  const mainNavigation = document.getElementById("main-navbar");
  const hamburgerIcon = document.getElementById("hamburger-icon");
  
  if (mainNavigation && hamburgerIcon) {
    function toggleSideNav() {
      mainNavigation.classList.toggle("side-nav");
    }
    
    hamburgerIcon.addEventListener("click", toggleSideNav);
  }
  
  // Set max date of today in the birthdate input
  const birthdateInput = document.getElementById("birthdate");
  if (birthdateInput) {
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    birthdateInput.setAttribute("max", today);
  }
});

// Modal DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalContent = document.querySelector(".modal-content");
const modalCloseBtn = document.querySelector(".close-modal-btn");
const closeBtn = document.querySelector(".close");

// Open modal on any "modal-btn" click
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal when clicking the "X"
closeBtn.addEventListener("click", closeModal);

// Show the modal
function launchModal() {
  modalbg.style.display = "block";
}

// Close the modal
function closeModal() {
  modalbg.style.display = "none";
}

// Handle form submission
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  
  let isValid = true;
  
  // Reset all error messages and input styles
  document.querySelectorAll(".data-error").forEach((el) => {
    el.innerHTML = "";
    el.style.display = "none";
  });
  document.querySelectorAll(".text-control").forEach((el) => {
    el.classList.remove("input-error");
  });
  
  // Gather form data
  const formData = {
    firstName: document.getElementById("first").value.trim(),
    lastName: document.getElementById("last").value.trim(),
    email: document.getElementById("email").value.trim(),
    birthdate: document.getElementById("birthdate").value,
    quantity: document.getElementById("quantity").value,
    location: document.querySelector("input[name='location']:checked"),
    terms: document.getElementById("checkbox1").checked,
  };
  
  // Validate First Name (min 2 characters)
  if (formData.firstName.length < 2) {
    const error = document.querySelector(".first-error");
    error.innerHTML = "Votre prénom doit contenir au moins 2 caractères.";
    error.style.display = "block";
    document.getElementById("first").classList.add("input-error");
    isValid = false;
  }
  
  // Validate Last Name
  if (formData.lastName.length < 2) {
    const error = document.querySelector(".last-error");
    error.innerHTML = "Votre nom doit contenir au moins 2 caractères.";
    error.style.display = "block";
    document.getElementById("last").classList.add("input-error");
    isValid = false;
  }
  
  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    const error = document.querySelector(".email-error");
    error.innerHTML = "Veuillez entrer une adresse email valide.";
    error.style.display = "block";
    document.getElementById("email").classList.add("input-error");
    isValid = false;
  }
  
  // Validate Birthdate
  if (!formData.birthdate) {
    const error = document.querySelector(".birthdate-error");
    error.innerHTML = "Veuillez entrer votre date de naissance.";
    error.style.display = "block";
    document.getElementById("birthdate").classList.add("input-error");
    isValid = false;
  } else {
    const birthDate = new Date(formData.birthdate);
    const today = new Date();
    const minBirthDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
    
    if (birthDate > minBirthDate) {
      const error = document.querySelector(".birthdate-error");
      error.innerHTML = "Vous devez avoir au moins 16 ans pour vous inscrire.";
      error.style.display = "block";
      document.getElementById("birthdate").classList.add("input-error");
      isValid = false;
    }
  }
  
  // Validate Quantity
  if (!formData.quantity || formData.quantity < 0 || formData.quantity > 99) {
    const error = document.querySelector(".quantity-error");
    error.innerHTML = "Veuillez entrer un nombre valide.";
    error.style.display = "block";
    document.getElementById("quantity").classList.add("input-error");
    isValid = false;
  }
  
  // Validate Tournament Location
  if (!formData.location) {
    const error = document.querySelector(".location-error");
    error.innerHTML = "Veuillez sélectionner un tournoi";
    error.style.display = "block";
    isValid = false;
  }
  
  // Validate Terms Acceptance
  if (!formData.terms) {
    const error = document.querySelector(".terms-error");
    error.innerHTML = "Vous devez accepter les conditions d'utilisation.";
    error.style.display = "block";
    isValid = false;
  }
  
  // Show success message if all is valid
  if (isValid) {
    const form = document.querySelector("form");
    form.style.display = "none"; // hide the form
    
    const successMsg = document.createElement("p");
    successMsg.classList.add("success-message");
    successMsg.textContent = "Merci pour votre inscription !";
    
    modalContent.appendChild(successMsg);
    
    modalCloseBtn.classList.remove("close-modal-btn");
    modalContent.classList.add("close-modal-content");
  }
  
  return isValid;
});

// Close validated modal and reload
function closeValidatedModal() {
  modalbg.style.display = "none";
  window.location.reload();
}
