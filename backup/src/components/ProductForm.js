import React, { useState } from 'react';

const ProductForm = () => {
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [type, setType] = useState('');
  const [provider, setProvider] = useState('');
  const [price, setPrice] = useState('');
  const [isNational, setIsNational] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que los campos requeridos no estén vacíos
    if (!description || !code || !price) {
      setError('Todos los campos son obligatorios');
      return;
    }

    // Crear el objeto de producto con los datos del formulario
    const newProduct = {
      description,
      code,
      type,
      provider,
      price: parseFloat(price),
      is_national: isNational,
    };

    try {
      console.log(newProduct);
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Error al crear el nuevo producto');
      }

      // Si la respuesta es exitosa, limpiar el formulario y mostrar un mensaje de éxito
      setDescription('');
      setCode('');
      setType('');
      setProvider('');
      setPrice('');
      setIsNational(false);
      setError('Producto creado exitosamente');
    } catch (error) {
      setError('Error al crear el nuevo producto');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Descripción
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="code" className="form-label">
          Código
        </label>
        <input
          type="text"
          className="form-control"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="type" className="form-label">
          Tipo
        </label>
        <input
          type="text"
          className="form-control"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="provider" className="form-label">
          Proveedor
        </label>
        <input
          type="text"
          className="form-control"
          id="provider"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Precio
        </label>
        <input
          type="number"
          className="form-control"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="isNational"
          checked={isNational}
          onChange={(e) => setIsNational(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="isNational">
          Nacional
        </label>
      </div>
      {error && <p className="text-danger">{error}</p>}
      <button type="submit" className="btn btn-primary">
        Enviar
      </button>
    </form>
  );
};

export default ProductForm;
