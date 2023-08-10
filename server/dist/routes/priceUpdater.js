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
exports.updatePrice = void 0;
// priceUpdater.ts
const db_1 = __importDefault(require("../db"));
function updatePrice(criteria) {
    return __awaiter(this, void 0, void 0, function* () {
        const { type, provider, code, percentage } = criteria;
        let condition = '';
        if (code)
            condition += ` AND code like '${code}'`;
        if (type)
            condition += ` AND type like '${type}'`;
        if (provider)
            condition += ` AND provider like '${provider}'`;
        if (!type && !provider && !code) {
            throw new Error('You must specify at least one criteria to update the price.');
        }
        const updateQuery = `UPDATE products SET price = price + (price * ? / 100) WHERE 1=1 ${condition}`;
        const insertQuery = `INSERT INTO price_history (product_id, price, modification_date) 
                       SELECT id, price, NOW() FROM products WHERE 1=1 ${condition}`;
        // Ejecutar la consulta de actualización y obtener el resultado
        const [updateResult] = yield db_1.default.execute(updateQuery, [percentage]);
        // Verificar si la propiedad 'affectedRows' existe en el resultado de la actualización
        if ('affectedRows' in updateResult) {
            // Utiliza updateResult.affectedRows para obtener el número de filas afectadas por la actualización
            const affectedRows = updateResult.affectedRows;
            // Si hubo al menos una fila afectada por la actualización, ejecutar la consulta de inserción
            if (affectedRows > 0) {
                const [insertResult] = yield db_1.default.execute(insertQuery);
                // Verificar si la propiedad 'affectedRows' existe en el resultado de la inserción
                if ('affectedRows' in insertResult) {
                    // Utiliza insertResult.affectedRows para obtener el número de filas afectadas por la inserción
                    const insertedRows = insertResult.affectedRows;
                    // Devolver el número total de filas afectadas (actualizaciones + inserciones)
                    return affectedRows + insertedRows;
                }
            }
        }
        // Si no se encontró 'affectedRows' en los resultados, devolver 0 para indicar que no hubo actualizaciones ni inserciones
        return 0;
    });
}
exports.updatePrice = updatePrice;
