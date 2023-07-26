// components/ProductForm.js

import React, { useState } from 'react';

const ProductForm = ({ onSubmit }) => {
  const [descripcion, setDescripcion] = useState('');
  const [codigo, setCodigo] = useState('');
  const [tipo, setTipo] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [precio, setPrecio] = useState('');
  const [nacional, setNacional] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ descripcion, codigo, tipo, proveedor, precio, nacional });
    setDescripcion('');
    setCodigo('');
    setTipo('');
    setProveedor('');
    setPrecio('');
    setNacional(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="descripcion" className="form-label">
          Descripción
        </label>
        <input
          type="text"
          className="form-control"
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="codigo" className="form-label">
          Código
        </label>
        <input
          type="text"
          className="form-control"
          id="codigo"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tipo" className="form-label">
          Tipo
        </label>
        <input
          type="text"
          className="form-control"
          id="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="proveedor" className="form-label">
          Proveedor
        </label>
        <input
          type="text"
          className="form-control"
          id="proveedor"
          value={proveedor}
          onChange={(e) => setProveedor(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="precio" className="form-label">
          Precio
        </label>
        <input
          type="number"
          className="form-control"
          id="precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="nacional"
          checked={nacional}
          onChange={(e) => setNacional(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="nacional">
          Nacional
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Enviar
      </button>
    </form>
  );
};

export default ProductForm;
