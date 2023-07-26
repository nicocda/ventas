import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import UpdatePrices from './components/UpdatePrices';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Menú de Opciones</h1>
        <ul>
          <li>
            <Link to="/nuevo-producto">Cargar Nuevo Producto</Link>
          </li>
          <li>
            <Link to="/actualizar-precios">Actualizar Precios</Link>
          </li>
        </ul>
      </div>
      <hr />
      <Switch>
        <Route path="/nuevo-producto" component={ProductForm} />
        <Route path="/actualizar-precios" component={UpdatePrices} />
      </Switch>
    </Router>
  );
};

export default App;
