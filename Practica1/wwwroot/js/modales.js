// FUNCIONES DE MODALES

/* Muestra los detalles del producto en el modal */
function mostrarDetalleProducto(producto) {
    const modal = document.getElementById('modalDetalleProducto');
    const contenido = document.getElementById('detalle-contenido');

    contenido.innerHTML = `
        <form class="detalle-formulario">
            <div class="form-group">
                <label for="detalle-codigo">Código de barra</label>
                <input type="text" id="detalle-codigo" value="${producto.codigoBarra}" disabled>
            </div>
            <div class="form-group">
                <label for="detalle-nombre">Nombre</label>
                <input type="text" id="detalle-nombre" value="${producto.nombre}" disabled>
            </div>
            <div class="form-group">
                <label for="detalle-marca">Marca</label>
                <input type="text" id="detalle-marca" value="${producto.marca}" disabled>
            </div>
            <div class="form-group">
                <label for="detalle-categoria">Categoría</label>
                <input type="text" id="detalle-categoria" value="${producto.categoria}" disabled>
            </div>
            <div class="form-group">
                <label for="detalle-precio">Precio</label>
                <input type="text" id="detalle-precio" value="$${producto.precio.toFixed(2)}" disabled>
            </div>
        </form>
    `;

    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('mostrar'), 10);
}

/* Abre el formulario para agregar un nuevo producto */
/*
 * Resetea el formulario y establece idProducto a 0 (indicando nuevo producto).
 */
function abrirFormulario() {
    document.getElementById('formProducto').reset();
    document.getElementById('idProducto').value = 0;

    const titulo = document.getElementById('modal-title');
    titulo.innerHTML = 'Agregar Producto';

    const modal = document.getElementById('modalProducto');
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('mostrar'), 10);
}

/* Abre el modal para editar un producto existente */
function abrirModalEditar(producto) {
    document.getElementById('idProducto').value = producto.idProducto;
    document.getElementById('codigoBarra').value = producto.codigoBarra;
    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('marca').value = producto.marca;
    document.getElementById('categoria').value = producto.categoria;
    document.getElementById('precio').value = producto.precio;

    const titulo = document.getElementById('modal-title');
    titulo.innerHTML = 'Editar Producto';

    const modal = document.getElementById('modalProducto');
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('mostrar'), 10);
}

/* Abre un modal para visualizar el PDF */
function abrirModal(titulo, urlPDF) {
    const modal = document.getElementById("modalPdf");
    const visorPdf = document.getElementById("visor-pdf");
    const pdfError = document.getElementById("pdf-error");
    const tituloModal = document.getElementById("titulo-modal");

    tituloModal.textContent = titulo;

    pdfError.style.display = "none";
    visorPdf.style.display = "block";
    modal.style.display = "block";

    setTimeout(() => modal.classList.add("mostrar"), 10);

    fetch(urlPDF, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                visorPdf.src = urlPDF;
            } else {
                throw new Error('PDF no encontrado');
            }
        })
        .catch(error => {
            visorPdf.style.display = "none";
            pdfError.style.display = "block";
        });
}

/* Cierra el modal de producto */
function cerrarModalProducto() {
    const modal = document.getElementById('modalProducto');
    modal.classList.remove('mostrar');
    setTimeout(() => modal.style.display = 'none', 300);
}

/* Cierra el modal de detalle */
function cerrarModalDetalle() {
    const modal = document.getElementById('modalDetalleProducto');
    modal.classList.remove('mostrar');
    setTimeout(() => modal.style.display = 'none', 300);
}

/* Cierra el modal de PDF */
function cerrarModalPdf() {
    const modal = document.getElementById("modalPdf");
    const visorPdf = document.getElementById("visor-pdf");
    const pdfError = document.getElementById("pdf-error");

    modal.classList.remove("mostrar");

    setTimeout(() => {
        modal.style.display = "none";
        visorPdf.src = "";
        visorPdf.style.display = "block";
        pdfError.style.display = "none";
    }, 300);
}

// EVENTOS GLOBALES

/* Cierra los modales al hacer click afuera */
/*
 * Detecta qué modal está abierto y llama a la función de cierre correspondiente.
 */

window.onclick = function (event) {
    const modals = ['modalProducto', 'modalDetalleProducto', 'modalPdf'];

    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (event.target === modal) {
            if (modalId === 'modalProducto') cerrarModalProducto();
            else if (modalId === 'modalDetalleProducto') cerrarModalDetalle();
            else if (modalId === 'modalPdf') cerrarModalPdf();
        }
    });
}