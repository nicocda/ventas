import React, { Component } from 'react';

class ProductList extends Component {
  state = {
    products: [],
    loading: true,
    error: null,
  };

  async componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}/products`);
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const data = await response.json();
      this.setState({ products: data, loading: false, error: null });
    } catch (error) {
      this.setState({ error: 'Error al obtener los productos', loading: false });
    }
  };

  handleRefresh = () => {
    this.setState({ loading: true, error: null });
    this.fetchProducts();
  };

  render() {
    const { products, loading, error } = this.state;

    if (loading) {
      return <div>Cargando...</div>;
    }

    if (error) {
      return (
        <div>
          {error}
          <br />
          <button onClick={this.handleRefresh}>Refrescar lista</button>
        </div>
      );
    }

    return (
      <div>
        <h2>Listado de Productos</h2>
        <button type="button" onClick={this.handleRefresh}>Refrescar lista</button>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <strong>Descripción:</strong> {product.description} <br />
              <strong>Código:</strong> {product.code} <br />
              <strong>Tipo:</strong> {product.type} <br />
              <strong>Proveedor:</strong> {product.provider} <br />
              <strong>Precio:</strong> {product.price} <br />
              <strong>Nacional:</strong> {product.isNational ? 'Sí' : 'No'}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ProductList;
