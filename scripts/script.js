function convertTemperature() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    
    //Recebe o valor de entrada
    const inputUnit = document.getElementById('inputUnit').value;

    //Recebe o valor de saída
    const outputUnit = document.getElementById('outputUnit').value;

    let celsiusValue;

    // Convertendo para Celsius
    if (inputUnit === 'celsius') {
        celsiusValue = inputValue;
    } else if (inputUnit === 'fahrenheit') {
        celsiusValue = (inputValue - 32) * 5 / 9;
    } else if (inputUnit === 'kelvin') {
        celsiusValue = inputValue - 273.15;
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

    //Formata e apresenta o resultado
    document.getElementById('outputValue').innerText = `Resultado: ${outputValue.toFixed(2)} ${outputUnit.charAt(0).toUpperCase() + outputUnit.slice(1)}`;
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

/* Carrega a preferência de modo noturno do usuário, verifica, salva e aplica o tema ao carregar a página.*/
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

// Chama a função para carregar o tema ao carregar a página
window.onload = loadTheme;