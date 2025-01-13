function nextStep(step, direction) {
    const currentStep = document.querySelector('.container:not(.dp-none)');
    const nextStep = document.querySelectorAll('.container')[step];

    if (currentStep) {
        if (direction === 'forward') {
            const inputs = currentStep.querySelectorAll('input, textarea');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    isValid = false;
                    input.reportValidity();
                }
            });

            if (!isValid) {
                return;
            }
        }

        saveFormData();
        currentStep.classList.add('dp-none');
        if (nextStep) {
            nextStep.classList.remove('dp-none');
            loadFormData();
        }
    }
}

function saveFormData() {
    const formData = new FormData(document.querySelector('form'));
    const formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    localStorage.setItem('formData', JSON.stringify(formObject));
}

function loadFormData() {
    const formObject = JSON.parse(localStorage.getItem('formData'));

    if (formObject) {
        Object.keys(formObject).forEach(key => {
            const input = document.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = formObject[key];
            }
        });
    }
}

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    saveFormData();
    console.log('Form Data:', JSON.parse(localStorage.getItem('formData')));

    alert('Formulario loggado no console!');
});