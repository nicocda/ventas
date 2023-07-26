import React from 'react';

const ProductCard = ({ product, onDelete }) => {
  const handleDeleteProduct = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}/products/${product.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }
    if(onDelete)
      onDelete(); // Llamamos a la función onDelete para eliminar el producto de la lista
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{product.description}</h5>
        <p className="card-text">Código: {product.code}</p>
        {product.type && <p className="card-text">Tipo: {product.type}</p>}
        {product.provider && <p className="card-text">Proveedor: {product.provider}</p>}
        <p className="card-text">Precio: {product.price}</p>
        <p className="card-text">Nacional: {product.isNational ? 'Sí' : 'No'}</p>
        {/* Aquí puedes agregar más información de los productos si lo deseas */}
        <button className="btn btn-danger" onClick={handleDeleteProduct}>
          <i className="bi bi-x">x</i> 
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
