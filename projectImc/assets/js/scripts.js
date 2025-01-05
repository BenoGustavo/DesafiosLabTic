function validateInput(input) {
    const regex = /^[0-9.,]+$/;
    return regex.test(input);
}

function transformCommaToDot(input) {
    return input.replace(',', '.');
}

function validateForm() {
    const weightInput = document.getElementById("weight").value;
    const heightInput = document.getElementById("height").value;

    if (!validateInput(weightInput) || !validateInput(heightInput)) {
        return false;
    }
    return true;
}

function showErrorMessage() {
    const weightInput = document.getElementById("weight").value;
    const heightInput = document.getElementById("height").value;
    const errorMessage = document.querySelector('.error-message');

    if (!validateInput(weightInput) || !validateInput(heightInput)) {
        errorMessage.classList.remove('display-none');
        errorMessage.classList.add('visible');
    }
}

function hideErrorMessage() {
    const errorMessage = document.querySelector('.error-message');
    errorMessage.classList.remove('visible');
    errorMessage.classList.add('display-none');
}

function calculateIMC() {
    const weightInput = transformCommaToDot(document.getElementById("weight").value);
    const heightInput = transformCommaToDot(document.getElementById("height").value);

    const imc = weightInput / (heightInput * heightInput);

    const imcResult = document.querySelector('#imc-result');
    imcResult.innerHTML = "Seu IMC é de " + imc.toFixed(2);
}

function showResult() {
    calculateIMC();
    showModal();
}

function showModal() {
    const modal = document.querySelector('.modal-container');
    modal.classList.remove('display-none');
    modal.classList.add('visible');
}

function hideModal() {
    const modal = document.querySelector('.modal-container');
    modal.classList.remove('visible');
    modal.classList.add('display-none');
}

function handleInputChange(event) {
    const input = event.target.value;
    if (!validateInput(input)) {
        event.target.value = input.slice(0, -1);
    }
}

let weightInput = document.getElementById("weight");
let heightInput = document.getElementById("height");
weightInput.addEventListener('input', handleInputChange);
heightInput.addEventListener('input', handleInputChange);

weightInput.addEventListener('focus', () => {
    hideErrorMessage();
});
heightInput.addEventListener('focus', () => {
    hideErrorMessage();
});

let resultButton = document.getElementById("result-button");
resultButton.addEventListener('click', (event) => {
    event.preventDefault();
    validateForm() ? showResult() : showErrorMessage();
});

let closeModalButton = document.getElementById("close-modal-btn");
closeModalButton.addEventListener('click', () => {
    hideModal();
});