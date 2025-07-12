document.addEventListener("DOMContentLoaded", () => {
  const mainNavigation = document.getElementById("main-navbar");
  const hamburgerIcon = document.getElementById("hamburger-icon");
  
  if (mainNavigation && hamburgerIcon) {
    function toggleSideNav() {
      mainNavigation.classList.toggle("side-nav");
    }
    
    hamburgerIcon.addEventListener("click", toggleSideNav);
  }
  
  const birthdateInput = document.getElementById("birthdate");
  if (birthdateInput) {
    const today = new Date().toISOString().split("T")[0];
    birthdateInput.setAttribute("max", today);
  }
});

// Modal DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalContent = document.querySelector(".modal-body");
const modalCloseBtn = document.querySelector(".close-modal-btn");
const closeBtn = document.querySelector(".close");

// Open modal on any "modal-btn" click
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal when clicking the "X"
if (closeBtn) {
  closeBtn.addEventListener("click", closeModal);
}

// Show the modal
function launchModal() {
  if (modalbg) modalbg.style.display = "block";
}

// Close the modal
function closeModal() {
  if (modalbg) modalbg.style.display = "none";
}

// Helpers
function getInputValue(id) {
  const el = document.getElementById(id);
  if (el && "value" in el) {
    return el.value.trim();
  }
  return "";
}

function getCheckedStatus(id) {
  const el = document.getElementById(id);
  if (el && "checked" in el) {
    return el.checked;
  }
  return false;
}

const formElement = document.querySelector(".form-content");

if (formElement) {
  formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;
    
    // Reset error messages and styles
    document.querySelectorAll(".data-error").forEach((el) => {
      el.innerHTML = "";
      el.style.display = "none";
    });
    
    // Get form data
    const formData = {
      firstName: getInputValue("first"),
      lastName: getInputValue("last"),
      email: getInputValue("email"),
      birthdate: getInputValue("birthdate"),
      quantity: getInputValue("quantity"),
      location: document.querySelector("input[name='location']:checked"),
      terms: getCheckedStatus("checkbox1"),
    };
    
    // First Name
    if (formData.firstName.length < 2) {
      const error = document.querySelector(".first-error");
      if (error) {
        error.innerHTML = "Votre prénom doit contenir au moins 2 caractères.";
        error.style.display = "block";
      }
      isValid = false;
    }
    
    // Last Name
    if (formData.lastName.length < 2) {
      const error = document.querySelector(".last-error");
      if (error) {
        error.innerHTML = "Votre nom doit contenir au moins 2 caractères.";
        error.style.display = "block";
      }
      isValid = false;
    }
    
    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      const error = document.querySelector(".email-error");
      if (error) {
        error.innerHTML = "Veuillez entrer une adresse email valide.";
        error.style.display = "block";
      }
      isValid = false;
    }
    
    // Birthdate
    if (!formData.birthdate) {
      const error = document.querySelector(".birthdate-error");
      if (error) {
        error.innerHTML = "Veuillez entrer votre date de naissance.";
        error.style.display = "block";
      }
      isValid = false;
    } else {
      const birthDate = new Date(formData.birthdate);
      const today = new Date();
      const minBirthDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
      
      if (birthDate > minBirthDate) {
        const error = document.querySelector(".birthdate-error");
        if (error) {
          error.innerHTML = "Vous devez avoir au moins 16 ans pour vous inscrire.";
          error.style.display = "block";
        }
        isValid = false;
      }
    }
    
    // Quantity
    const quantityValue = parseInt(formData.quantity, 10);
    if (isNaN(quantityValue) || quantityValue < 0 || quantityValue > 99) {
      const error = document.querySelector(".quantity-error");
      if (error) {
        error.innerHTML = "Veuillez entrer un nombre valide.";
        error.style.display = "block";
      }
      isValid = false;
    }
    
    // Location
    if (!formData.location) {
      const error = document.querySelector(".location-error");
      if (error) {
        error.innerHTML = "Veuillez sélectionner un tournoi";
        error.style.display = "block";
      }
      isValid = false;
    }
    
    // Terms
    if (!formData.terms) {
      const error = document.querySelector(".terms-error");
      if (error) {
        error.innerHTML = "Vous devez accepter les conditions d'utilisation.";
        error.style.display = "block";
      }
      isValid = false;
    }
    
    // Final success
    if (isValid) {
      formElement.classList.add("form-hidden");
      
      const successContent = document.querySelector('.success-container');
      
      successContent.classList.remove("div-hidden");
      successContent.classList.add("show-success-content");
      
      modalCloseBtn.classList.remove("close-modal-btn");
      modalContent.classList.add("close-modal-content");
    }
    
    return isValid;
  });
}

function closeValidatedModal() {
  if (modalbg) modalbg.style.display = "none";
  window.location.reload();
}
