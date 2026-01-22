document.addEventListener('DOMContentLoaded', function() {
    const donationButtons = document.querySelectorAll('.donation-button');
    const customAmountInput = document.getElementById('valor-doacao');
    const selectedAmountInput = document.getElementById('selected-amount');
    const form = document.getElementById('donation-form');
    const creditCardInputs = document.querySelectorAll('.credit-card-info input');
    const numeroCartaoInput = document.getElementById('numero-cartao');
    const nomeCartaoInput = document.getElementById('nome-cartao');
    const validadeCartaoInput = document.getElementById('validade-cartao');
    const cvvInput = document.getElementById('cvv');

    function clearButtonSelections() {
        donationButtons.forEach(button => {
            button.classList.remove('selected');
        });
    }

    donationButtons.forEach(button => {
        button.addEventListener('click', function() {
            clearButtonSelections();
            this.classList.add('selected');
            const amount = this.getAttribute('data-amount');
            selectedAmountInput.value = amount;
            customAmountInput.value = 'R$ ' + amount;
        });
    });

    customAmountInput.addEventListener('input', function() {
        clearButtonSelections();
        selectedAmountInput.value = this.value.replace('R$ ', '');
    });

    nomeCartaoInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '').substring(0, 20);
    });

    cvvInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
    });

    function isValidCardNumber(number) {
        const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
        const mastercardRegex = /^5[1-5][0-9]{14}$/;
        const amexRegex = /^3[47][0-9]{13}$/;
        const eloRegex = /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/;

        return visaRegex.test(number) || mastercardRegex.test(number) || amexRegex.test(number) || eloRegex.test(number);
    }

    function setCardInputError(isError, input) {
        if (isError) {
            input.classList.add('input-error');
        } else {
            input.classList.remove('input-error');
        }
    }

    numeroCartaoInput.addEventListener('input', function(e) {
        const inputNumber = e.target.value.replace(/\D/g, '').substring(0, 16);
        e.target.value = inputNumber;
        setCardInputError(inputNumber && !isValidCardNumber(inputNumber), numeroCartaoInput);
    });

    validadeCartaoInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;

        const month = parseInt(value.substring(0, 2), 10);
        const year = parseInt('20' + value.substring(3), 10);
        const isDateInvalid = (year < 2025 || year > 2038) || (year === 2025 && month < 12);
        setCardInputError(isDateInvalid, validadeCartaoInput);
    });

    form.addEventListener('submit', function(event) {
        let isCreditCardValid = true;
        creditCardInputs.forEach(input => {
            if (!input.value.trim()) isCreditCardValid = false;
        });

        if (isCreditCardValid) {
            showSuccessEmoji();
        } else {
            alert('Por favor, preencha todos os campos do cartão de crédito.');
            event.preventDefault();
        }
    });
});

function showSuccessEmoji() {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';  
    overlay.style.height = '100vh'; 
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; 
    overlay.style.zIndex = '10000'; 

    const successMessage = document.createElement('div');
    successMessage.innerHTML = 'Processando!';
    successMessage.style.color = 'white';
    successMessage.style.fontSize = '24px';
    successMessage.style.fontWeight = 'bold';
    successMessage.style.textAlign = 'center';
    successMessage.style.padding = '20px';
    successMessage.style.borderRadius = '10px';
    successMessage.style.backgroundColor = '#F59E0B'; 
    successMessage.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';

    overlay.appendChild(successMessage);
    document.body.appendChild(overlay);

    setTimeout(function() {
        overlay.remove();
    }, 5000);
}