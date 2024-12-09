import React, { useState, useEffect } from 'react';

const ProductForm = ({ productId }) => {
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [type, setType] = useState('');
  const [provider, setProvider] = useState('');
  const [price, setPrice] = useState('');
  const [isNational, setIsNational] = useState(false);
  const [error, setError] = useState('');
  // const [productData, setProductData] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (productId) {
          const apiUrl = process.env.REACT_APP_API_BASE_URL;
          const response = await fetch(`${apiUrl}/products/${productId}`);
          if (!response.ok) {
            throw new Error('Error al obtener los datos del producto');
          }
          const product = await response.json();
          // setProductData(product);
          setDescription(product.description);
          setCode(product.code);
          setType(product.type);
          setProvider(product.provider);
          setPrice(product.price.toString());
          setIsNational(product.is_national);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId]);

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
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const url = productId ? `${apiUrl}/products/${productId}` : `${apiUrl}/products`;

      const response = await fetch(url, {
        method: productId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Error al crear/editar el producto');
      }

      setError(productId ? 'Producto editado exitosamente' : 'Producto creado exitosamente');
    } catch (error) {
      setError('Error al crear/editar el producto');
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
      {/* Resto de los campos del formulario */}
      {error && <p className="text-danger">{error}</p>}
      <button type="submit" className="btn btn-primary">
        {productId ? 'Editar Producto' : 'Agregar Producto'}
      </button>
    </form>
  );
};

export default ProductForm;
