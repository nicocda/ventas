"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// productRoutes.ts
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const priceUpdater_1 = require("./priceUpdater");
const router = express_1.default.Router();
// Cargar productos
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, code, type, price, provider, is_national } = req.body;
    try {
        // Iniciar la transacción
        yield db_1.default.query('START TRANSACTION');
        // Agregar el nuevo producto a la tabla "products"
        const newProductQuery = `
      INSERT INTO products (description, code, type, price, provider, is_national, available)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
        const productResult = yield db_1.default.query(newProductQuery, [
            description,
            code,
            type,
            price,
            provider,
            is_national,
            true, // Por defecto, el producto se marca como disponible al crearlo
        ]);
        const productId = productResult[0].insertId;
        // Agregar el precio a la tabla "price_history"
        const priceHistoryQuery = 'INSERT INTO price_history (product_id, price, modification_date) VALUES (?, ?, NOW())';
        yield db_1.default.query(priceHistoryQuery, [productId, price]);
        // Finalizar la transacción
        yield db_1.default.query('COMMIT');
        res.status(201).json({ message: 'Product created successfully' });
    }
    catch (error) {
        // Si ocurre algún error, revertir la transacción
        yield db_1.default.query('ROLLBACK');
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
// GET all products with current price
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
      SELECT products.id, products.description, products.code, products.type, products.price, products.provider, products.is_national, products.available, MAX(price_history.modification_date) AS last_modified_date
      FROM products
      LEFT JOIN price_history ON products.id = price_history.product_id
      where products.available = 1
      GROUP BY products.id, products.description, products.code, products.type, products.price, products.provider, products.is_national, products.available
    `;
        const [productsResult] = yield db_1.default.execute(query);
        const products = productsResult;
        // Modificar el formato si es necesario
        const formattedProducts = products.map((product) => ({
            id: product.id,
            description: product.description,
            code: product.code,
            type: product.type,
            price: parseFloat(product.price).toFixed(2),
            provider: product.provider,
            is_national: product.is_national === 1,
            available: product.available === 1,
            last_modified_date: product.last_modified_date,
        }));
        res.json(formattedProducts);
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products' });
    }
}));
// Ruta para actualizar el precio de un producto
router.put('/update_price', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, provider, code, percentage } = req.body;
        const criteria = { type, provider, code, percentage };
        const updatedRows = yield (0, priceUpdater_1.updatePrice)(criteria);
        res.json({ message: `${updatedRows} product(s) updated successfully.` });
    }
    catch (error) {
        console.error('Error updating price:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const query = 'SELECT * FROM products WHERE id = ?';
        const [productsResult] = yield db_1.default.execute(query, [productId]);
        const product = productsResult;
        // console.log(product);
        //     // Modificar el formato si es necesario
        //     const formattedProducts = {
        //       id: product.id,
        //       description: product.description,
        //       code: product.code,
        //       type: product.type,
        //       price: parseFloat(product.price).toFixed(2), // Formatear a dos decimales
        //       provider: product.provider,
        //       is_national: product.is_national === 1,
        //       available: product.available === 1,
        //       last_modified_date: product.last_modified_date,
        //     };
        res.json(product[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
}));
// Ruta para cambiar el estado del producto por su ID (DELETE)
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        // Buscar el producto por su ID
        const productQuery = 'SELECT * FROM products WHERE id = ?';
        // Ejecutar la consulta y obtener el resultado
        const [result] = yield db_1.default.execute(productQuery, [productId]);
        // Verificar si la propiedad 'affectedRows' existe en el resultado
        if ('affectedRows' in result) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        // Cambiar el estado del producto a "no disponible" (available = false)
        const updateProductQuery = 'UPDATE products SET available = ? WHERE id = ?';
        yield db_1.default.query(updateProductQuery, [false, productId]);
        res.json({ message: 'Estado del producto cambiado correctamente' });
    }
    catch (error) {
        console.error('Error cambiando el estado del producto:', error);
        res.status(500).json({ message: 'Error cambiando el estado del producto' });
    }
}));
router.get('/providers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "SELECT DISTINCT provider FROM products WHERE available = 1 and provider is not null and provider <> '' order by provider";
        const [result] = yield db_1.default.execute(query);
        const providers = result;
        res.json(providers.map(pr => pr.provider));
    }
    catch (error) {
        console.error('Error al obtener los proveedores de productos:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los proveedores de productos' });
    }
}));
router.get('/types', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "SELECT DISTINCT type FROM products WHERE available = 1 and type is not null and type <> '' order by type";
        const [result] = yield db_1.default.execute(query);
        const types = result;
        res.json(types.map(t => t.type));
    }
    catch (error) {
        console.error('Error al obtener los tipos de productos:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los tipos de productos' });
    }
}));
exports.default = router;
