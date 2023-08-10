import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes  } from '@fortawesome/free-solid-svg-icons';
import ProductCard from './ProductCard';


const ProductList = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/products`);
      if (!response.ok) {
        throw new Error('Error fetching products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.provider.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

 
  return (
    <div>
      <h2>Lista de Productos</h2>
<div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por descripción, código, tipo o proveedor"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button className="btn btn-outline-secondary" onClick={handleClearSearch}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>
      {filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>
            <ProductCard product={product} onDelete={fetchProducts}/>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron productos.</p>
      )}
    </div>
  );
};

export default ProductList;
