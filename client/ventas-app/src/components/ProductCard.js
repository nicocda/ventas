import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{product.description}</h5>
        <p className="card-text">Código: {product.code}</p>
        <p className="card-text">Tipo: {product.type}</p>
        <p className="card-text">Proveedor: {product.provider}</p>
        <p className="card-text">Precio: {product.price}</p>
        <p className="card-text">Nacional: {product.isNational ? 'Sí' : 'No'}</p>
        {/* Aquí puedes agregar más información de los productos si lo deseas */}
      </div>
    </div>
  );
};

export default ProductCard;
