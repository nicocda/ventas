import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import UpdatePrices from './components/UpdatePrices';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);


const App = () => {
  return (
    <Router>
      <div>
        <ul className='menu-horizontal'>
          <li>
            <Link to="/nuevo-producto">Cargar Nuevo Producto</Link>
          </li>
          <li>
            <Link to="/actualizar-precios">Actualizar Precios</Link>
          </li>
          <li>
            <Link to="/lista-productos">Listar Productos</Link>
          </li>
        </ul>
      </div>
      <hr />
      <div className="app-container">
      <Routes>
        <Route path="/nuevo-producto" element={<ProductForm />} />
        <Route path="/actualizar-precios" element={<UpdatePrices />} />
        <Route path="/lista-productos" element={<ProductList />} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;
