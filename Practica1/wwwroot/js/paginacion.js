// PAGINACIÓN

// Constantes
const ITEMS_POR_PAGINA = 10; // Productos por página

// Variables globales
let paginaActual = 1; // Mantiene el estado de la página actual

/* 
 * Actualiza los controles de paginación.
 * 
 * Calcula el número total de páginas basado en los productos filtrados u originales.
 * Muestra u oculta la paginación según sea necesario.
 * Actualiza la información de página (ej. "Página 1 de 5").
 * Habilita/deshabilita los botones de anterior/siguiente según la posición actual.
 * 
 * Depende de:
 * - productosFiltrados (de buscador.js)
 * - productosOriginales (de buscador.js)
 */
function actualizarPaginacion() {
    const paginacion = document.getElementById('paginacion');
    const totalProductos = productosFiltrados.length || productosOriginales.length;
    const totalPaginas = Math.ceil(totalProductos / ITEMS_POR_PAGINA);

    // Ocultar paginación si no hay suficientes items
    if (totalPaginas <= 1) {
        paginacion.style.display = 'none';
        return;
    }

    paginacion.style.display = 'flex';

    // Actualizar información de página
    document.getElementById('info-pagina').textContent =
        `Página ${paginaActual} de ${totalPaginas}`;

    // Habilitar/deshabilitar botones
    document.getElementById('pagina-anterior').disabled = paginaActual === 1;
    document.getElementById('pagina-siguiente').disabled = paginaActual === totalPaginas;
}

/* 
 * Cambia a la página anterior.
 * 
 * Disminuye paginaActual si no está en la primera página.
 * Llama a actualizarTabla() con los productos filtrados u originales.
 * 
 * Depende de:
 * - actualizarTabla() (de tabla.js)
 * - productosFiltrados (de buscador.js)
 * - productosOriginales (de buscador.js)
 */
function paginaAnterior() {
    if (paginaActual > 1) {
        paginaActual--;
        actualizarTabla(productosFiltrados.length ? productosFiltrados : productosOriginales);
    }
}


/* 
 * Cambia a la página siguiente.
 * 
 * Aumenta paginaActual si no está en la última página.
 * Llama a actualizarTabla() con los productos filtrados u originales.
 */
function paginaSiguiente() {
    const totalProductos = productosFiltrados.length || productosOriginales.length;
    const totalPaginas = Math.ceil(totalProductos / ITEMS_POR_PAGINA);

    if (paginaActual < totalPaginas) {
        paginaActual++;
        actualizarTabla(productosFiltrados.length ? productosFiltrados : productosOriginales);
    }
}