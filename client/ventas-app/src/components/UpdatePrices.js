// components/UpdatePrices.js
import React, { useState } from 'react';

const UpdatePrices = () => {
  const [type, setType] = useState('');
  const [provider, setProvider] = useState('');
  const [isNational, setIsNational] = useState(false);

  const handleUpdatePrices = () => {
    // Aquí puedes llamar a la API para actualizar los precios con los criterios seleccionados (type, provider, isNational).
    // Puedes utilizar la función fetch() para hacer la petición POST a la API.
    // Recuerda que debes implementar la lógica en el servidor para realizar las actualizaciones en la base de datos.
    // Por ejemplo:
    fetch('/api/update-prices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, provider, isNational }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Aquí puedes manejar la respuesta de la API, por ejemplo, mostrar un mensaje de éxito o error.
      })
      .catch((error) => {
        console.error('Error updating prices:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h3>Actualizar Precios</h3>
      <form>
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
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isNational"
            checked={isNational}
            onChange={(e) => setIsNational(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="isNational">
            ¿Es Nacional?
          </label>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleUpdatePrices}>
          Actualizar Precios
        </button>
      </form>
    </div>
  );
};

export default UpdatePrices;
