const units = {
    temperature: ['celsius', 'fahrenheit', 'kelvin'],
    length: ['metros', 'quilômetros', 'milhas'],
    weight: ['quilogramas', 'gramas', 'libras']
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

    if (inputUnit === 'metros') {
        metersValue = value;
    } else if (inputUnit === 'quilômetros') {
        metersValue = value * 1000;
    } else if (inputUnit === 'milhas') {
        metersValue = value * 1609.34;
    }

    if (outputUnit === 'metros') {
        return metersValue.toFixed(2);
    } else if (outputUnit === 'quilômetros') {
        return (metersValue / 1000).toFixed(2);
    } else if (outputUnit === 'milhas') {
        return (metersValue / 1609.34).toFixed(2);
    }
}

function convertWeight(value, inputUnit, outputUnit) {
    let kilogramsValue;

    if (inputUnit === 'quilogramas') {
        kilogramsValue = value;
    } else if (inputUnit === 'gramas') {
        kilogramsValue = value / 1000;
    } else if (inputUnit === 'libras') {
        kilogramsValue = value / 2.20462;
    }

    if (outputUnit === 'quilogramas') {
        return kilogramsValue.toFixed(2);
    } else if (outputUnit === 'gramas') {
        return (kilogramsValue * 1000).toFixed(2);
    } else if (outputUnit === 'libras') {
        return (kilogramsValue * 2.20462).toFixed(2);
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
