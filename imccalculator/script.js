document.getElementById('form').addEventListener('submit', function(event){
    event.preventDefault();

    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    if (isNaN(weight) || isNaN(height) || height <= 0) {
        alert('Por favor, insira valores válidos.');
        return;
    }

    const bmi = (weight / (height * height)).toFixed(2);

    const resultWrapper = document.querySelector("[results]");
    let description = '';

    if (bmi < 18.5) {
        description = 'Cuidado, você está abaixo do peso!';
    } else if (bmi >= 18.5 && bmi <= 25) {
        description = 'Você está no peso ideal';
    } else if (bmi > 25 && bmi <= 30) {
        description = 'Cuidado, você está com sobrepeso';
    } else if (bmi > 30 && bmi <= 35) {
        description = 'Cuidado, você está com obesidade I';
    } else if (bmi > 35 && bmi <= 40) {
        description = 'Cuidado, você está com obesidade II';
    } else {
        description = 'Cuidado, você está com obesidade III';
    }

    const html = `
        <div id="result">
            <div id="bmi">
                <span id="value">${bmi}</span>
                <span>Seu IMC</span>
            </div>
            <div id="description">
                <span>${description}</span>
            </div>
        </div>
    `;

    resultWrapper.innerHTML = html;
    resultWrapper.classList.remove('hidden');
});
