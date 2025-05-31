let pantalla = document.getElementById('pantalla');
let expresionCompleta = '';
let ultimoElemento = '';
let esperandoOperando = false;

function agregarNumero(numero) {
    if (esperandoOperando) {
        pantalla.value = numero;
        esperandoOperando = false;
    } else {
        if (pantalla.value === '0' && numero !== '.') {
            pantalla.value = numero;
        } else {
            pantalla.value += numero;
        }
    }
    expresionCompleta += numero;
    ultimoElemento = 'numero';
}

function agregarOperacion(operador) {
    if (pantalla.value === '' && expresionCompleta === '') return;
    
    if (ultimoElemento === 'operador') {
        expresionCompleta = expresionCompleta.slice(0, -1) + operador;
        pantalla.value = expresionCompleta;
        return;
    }
    
    expresionCompleta += operador;
    pantalla.value = expresionCompleta;
    ultimoElemento = 'operador';
}

function calcular() {
    if (expresionCompleta === '') return;
    
    try {
        let expresionParaCalcular = expresionCompleta.replace(/×/g, '*');
        
        if (expresionParaCalcular.includes('/0')) {
            alert('Error: División por cero');
            return;
        }
        
        let resultado = eval(expresionParaCalcular);
       
        pantalla.value = resultado;
        expresionCompleta = resultado.toString();
        ultimoElemento = 'resultado';
        esperandoOperando = true;
        
    } catch (error) {
        pantalla.value = 'Error';
        expresionCompleta = '';
        ultimoElemento = '';
    }
}

function limpiar() {
    pantalla.value = '';
    expresionCompleta = '';
    ultimoElemento = '';
    esperandoOperando = false;
}

function borrarUltimo() {
    if (pantalla.value.length > 0) {
        pantalla.value = pantalla.value.slice(0, -1);
        expresionCompleta = expresionCompleta.slice(0, -1);
       
        if (expresionCompleta === '') {
            ultimoElemento = '';
        } else {
            let ultimoChar = expresionCompleta[expresionCompleta.length - 1];
            if (['+', '-', '*', '×', '/'].includes(ultimoChar)) {
                ultimoElemento = 'operador';
            } else {
                ultimoElemento = 'numero';
            }
        }
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        agregarNumero(event.key);
    } else if (event.key === '.') {
        agregarNumero('.');
    } else if (event.key === '+') {
        agregarOperacion('+');
    } else if (event.key === '-') {
        agregarOperacion('-');
    } else if (event.key === '*') {
        agregarOperacion('*');
    } else if (event.key === '/') {
        event.preventDefault();
        agregarOperacion('/');
    } else if (event.key === 'Enter' || event.key === '=') {
        calcular();
    } else if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') {
        limpiar();
    } else if (event.key === 'Backspace') {
        borrarUltimo();
    }
});

function calcular() {
    try {
        let expresionParaCalcular = expresionCompleta.replace(/×/g, '*');
        
        if (expresionParaCalcular.includes('/0')) {
            alert('Error: División por cero');
            return;
        }
        
        let resultado = eval(expresionParaCalcular);
        pantalla.value = resultado;
        expresionCompleta = resultado.toString();
        esperandoOperando = true;
    } catch (error) {
        pantalla.value = 'Error';
    }
}