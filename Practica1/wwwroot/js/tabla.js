// TABLA CON EL LISTADO DE PRODUCTOS

/* 
 * Evento que se dispara al redimensionar la ventana.
 * Actualiza la tabla para cambiar entre vista móvil (dropdown) y escritorio (botones separados).
 */
window.addEventListener('resize', function () {
    actualizarTabla(productosFiltrados.length ? productosFiltrados : productosOriginales);
});

// FUNCIONES DE INTERFAZ

/* 
 * Actualiza la tabla con la lista de productos paginada.
 * 
 * Funcionamiento:
 * 1. Calcula el rango de productos a mostrar basado en paginaActual e ITEMS_POR_PAGINA
 * 2. Si la página actual está vacía y no es la primera, retrocede una página
 * 3. Para cada producto:
 *    - Crea una fila con ID, Nombre y Acciones
 *    - En móvil (<=768px) muestra un dropdown con las acciones
 *    - En escritorio muestra botones individuales para cada acción
 * 
 * Depende de:
 * - paginaActual (de paginacion.js)
 * - ITEMS_POR_PAGINA (de paginacion.js)
 * - mostrarDetalleProducto() (de modales.js)
 * - abrirModalEditar() (de modales.js)
 * - eliminarProducto() (de crud.js)
 * - abrirModal() (de modales.js)
 * - actualizarPaginacion() (de paginacion.js)
 */
function actualizarTabla(productos) {
    const tabla = document.getElementById('tablaProductos');
    tabla.innerHTML = '';

    const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
    const fin = inicio + ITEMS_POR_PAGINA;
    const productosPagina = productos.slice(inicio, fin);

    if (productosPagina.length === 0 && paginaActual > 1) {
        paginaActual--;
        actualizarTabla(productos);
        return;
    }

    productosPagina.forEach(producto => {
        const fila = document.createElement('tr');

        const celdaID = document.createElement('td');
        celdaID.textContent = producto.idProducto;

        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = producto.nombre;

        const celdaAcciones = document.createElement('td');

        // Creamos el contenedor del dropdown solo para móviles
        const esMovil = window.innerWidth <= 768;

        if (esMovil) {
            // Dropdown para móviles
            const dropdownContainer = document.createElement('div');
            dropdownContainer.className = 'acciones-dropdown';

            // Botón principal del dropdown (tres puntos)
            const dropdownBtn = document.createElement('button');
            dropdownBtn.className = 'dropdown-btn';
            dropdownBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
            `;

            // Contenido del dropdown
            const dropdownContent = document.createElement('div');
            dropdownContent.className = 'dropdown-content';

            // Botones dentro del dropdown
            const btnVer = crearBotonAccion('Detalles', producto, mostrarDetalleProducto);
            const btnEditar = crearBotonAccion('Editar', producto, abrirModalEditar);
            const btnEliminar = crearBotonAccion('Eliminar', producto, () => eliminarProducto(producto.idProducto));
            const btnPdf = crearBotonAccion('Ver PDF', producto, () => abrirModal('Documento PDF', '/pdfs/manual.pdf'));

            dropdownContent.appendChild(btnVer);
            dropdownContent.appendChild(btnEditar);
            dropdownContent.appendChild(btnEliminar);
            dropdownContent.appendChild(btnPdf);

            dropdownContainer.appendChild(dropdownBtn);
            dropdownContainer.appendChild(dropdownContent);
            celdaAcciones.appendChild(dropdownContainer);

            // Centrar el dropdown en la celda
            celdaAcciones.style.textAlign = 'center';

            // Evento para mostrar/ocultar el dropdown
            dropdownBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                dropdownContainer.classList.toggle('show');
            });

            // Cerrar dropdown al hacer click fuera
            document.addEventListener('click', function () {
                dropdownContainer.classList.remove('show');
            });
        } else {
            /* Versión normal para escritorio */

            // Botón Ver Detalles
            const btnVer = document.createElement('button');
            btnVer.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
            </svg>
        `;
            btnVer.onclick = () => mostrarDetalleProducto(producto);

            // Botón Editar
            const btnEditar = document.createElement('button');
            btnEditar.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
            </svg>
        `;
            btnEditar.onclick = () => abrirModalEditar(producto);

            // Botón Eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
        `;
            btnEliminar.onclick = () => eliminarProducto(producto.idProducto);

            // Botón PDF
            const btnPdf = document.createElement('button');
            btnPdf.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-pdf" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.183.185.522m1.217-1.333v3.999h1.46q.602 0 .998-.237a1.45 1.45 0 0 0 .595-.689q.196-.45.196-1.084 0-.63-.196-1.075a1.43 1.43 0 0 0-.589-.68q-.396-.234-1.005-.234zm.791.645h.563q.371 0 .609.152a.9.9 0 0 1 .354.454q.118.302.118.753a2.3 2.3 0 0 1-.068.592 1.1 1.1 0 0 1-.196.422.8.8 0 0 1-.334.252 1.3 1.3 0 0 1-.483.082h-.563zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638z"/>
            </svg>
        `;
            btnPdf.onclick = () => abrirModal('Documento PDF', '/pdfs/manual.pdf');

            celdaAcciones.appendChild(btnVer);
            celdaAcciones.appendChild(btnEditar);
            celdaAcciones.appendChild(btnEliminar);
            celdaAcciones.appendChild(btnPdf);
        }

        fila.appendChild(celdaID);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaAcciones);

        tabla.appendChild(fila);
    });

    actualizarPaginacion();
}

/* Función auxiliar para crear botones de acción del dropdown */
function crearBotonAccion(texto, producto, onClickHandler) {
    const button = document.createElement('button');
    button.textContent = texto;
    button.style.color = 'white';
    button.onclick = function (e) {
        e.stopPropagation();
        onClickHandler(producto);
        // Cerrar el dropdown después de hacer clic
        const dropdown = this.closest('.acciones-dropdown');
        if (dropdown) dropdown.classList.remove('show');
    };
    return button;
}
