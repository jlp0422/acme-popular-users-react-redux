/* eslint-disable */
const nameInput = document.getElementById('name-input');
const ratingInput = document.getElementById('rating-input');

// determines whether to show or hide message, and where to show it
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

// determining whether input is valid
const createListener = (validator) => {
  return (e) => {
    const text = e.target.value
    const valid = validator(text)
    const showAlert = text !== '' && !valid
    const alertBox = e.target.nextElementSibling
    showOrHideMessage(showAlert, alertBox)
  }
}

// event listeners for each input
nameInput.addEventListener('input', createListener(isValidName))
ratingInput.addEventListener('input', createListener(isValidNumber))
