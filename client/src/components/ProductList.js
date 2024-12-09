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
    // setProducts([
    //   { code: "P001", description: "Camisa", type: "Ropa", provider: "Proveedor A", price: 29.99 },
    //   { code: "P002", description: "Pantalón", type: "Ropa", provider: "Proveedor B", price: 49.99 },
    //   { code: "P003", description: "Zapatos", type: "Calzado", provider: "Proveedor C", price: 79.99 },
    // ]);
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

  const exportToCSV = () => {
    // Encabezados en español
    const headers = ["Código", "Descripción", "Tipo", "Proveedor", "Precio"];
    // Filas con los datos de los productos
    const rows = products.map((product) => [
      product.code,
      product.description,
      product.type,
      product.provider,
      product.price,
    ]);

    // Combinar encabezados y filas con punto y coma
    const csvContent =
      [headers, ...rows]
        .map((row) => row.map((item) => `"${item}"`).join(";")) // Separar por punto y coma
        .join("\n");

    // Crear archivo Blob con BOM para evitar problemas de acentos
    const BOM = "\uFEFF"; // Marca de orden de bytes
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Crear enlace de descarga y activarlo
    const link = document.createElement("a");
    link.href = url;

    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0"); // Asegurar 2 dígitos
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Meses van de 0 a 11
    const year = today.getFullYear();
    const formattedDate = `${day}-${month}-${year}`; // Formato dd-MM-yyyy

    const fileName = `Productos_${formattedDate}.csv`;

    link.setAttribute("download", fileName);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
 
  return (
    <div>
      <button
        className="btn btn-success rounded-pill d-flex align-items-center gap-2 float-end"
        onClick={exportToCSV}
        >
        Exportar Productos
      </button>
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
