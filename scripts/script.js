function convertTemperature() {
    const inputValue = document.getElementById('inputValue').value;
    const errorMessage = document.getElementById('errorMessage');
    const outputValueElement = document.getElementById('outputValue');

    // Limpa as mensagens de erro anteriores
    errorMessage.innerText = '';
    outputValueElement.innerText = '';

    // Validação de entrada
    if (isNaN(inputValue) || inputValue.trim() === '') {
        errorMessage.innerText = 'Por favor, insira um número válido.';
        return;
    }

    const value = parseFloat(inputValue);
    const inputUnit = document.getElementById('inputUnit').value;
    const outputUnit = document.getElementById('outputUnit').value;

    let celsiusValue;

    // Convertendo para Celsius
    if (inputUnit === 'celsius') {
        celsiusValue = value;
    } else if (inputUnit === 'fahrenheit') {
        celsiusValue = (value - 32) * 5 / 9;
    } else if (inputUnit === 'kelvin') {
        celsiusValue = value - 273.15;
    }

    let outputValue;

    // Convertendo de Celsius para a unidade desejada
    if (outputUnit === 'celsius') {
        outputValue = celsiusValue;
    } else if (outputUnit === 'fahrenheit') {
        outputValue = (celsiusValue * 9 / 5) + 32;
    } else if (outputUnit === 'kelvin') {
        outputValue = celsiusValue + 273.15;
    }

    outputValueElement.innerText = `Resultado: ${outputValue.toFixed(2)} ${outputUnit.charAt(0).toUpperCase() + outputUnit.slice(1)}`;
}

function toggleMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    const logo = document.getElementById('logo');
    if (body.classList.contains('dark-mode')) {
        logo.src = 'imagens/logodark.jpg';
        localStorage.setItem('theme', 'dark');
    } else {
        logo.src = 'imagens/logo.jpg';
        localStorage.setItem('theme', 'light');
    }
}

// Carrega a preferência de modo noturno do usuário
function loadTheme() {
    const theme = localStorage.getItem('theme');
    const body = document.body;
    const logo = document.getElementById('logo');
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        logo.src = 'imagens/logodark.jpg';
    } else {
        body.classList.remove('dark-mode');
        logo.src = 'imagens/logo.jpg';
    }
}

// Adiciona um ouvinte de eventos para detectar a tecla Enter
document.getElementById('inputValue').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        convertTemperature();
    }
});

// Chama a função para carregar o tema ao carregar a página
window.onload = loadTheme;
