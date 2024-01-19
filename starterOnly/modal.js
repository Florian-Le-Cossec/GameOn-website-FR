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
const closeModalBtn = document.querySelector('.close');
const firstNameInput = document.querySelector('#first');
const lastNameInput = document.querySelector('#last');
const emailInput = document.querySelector('#email');
const birthDateInput = document.querySelector('#birthdate');
const quantityInput = document.querySelector('#quantity');
const radios = document.querySelectorAll('input[name="location"]');
const gcuInput = document.querySelector('#checkbox1');
const form = document.querySelector('form');


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// close modal event
closeModalBtn.addEventListener('click', closeModal);


// form validation + submit

function verifyStringInput(string) {
  if (string.value.length < 2) {
    console.error('Ce champ nécessite au minimum 2 caractères.');
    return false;
  }
  return true;
};

function verifyEmailInput(email) {
  const emailValue = email.value;
  const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
  if(!emailRegex.test(emailValue)) {
    console.error('Veuillez entrer une adresse e-mail valide.');
    return false;
  }
  return true;
};

function verifyBirthdate(date) {
  const birthdate = new Date(date.value)
  const currentDate = new Date()
  const age = currentDate.getFullYear() - birthdate.getFullYear() - (
    (currentDate.getMonth() < birthdate.getMonth()) ||
    ((currentDate.getMonth() === birthdate.getMonth()) && (currentDate.getDate() < birthdate.getDate())));

  if(age < 18) {
    console.error('Vous devez avoir 18 ans ou plus.');
    return false;
  }
  if(date.value === '') {
    console.error('Veuillez entrer une date de naissance valide.');
    return false;
  }
  return true
};

function verifyQuantity(quantity) {
  const quantityValue = quantity.value
  const quantityRegex = new RegExp('^[0-9]{1,2}$')
  if(!quantityRegex.test(quantityValue)) {
    console.error('Ce champ nécessite une valeur numérique.');
    return false;
  }
  return true
};

function verifyRadios(cities) {
  const isChecked = Array.from(cities).some(radio => radio.checked);
  if(!isChecked) {
    console.error('Veuillez choisir un tournoi auquel vous souhaitez participer cette année.');
    return false
  }
  return true
};

function verifyGcu(gcu) {
  if(!gcu.checked) {
    console.error('Veuillez accepter les conditons d\'utilisation.');
    return false
  }
  return true
};

//eventListener

firstNameInput.addEventListener('input', () => {
  verifyStringInput(firstNameInput);
});
lastNameInput.addEventListener('input', () => {
  verifyStringInput(lastNameInput);
});
emailInput.addEventListener('input', () => {
  verifyEmailInput(emailInput);
});
birthDateInput.addEventListener('input', () => {
  verifyBirthdate(birthDateInput);
});
quantityInput.addEventListener('input', () => {
  verifyQuantity(quantityInput);
});
radios.forEach(radio => radio.addEventListener('change', () => {
  verifyRadios(radios);
}));
gcuInput.addEventListener('input', () => {
  verifyGcu(gcuInput);
});

function validate (e) {
  e.preventDefault()
  const isFirstNameValid = verifyStringInput(firstNameInput);
  const isLastNameValid = verifyStringInput(lastNameInput);
  const isEmailValid = verifyEmailInput(emailInput);
  const isBirthdateValid = verifyBirthdate(birthDateInput);
  const isQuantityValid = verifyQuantity(quantityInput);
  const isRadioSelected = verifyRadios(radios);
  const isGcuChecked = verifyGcu(gcuInput);

  if(isFirstNameValid && isLastNameValid && isEmailValid && isBirthdateValid && isQuantityValid && isRadioSelected && isGcuChecked){
    console.log('ok')
  }
}

form.addEventListener('submit', e => validate(e))