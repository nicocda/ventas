import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdatePrices = () => {
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [code, setCode] = useState('');
  const [percentage, setPercentage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTypes();
    fetchProviders();
  }, []);

  const fetchTypes = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}/products/types`);
      const data = await response.json();
      //data.push("");
      setTypes(data);
    } catch (error) {
      console.error('Error al obtener los tipos de productos:', error);
    }
  };

  const fetchProviders = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}/products/providers`);
      const data = await response.json();
  //    data.push("");
      setProviders(data);
    } catch (error) {
      console.error('Error al obtener los proveedores de productos:', error);
    }
  };

  const handleUpdatePrices = async () => {
    if (!selectedType && !selectedProvider && !code) {
      setError('Debes especificar al menos uno de los filtros (Tipo, Proveedor o Código)');
      return;
    }

    if (percentage === '' || parseFloat(percentage) === 0) {
      setError('El porcentaje de actualización no puede ser 0');
      return;
    }

    try {
      // console.log(`type: ${selectedType}`);
      // console.log(`provider: ${selectedProvider}`);
      // console.log(`code: ${code}`);
      // console.log(`percentage: ${percentage}`);
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}/products/update_price`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: selectedType,
          provider: selectedProvider,
          code,
          percentage,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los precios');
      }

      navigate('/lista-productos');

    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <h2>Actualizar Precios</h2>
      <form>
          <div className="mb-3">
          <label htmlFor="code" className="form-label">
            Código:
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
            Tipo:
          </label>
          <select
            className="form-control"
            id="type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Seleccione un tipo</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="provider" className="form-label">
            Proveedor:
          </label>
          <select
            className="form-control"
            id="provider"
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
          >
            <option value="">Seleccione un proveedor</option>
            {providers.map((provider) => (
              <option key={provider} value={provider}>
                {provider}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="percentage" className="form-label">
            Porcentaje de Actualización:
          </label>
          <input
            type="text"
            className="form-control"
            id="percentage"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
          />
        </div>
      {error && <p>{error}</p>}
        <button type="button" className="btn btn-primary" onClick={handleUpdatePrices}>
          Actualizar Precios
        </button>
      </form>
    </div>
  );
};

export default UpdatePrices;
