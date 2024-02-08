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
const confirmModal = document.querySelector('.confirm-modal')
const confitmModalButton = document.querySelector('.confirm-modal__button')

//object error messages
const messages = {
  stringMessage: 'Ce champ nécessite au minimum 2 caractères.',
  emailMessage: 'Veuillez entrer une adresse e-mail valide.',
  dateMessage1: 'Vous devez avoir 18 ans ou plus.',
  dateMessage2: 'Veuillez entrer une date de naissance valide.',
  quantityMessage: 'Ce champ nécessite une valeur numérique.',
  radioMessage: 'Veuillez choisir un tournoi auquel vous souhaitez participer cette année.',
  checkBoxMessage: 'Veuillez accepter les conditons d\'utilisation.',
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
  confirmModal.style.display = "none"
  form.style.display = 'block'
}

// show + remove error Message
function showErrorMessage(element, message) {
  element.parentElement.dataset.errorVisible = 'true';
  element.parentElement.dataset.error = message;
}
function removeErrorMessage(element) {
  delete element.parentElement.dataset.errorVisible;
  delete element.parentElement.dataset.error;
}

// validate form
function verifyStringInput(string) {
  if (string.value.length < 2) {
    showErrorMessage(string, messages.stringMessage);
    return false;
  }
  removeErrorMessage(string);
  return true;
}

function verifyEmailInput(email) {
  const emailValue = email.value;
  const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');

  if(!emailRegex.test(emailValue)) {
    showErrorMessage(email, messages.emailMessage);
    return false;
  }
  removeErrorMessage(email);
  return true;
};

function verifyBirthdate(date) {
  const birthdate = new Date(date.value);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthdate.getFullYear() - (
    (currentDate.getMonth() < birthdate.getMonth()) ||
    ((currentDate.getMonth() === birthdate.getMonth()) && (currentDate.getDate() < birthdate.getDate())));

  if(age < 18) {
    showErrorMessage(date, messages.dateMessage1);
    return false;
  }
  if(date.value === '') {
    showErrorMessage(date, messages.dateMessage2);
    return false;
  }
  removeErrorMessage(date);
  return true;
};

function verifyQuantity(quantity) {
  const quantityValue = quantity.value;
  const quantityRegex = new RegExp('^[0-9]{1,2}$')
  if(!quantityRegex.test(quantityValue)) {
    showErrorMessage(quantity, messages.quantityMessage);
    return false;
  }
  removeErrorMessage(quantity);
  return true;
};

function verifyRadios(cities) {
  const isChecked = Array.from(cities).some(radio => radio.checked);
  if(!isChecked) {
    showErrorMessage(cities[0], messages.radioMessage);
    return false;
  }
  removeErrorMessage(cities[0]);
  return true;
};

function verifyGcu(gcu) {
  if(!gcu.checked) {
    showErrorMessage(gcu, messages.checkBoxMessage);
    return false;
  }
  removeErrorMessage(gcu);
  return true;
};


//function to validate form
function validate (e) {
  e.preventDefault();
  const isFirstNameValid = verifyStringInput(firstNameInput);
  const isLastNameValid = verifyStringInput(lastNameInput);
  const isEmailValid = verifyEmailInput(emailInput);
  const isBirthdateValid = verifyBirthdate(birthDateInput);
  const isQuantityValid = verifyQuantity(quantityInput);
  const isRadioSelected = verifyRadios(radios);
  const isGcuChecked = verifyGcu(gcuInput);

  if(isFirstNameValid && isLastNameValid && isEmailValid && isBirthdateValid && isQuantityValid && isRadioSelected && isGcuChecked){
    form.style.display = 'none';
    confirmModal.style.display = 'flex';
    form.reset();
  }
}

//eventListener to verify input
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

// close modal event
closeModalBtn.addEventListener('click', closeModal);

//eventListener to submit the form
form.addEventListener('submit', e => validate(e));

//eventListener to close confirm modal
confitmModalButton.addEventListener('click', closeModal)