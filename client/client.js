const API_URL = 'http://localhost:3000/api/products';
$(document).ready(function () {
    // Función para cargar los productos en la lista
    function loadProducts() {
        $.get(API_URL, function (data) {
            $('#productList').empty();
            data.forEach(function (product) {
                $('#productList').append(`
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${product.description}</h5>
                                <p class="card-text">Código: ${product.code}</p>
                                <p class="card-text">Tipo: ${product.type}</p>
                                <p class="card-text">Proveedor: ${product.provider}</p>
                                <p class="card-text">Precio: $${product.price}</p>
                                <p class="card-text">Nacional?: ${product.is_national ? 'Si' : 'No'}</p>
                            </div>
                        </div>
                    </div>
                `);
            });
        });
    }

    // Cargar productos al cargar la página
    loadProducts();

    // Manejar envío de formulario
    $('#productForm').submit(function (event) {
        event.preventDefault();
        const formData = {
            description: $('#description').val(),
            code: $('#code').val(),
            type: $('#type').val(),
            provider: $('#provider').val(),
            price: parseFloat($('#price').val()),
            is_national: $('#isNational').prop('checked')
        };
        $.post(API_URL, formData, function () {
            loadProducts();
            $('#productForm')[0].reset();
        });
    });

    // Manejar búsqueda
    $('#searchInput').on('input', function () {
        const searchValue = $(this).val().toLowerCase();
        $('#productList .card').each(function () {
            const description = $(this).find('.card-title').text().toLowerCase();
            if (description.includes(searchValue) || code.includes(searchValue) ) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});
