// Estados de ordenación
const ESTADO_ORDEN = {
    ORIGINAL: 0,     // Orden por ID (original)
    ASCENDENTE: 1,    // A-Z
    DESCENDENTE: 2    // Z-A
};

let estadoOrden = ESTADO_ORDEN.ORIGINAL;
let productosOriginalesOrdenados = []; // Copia del orden original

function ordenarProductos() {
    // Determinar qué lista de productos usar (filtrados u originales)
    const productosAOrdenar = productosFiltrados.length ? productosFiltrados : productosOriginales;

    // Si es la primera vez que se ordena, guardamos el orden original
    if (productosOriginalesOrdenados.length === 0 && productosOriginales.length > 0) {
        productosOriginalesOrdenados = [...productosOriginales];
    }

    // Cambiar al siguiente estado
    estadoOrden = (estadoOrden + 1) % 3;

    // Ordenar según el estado actual
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

    // Actualizar la lista correspondiente
    if (productosFiltrados.length) {
        productosFiltrados = productosOrdenados;
    } else {
        productosOriginales = productosOrdenados;
    }

    // Actualizar la interfaz
    actualizarInterfazOrden();
    paginaActual = 1;
    actualizarTabla(productosOrdenados);
    actualizarPaginacion();
}

function actualizarInterfazOrden() {
    const icono = document.getElementById('icono-orden');
    const texto = document.getElementById('texto-orden');
    const indicador = document.getElementById('indicador-orden');
    const btnOrdenar = document.querySelector('.btn-ordenar');

    // Resetear clases
    btnOrdenar.classList.remove('active-asc', 'active-desc');

    switch (estadoOrden) {
        case ESTADO_ORDEN.ORIGINAL:
            texto.textContent = 'Ordenar';
            indicador.textContent = 'ID';
            break;

        case ESTADO_ORDEN.ASCENDENTE:
            texto.textContent = 'Ordenar';
            indicador.textContent = 'A-Z';
            btnOrdenar.classList.add('active-asc');
            break;

        case ESTADO_ORDEN.DESCENDENTE:
            texto.textContent = 'Ordenar';
            indicador.textContent = 'Z-A';
            btnOrdenar.classList.add('active-desc');
            break;
    }
}