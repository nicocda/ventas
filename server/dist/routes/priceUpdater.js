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
        const { type, provider, isNational, percentage } = criteria;
        let condition = '';
        if (type)
            condition += ` AND type = '${type}'`;
        if (provider)
            condition += ` AND provider = '${provider}'`;
        if (isNational !== undefined)
            condition += ` AND is_national = ${isNational ? 1 : 0}`;
        if (!type && !provider && isNational === undefined) {
            throw new Error('You must specify at least one criteria to update the price.');
        }
        const query = `UPDATE products SET price = price + (price * ? / 100) WHERE 1=1 ${condition}`;
        // Ejecutar la consulta y obtener el resultado
        const [result] = yield db_1.default.execute(query, [percentage]);
        // Verificar si la propiedad 'affectedRows' existe en el resultado
        if ('affectedRows' in result) {
            // Utiliza result.affectedRows para obtener el número de filas afectadas
            return result.affectedRows;
        }
        else {
            // Si no se encuentra 'affectedRows', devolver 0 para indicar que no hubo actualizaciones
            return 0;
        }
    });
}
exports.updatePrice = updatePrice;
