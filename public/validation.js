/* eslint-disable */
const nameInput = document.getElementById('name-input');
const nameAlert = document.getElementById('name-alert');
const ratingInput = document.getElementById('rating-input');
const ratingAlert = document.getElementById('rating-alert');

const showOrHideMessage = (bool, alert) => {
  bool ? alert.classList.remove('show-error') : alert.classList.add('show-error')
}

// can only contain letters
const isValidName = (name) => {
  return /^[a-zA-Z]+$/.test(name)
}

// can only contain numbers
const isValidNumber = (num) => {
  return /^[\d]+$/.test(num)
}

const createListener = (validator) => {
  return (e) => {
    const text = e.target.value
    const valid = validator(text)
    const showAlert = text !== '' && !valid
    const alertBox = e.target.nextElementSibling
    showOrHideMessage(showAlert, alertBox)
  }
}

nameInput.addEventListener('input', createListener(isValidName))

ratingInput.addEventListener('input', createListener(isValidNumber))
