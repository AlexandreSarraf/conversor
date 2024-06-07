const units = {
    temperature: ['celsius', 'fahrenheit', 'kelvin'],
    length: ['quilômetro', 'metro', 'centímetro', 'milímetro'],
    weight: ['tonelada', 'quilograma', 'grama', 'miligrama'],
    speed: ['metros por segundo', 'quilômetros por hora']
};

function updateUnits() {
    const conversionType = document.getElementById('conversionType').value;
    const inputUnit = document.getElementById('inputUnit');
    const outputUnit = document.getElementById('outputUnit');

    inputUnit.innerHTML = '';
    outputUnit.innerHTML = '';

    units[conversionType].forEach(unit => {
        const option1 = document.createElement('option');
        option1.value = unit;
        option1.text = unit.charAt(0).toUpperCase() + unit.slice(1);
        inputUnit.add(option1);

        const option2 = document.createElement('option');
        option2.value = unit;
        option2.text = unit.charAt(0).toUpperCase() + unit.slice(1);
        outputUnit.add(option2);
    });
}

function convert() {
    const inputValue = document.getElementById('inputValue').value;
    const errorMessage = document.getElementById('errorMessage');
    const outputValueElement = document.getElementById('outputValue');

    errorMessage.innerText = '';
    outputValueElement.innerText = '';

    if (isNaN(inputValue) || inputValue.trim() === '') {
        errorMessage.innerText = 'Por favor, insira um número válido.';
        return;
    }

    const value = parseFloat(inputValue);
    const conversionType = document.getElementById('conversionType').value;
    const inputUnit = document.getElementById('inputUnit').value;
    const outputUnit = document.getElementById('outputUnit').value;

    let result;

    if (conversionType === 'temperature') {
        result = convertTemperature(value, inputUnit, outputUnit);
    } else if (conversionType === 'length') {
        result = convertLength(value, inputUnit, outputUnit);
    } else if (conversionType === 'weight') {
        result = convertWeight(value, inputUnit, outputUnit);
    } else if (conversionType === 'speed') {
        result = convertSpeed(value, inputUnit, outputUnit);
    }

    outputValueElement.innerText = `Resultado: ${result} ${outputUnit.charAt(0).toUpperCase() + outputUnit.slice(1)}`;
}

function convertTemperature(value, inputUnit, outputUnit) {
    let celsiusValue;

    if (inputUnit === 'celsius') {
        celsiusValue = value;
    } else if (inputUnit === 'fahrenheit') {
        celsiusValue = (value - 32) * 5 / 9;
    } else if (inputUnit === 'kelvin') {
        celsiusValue = value - 273.15;
    }

    if (outputUnit === 'celsius') {
        return celsiusValue.toFixed(2);
    } else if (outputUnit === 'fahrenheit') {
        return ((celsiusValue * 9 / 5) + 32).toFixed(2);
    } else if (outputUnit === 'kelvin') {
        return (celsiusValue + 273.15).toFixed(2);
    }
}

function convertLength(value, inputUnit, outputUnit) {
    let metersValue;

    switch (inputUnit) {
        case 'quilômetro':
            metersValue = value * 1000;
            break;
        case 'metro':
            metersValue = value;
            break;
        case 'centímetro':
            metersValue = value / 100;
            break;
        case 'milímetro':
            metersValue = value / 1000;
            break;
        default:
            metersValue = value;
    }

    switch (outputUnit) {
        case 'quilômetro':
            return (metersValue / 1000).toFixed(2);
        case 'metro':
            return metersValue.toFixed(2);
        case 'centímetro':
            return (metersValue * 100).toFixed(2);
        case 'milímetro':
            return (metersValue * 1000).toFixed(2);
        default:
            return metersValue.toFixed(2);
    }
}

function convertWeight(value, inputUnit, outputUnit) {
    let kilogramsValue;

    switch (inputUnit) {
        case 'tonelada':
            kilogramsValue = value * 1000;
            break;
        case 'quilograma':
            kilogramsValue = value;
            break;
        case 'grama':
            kilogramsValue = value / 1000;
            break;
        case 'miligrama':
            kilogramsValue = value / 1e6;
            break;
        default:
            kilogramsValue = value;
    }

    switch (outputUnit) {
        case 'tonelada':
            return (kilogramsValue / 1000).toFixed(2);
        case 'quilograma':
            return kilogramsValue.toFixed(2);
        case 'grama':
            return (kilogramsValue * 1000).toFixed(2);
        case 'miligrama':
            return (kilogramsValue * 1e6).toFixed(2);
        default:
            return kilogramsValue.toFixed(2);
    }
}

function convertSpeed(value, inputUnit, outputUnit) {
    let metersPerSecondValue;

    if (inputUnit === 'metros por segundo') {
        metersPerSecondValue = value;
    } else if (inputUnit === 'quilômetros por hora') {
        metersPerSecondValue = value / 3.6;
    }

    if (outputUnit === 'metros por segundo') {
        return metersPerSecondValue.toFixed(2);
    } else if (outputUnit === 'quilômetros por hora') {
        return (metersPerSecondValue * 3.6).toFixed(2);
    }
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

document.getElementById('inputValue').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        convert();
    }
});

window.onload = () => {
    loadTheme();
    updateUnits(); // Initialize units on page load
};