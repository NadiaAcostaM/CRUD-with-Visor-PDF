// VALIDACIONES DE FORMULARIOS

// Constantes
const VALIDACIONES = {
    CODIGO_BARRA: {
        regex: /^\d+$/,
        mensaje: 'Solo se permiten números enteros positivos'
    },
    PRECIO: {
        regex: /^\d+(\.\d{0,2})?$/,
        mensaje: 'Solo números positivos con máximo 2 decimales'
    }
};

/* 
 * Configura las validaciones en tiempo real para los campos del formulario.
 * 
 * Aplica a:
 * - codigoBarra: Solo números enteros positivos
 * - precio: Números positivos con hasta 2 decimales
 * 
 * Crea elementos para mostrar mensajes de error debajo de cada campo.
 * Bloquea el ingreso de signos negativos.
 * Cambia el color del borde del campo según sea válido o no.
 */
function configurarValidaciones() {
    const codigoBarraInput = document.getElementById('codigoBarra');
    const precioInput = document.getElementById('precio');

    // Crear elementos para mensajes de error
    const codigoError = document.createElement('small');
    codigoError.className = 'mensaje-error';
    codigoError.style.display = 'none';
    codigoError.style.color = 'red';
    codigoBarraInput.parentNode.appendChild(codigoError);

    const precioError = document.createElement('small');
    precioError.className = 'mensaje-error';
    precioError.style.display = 'none';
    precioError.style.color = 'red';
    precioInput.parentNode.appendChild(precioError);

    // Validación en tiempo real para código de barra
    codigoBarraInput.addEventListener('input', function () {
        const valor = this.value;

        // Bloquear el signo negativo
        if (valor.includes('-')) {
            this.value = valor.replace(/-/g, '');
        }

        if (!VALIDACIONES.CODIGO_BARRA.regex.test(valor)) {
            codigoError.textContent = VALIDACIONES.CODIGO_BARRA.mensaje;
            codigoError.style.display = 'block';
            this.style.borderColor = 'red';
        } else {
            codigoError.style.display = 'none';
            this.style.borderColor = '#ddd';
        }
    });

    // Validación en tiempo real para precio
    precioInput.addEventListener('input', function () {
        const valor = this.value;

        // Bloquear el signo negativo
        if (valor.includes('-')) {
            this.value = valor.replace(/-/g, '');
        }

        if (!VALIDACIONES.PRECIO.regex.test(valor)) {
            precioError.textContent = VALIDACIONES.PRECIO.mensaje;
            precioError.style.display = 'block';
            this.style.borderColor = 'red';
        } else {
            precioError.style.display = 'none';
            this.style.borderColor = '#ddd';
        }
    });
}