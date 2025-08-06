// EVENTOS PRINCIPALES

/* 
 * Configura los eventos iniciales al cargar el DOM.
 * 
 * Ejecuta:
 * 1. cargarProductos() - Carga la lista inicial de productos
 * 2. setupEventListeners() - Configura eventos del formulario
 * 3. buscador() - Configura el buscador
 * 4. configurarValidaciones() - Configura validaciones de formulario
 * 
 * Depende de:
 * - cargarProductos() (de crud.js)
 * - setupEventListeners() (de crud.js)
 * - buscador() (de buscador.js)
 * - configurarValidaciones() (de validaciones.js)
 * - actualizarInterfazOrden() (de ordenar.js)
 */

document.addEventListener('DOMContentLoaded', function () {
    cargarProductos();
    setupEventListeners();
    buscador();
    configurarValidaciones();
    actualizarInterfazOrden();
});