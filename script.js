function validateNumberInput(value) {
    return /^\d*\.?\d*$/.test(value) && value !== '';
}

function showTaxCalculation(income, tax) {
    const resultModal = document.getElementById('resultModal');
    const resultText = document.getElementById('resultText');

    resultText.innerHTML = `Total Taxable Income: ${income} <br> Tax: ${tax}`;

    resultModal.style.display = "block";
    const closeBtn = document.getElementsByClassName("close")[0];
    closeBtn.onclick = function() {
        resultModal.style.display = "none";
    }
}

function calculateTax() {
    const grossIncome = document.getElementById('grossIncome').value;
    const extraIncome = document.getElementById('extraIncome').value;
    const deductions = document.getElementById('deductions').value;
    const ageGroup = document.getElementById('age').value;

    let errorFlag = false;

    document.querySelectorAll('.error-icon').forEach(el => {
        el.style.display = 'none';
    });

    if (!validateNumberInput(grossIncome)) {
        document.querySelector('#grossIncome + .error-icon').style.display = 'inline';
        errorFlag = true;
    }

    if (!validateNumberInput(extraIncome)) {
        document.querySelector('#extraIncome + .error-icon').style.display = 'inline';
        errorFlag = true;
    }

    if (!validateNumberInput(deductions)) {
        document.querySelector('#deductions + .error-icon').style.display = 'inline';
        errorFlag = true;
    }

    if (ageGroup === "") {
        document.querySelector('#age + .error-icon').style.display = 'inline';
        errorFlag = true;
    }

    if (errorFlag) return;

    const totalIncome = parseFloat(grossIncome) + parseFloat(extraIncome) - parseFloat(deductions);
    let taxRate = 0;

    if (totalIncome > 800000) {
        switch (ageGroup) {
            case "<40":
                taxRate = 0.30;
                break;
            case "≥ 40 & < 60":
                taxRate = 0.40;
                break;
            case "≥ 60":
                taxRate = 0.10;
                break;
        }
    }

    const tax = (totalIncome - 800000) * taxRate;
    showTaxCalculation(totalIncome, tax > 0 ? tax.toFixed(2) : 0);
}

window.onclick = function(event) {
    const modal = document.getElementById('resultModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
