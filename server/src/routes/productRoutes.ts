// productRoutes.ts
import express, { Router, Request, Response } from 'express';
import pool from '../db';
import { updatePrice } from './priceUpdater';
import { getRowCount } from '../utils'; // Importamos la función de utilidad

const router: Router = express.Router();
// Cargar productos
router.post('/', async (req: Request, res: Response) => {
  const { description, code, type, price, provider, is_national } = req.body;

  try {
    // Iniciar la transacción
    await pool.query('START TRANSACTION');

    // Agregar el nuevo producto a la tabla "products"
    const newProductQuery = `
      INSERT INTO products (description, code, type, price, provider, is_national, available)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const productResult = await pool.query(newProductQuery, [
      description,
      code,
      type,
      price,
      provider,
      is_national,
      true, // Por defecto, el producto se marca como disponible al crearlo
    ]);

    const productId = (productResult[0] as any).insertId;

    // Agregar el precio a la tabla "price_history"
    const priceHistoryQuery = 'INSERT INTO price_history (product_id, price, modification_date) VALUES (?, ?, NOW())';
    await pool.query(priceHistoryQuery, [productId, price]);

    // Finalizar la transacción
    await pool.query('COMMIT');

    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    // Si ocurre algún error, revertir la transacción
    await pool.query('ROLLBACK');
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all products with current price
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT products.id, products.description, products.code, products.type, products.price, products.provider, products.is_national, products.available, MAX(price_history.modification_date) AS last_modified_date
      FROM products
      LEFT JOIN price_history ON products.id = price_history.product_id
      where products.available = 1
      GROUP BY products.id, products.description, products.code, products.type, products.price, products.provider, products.is_national, products.available
    `;

    const [productsResult] = await pool.execute(query);
    const products = productsResult as any[];

    // Modificar el formato si es necesario
    const formattedProducts = products.map((product) => ({
      id: product.id,
      description: product.description,
      code: product.code,
      type: product.type,
      price: parseFloat(product.price).toFixed(2), // Formatear a dos decimales
      provider: product.provider,
      is_national: product.is_national === 1,
      available: product.available === 1,
      last_modified_date: product.last_modified_date,
    }));

    res.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});


// Ruta para actualizar el precio de un producto
router.put('/update_price', async (req: Request, res: Response) => {
  try {
    const { type, provider, isNational, percentage } = req.body;

    const criteria = { type, provider, isNational, percentage };

    const updatedRows = await updatePrice(criteria);
    res.json({ message: `${updatedRows} product(s) updated successfully.` });
  } catch (error) {
    console.error('Error updating price:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Ruta para cambiar el estado del producto por su ID (DELETE)
router.delete('/:id', async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    // Buscar el producto por su ID
    const productQuery = 'SELECT * FROM products WHERE id = ?';


 
  // Ejecutar la consulta y obtener el resultado
  const [result] = await pool.execute(productQuery, [productId]);

  // Verificar si la propiedad 'affectedRows' existe en el resultado
  if ('affectedRows' !in result) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

    

    // Cambiar el estado del producto a "no disponible" (available = false)
    const updateProductQuery = 'UPDATE products SET available = ? WHERE id = ?';
    await pool.query(updateProductQuery, [false, productId]);

    res.json({ message: 'Estado del producto cambiado correctamente' });
  } catch (error) {
    console.error('Error cambiando el estado del producto:', error);
    res.status(500).json({ message: 'Error cambiando el estado del producto' });
  }
});


export default router;
