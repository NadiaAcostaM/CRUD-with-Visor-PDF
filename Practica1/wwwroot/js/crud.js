// FUNCIONES CRUD (Create, Read, Update, Delete)

// Constante
const API_URL = "http://basesqlapi.somee.com/api/Producto"; // URL base de la API para manejar productos

/* Configura los event listeners principales */
function setupEventListeners() {
    // Evento para el formulario de producto
    document.getElementById('formProducto').addEventListener('submit', function (e) {
        e.preventDefault();
        guardarProducto();
    });
}

/* 
 * Carga la lista de productos desde la API.
 * 
 * Funcionamiento:
 * 1. Hace una petición GET a la API
 * 2. Almacena los productos en productosOriginales
 * 3. Limpia productosFiltrados
 * 4. Reinicia la paginación
 * 5. Actualiza la tabla
 * 
 * En caso de error muestra una alerta con SweetAlert2.
 * 
 * Depende de:
 * - actualizarTabla() (de tabla.js)
 * - actualizarPaginacion() (de paginacion.js)
 */
function cargarProductos() {
    fetch(`${API_URL}/Lista`)
        .then(response => response.json())
        .then(data => {
            productosOriginales = data.response;
            productosFiltrados = [];
            paginaActual = 1;
            actualizarTabla(productosOriginales);
            actualizarPaginacion();
        })
        .catch(error => {
            console.error('Error al cargar productos:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar',
                text: 'No se pudieron cargar los productos',
                confirmButtonText: 'Aceptar'
            });
        });
}

/* 
 * Guarda o actualiza un producto mediante la API.
 * 
 * Determina si es una creación (POST) o actualización (PUT) basado en idProducto.
 * Envía los datos del formulario a la API.
 * 
 * En caso de éxito:
 * - Resetea el formulario
 * - Cierra el modal
 * - Recarga los productos
 * - Muestra una alerta de éxito
 * 
 * En caso de error muestra una alerta con SweetAlert2.
 * 
 * Depende de:
 * - cargarProductos() (de este mismo archivo)
 * - cerrarModalProducto() (de modales.js)
 */
function guardarProducto() {
    const producto = {
        idProducto: document.getElementById('idProducto').value || 0,
        codigoBarra: document.getElementById('codigoBarra').value,
        nombre: document.getElementById('nombre').value,
        marca: document.getElementById('marca').value,
        categoria: document.getElementById('categoria').value,
        precio: parseFloat(document.getElementById('precio').value)
    };

    const url = producto.idProducto == 0 ? `${API_URL}/Guardar` : `${API_URL}/Editar`;
    const method = producto.idProducto == 0 ? 'POST' : 'PUT';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
        .then(response => {
            if (!response.ok) throw new Error('Error en la respuesta');
            return response.json();
        })
        .then(() => {
            document.getElementById('formProducto').reset();
            document.getElementById('idProducto').value = 0;
            cerrarModalProducto();
            cargarProductos();
            Swal.fire({
                icon: 'success',
                title: producto.idProducto == 0 ? 'Producto agregado' : 'Producto actualizado',
                text: 'Los cambios se guardaron correctamente',
                showConfirmButton: false,
                timer: 2000
            });
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al guardar',
                text: 'Ocurrió un problema al guardar el producto',
                confirmButtonText: 'Aceptar'
            });
        });
}

/* 
 * Elimina un producto mediante la API.
 * id - ID del producto a eliminar
 * 
 * Muestra una confirmación con SweetAlert2 antes de eliminar.
 * 
 * En caso de éxito:
 * - Recarga los productos
 * - Muestra una alerta de éxito
 * 
 * En caso de error muestra una alerta con SweetAlert2.
 * 
 * Depende de:
 * - cargarProductos() (de este mismo archivo)
 */
function eliminarProducto(id) {
    Swal.fire({
        title: '¿Eliminar producto?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`${API_URL}/Eliminar/${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (!response.ok) throw new Error('Error al eliminar');
                    return response.json();
                })
                .then(() => {
                    cargarProductos();
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado',
                        text: 'El producto fue eliminado correctamente',
                        showConfirmButton: false,
                        timer: 2000
                    });
                })
                .catch(error => {
                    console.error('Error al eliminar:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al eliminar',
                        text: 'Ocurrió un problema al eliminar el producto',
                        confirmButtonText: 'Aceptar'
                    });
                });
        }
    });
}