import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdatePrices = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('');
  const [provider, setProvider] = useState('');
  const [code, setCode] = useState('');
  const [percentage, setPercentage] = useState('');
  const [error, setError] = useState('');

  const handleUpdatePrices = async () => {
    if (!type && !provider && !code) {
      setError('Debes especificar al menos uno de los filtros (Tipo, Proveedor o Código)');
      return;
    }

    if (percentage === '' || parseFloat(percentage) === 0) {
      setError('El porcentaje de actualización no puede ser 0');
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}/products/update_price`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, provider, code, percentage }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los precios');
      }

      navigate('/lista-productos');
    } catch (error) {
      setError('Error al actualizar los precios');
    }
  };

  return (
    <div>
      <h2>Actualizar Precios</h2>
      {error && <p>{error}</p>}
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
            Proveedor:
          </label>
          <input
            type="text"
            className="form-control"
            id="provider"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          />
        </div>
        {/* <div className="mb-3 form-check">
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
        </div> */}
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
        <button type="button" className="btn btn-primary" onClick={handleUpdatePrices}>
          Actualizar Precios
        </button>
      </form>
    </div>
  );
};

export default UpdatePrices;
