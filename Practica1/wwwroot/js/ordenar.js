/**
 * ESTADOS DE ORDENACIÓN
 * - ORIGINAL: Orden inicial por ID (sin ordenación aplicada)
 * - ASCENDENTE: Orden alfabético A-Z
 * - DESCENDENTE: Orden alfabético Z-A
 */
const ESTADO_ORDEN = {
    ORIGINAL: 0,
    ASCENDENTE: 1,
    DESCENDENTE: 2
};

/* Estado actual de ordenación (inicia en ORIGINAL) */
let estadoOrden = ESTADO_ORDEN.ORIGINAL;

/* Copia del orden original de productos */
let productosOriginalesOrdenados = [];

/**
 * Función principal de ordenación - Cicla entre los 3 estados
 * Depende de:
 * - productosFiltrados (buscador.js)
 * - productosOriginales (buscador.js)
 * - actualizarTabla() (tabla.js)
 * - actualizarPaginacion() (paginacion.js)
 */
function ordenarProductos() {
    // Selecciona qué lista ordenar (filtrada u original)
    const productosAOrdenar = productosFiltrados.length ? productosFiltrados : productosOriginales;

    // Preserva orden original (solo en primera ejecución)
    if (productosOriginalesOrdenados.length === 0 && productosOriginales.length > 0) {
        productosOriginalesOrdenados = [...productosOriginales]; // Copia superficial
    }

    // Cambia al siguiente estado (cíclico 0→1→2→0...)
    estadoOrden = (estadoOrden + 1) % 3;

    // Ordena según el estado actual
    let productosOrdenados;
    switch (estadoOrden) {
        case ESTADO_ORDEN.ORIGINAL:
            productosOrdenados = productosFiltrados.length
                ? [...productosOriginalesOrdenados].filter(p =>
                    productosFiltrados.some(fp => fp.idProducto === p.idProducto))
                : [...productosOriginalesOrdenados];
            break;

        case ESTADO_ORDEN.ASCENDENTE:
            productosOrdenados = [...productosAOrdenar].sort((a, b) =>
                a.nombre.localeCompare(b.nombre));
            break;

        case ESTADO_ORDEN.DESCENDENTE:
            productosOrdenados = [...productosAOrdenar].sort((a, b) =>
                b.nombre.localeCompare(a.nombre));
            break;
    }

    // Actualiza la lista correspondiente
    if (productosFiltrados.length) {
        productosFiltrados = productosOrdenados;
    } else {
        productosOriginales = productosOrdenados;
    }

    // Actualiza la interfaz
    actualizarInterfazOrden();
    paginaActual = 1;
    actualizarTabla(productosOrdenados); // <- De tabla.js
    actualizarPaginacion(); // <- De paginacion.js
}

/* Actualiza los elementos visuales del sistema de ordenación */
function actualizarInterfazOrden() {
    const icono = document.getElementById('icono-orden');
    const texto = document.getElementById('texto-orden');
    const indicador = document.getElementById('indicador-orden');
    const btnOrdenar = document.querySelector('.btn-ordenar');

    // Limpia clases de estado previo
    btnOrdenar.classList.remove('active-asc', 'active-desc');

    // Actualiza según estado actual
    switch (estadoOrden) {
        case ESTADO_ORDEN.ORIGINAL:
            texto.textContent = 'Ordenar';
            indicador.textContent = 'ID'; // Indica orden original
            break;

        case ESTADO_ORDEN.ASCENDENTE:
            texto.textContent = 'Ordenar';
            indicador.textContent = 'A-Z';
            btnOrdenar.classList.add('active-asc'); // Estilo específico
            break;

        case ESTADO_ORDEN.DESCENDENTE:
            texto.textContent = 'Ordenar';
            indicador.textContent = 'Z-A';
            btnOrdenar.classList.add('active-desc'); // Estilo específico
            break;
    }
}