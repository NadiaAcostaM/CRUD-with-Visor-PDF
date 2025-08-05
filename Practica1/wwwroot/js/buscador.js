// VARIABLES GLOBALES
let productosFiltrados = [];
let productosOriginales = []; // Almacena los productos para el filtrado

// BUSCADOR
/* 
 * Configura el buscador para filtrar productos por nombre.
 * 
 * Funcionamiento:
 * 1. Escucha el evento input en el campo de búsqueda
 * 2. Si no hay término de búsqueda, muestra todos los productos
 * 3. Filtra los productos por nombre (case insensitive)
 * 4. Si no hay coincidencias, muestra un mensaje
 * 5. Llama a actualizarTabla() con los productos filtrados
 * 6. Reinicia la paginación a la primera página
 * 
 * Depende de:
 * - actualizarTabla() (de tabla.js)
 * - actualizarPaginacion() (de paginacion.js)
 */
function buscador() {
    // Evento para el buscador
    document.getElementById('buscador').addEventListener('input', function (e) {
        const terminoBusqueda = e.target.value.toLowerCase();
        const tablaProductos = document.getElementById('tablaProductos');

        // Si no hay elementos para buscar muestra todo
        if (terminoBusqueda === '') {
            productosFiltrados = productosOriginales;
            actualizarTabla(productosOriginales);
        } else {
            // Muestra las coincidencias
            productosFiltrados = productosOriginales.filter(producto =>
                producto.nombre.toLowerCase().includes(terminoBusqueda)
            );

            // Si no hay coincidencias
            if (productosFiltrados.length === 0) {
                tablaProductos.innerHTML = `
                    <tr class="no-results">
                        <td colspan="7" class="text-center">
                            No se encontraron productos que coincidan
                        </td>
                    </tr>
                `;
                document.getElementById('paginacion').style.display = 'none';
            } else {
                actualizarTabla(productosFiltrados);
                document.getElementById('paginacion').style.display = 'flex';
            }
        }
        paginaActual = 1;
        actualizarPaginacion();
    });
}