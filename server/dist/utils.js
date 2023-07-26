"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRowCount = void 0;
function getRowCount(result) {
    if (Array.isArray(result)) {
        return result.length;
    }
    else if ('affectedRows' in result && result instanceof Object) {
        // Utilizamos la interfaz personalizada ResultSetHeader para verificar si tiene la propiedad 'affectedRows'
        return result.affectedRows;
    }
    else {
        return 0;
    }
}
exports.getRowCount = getRowCount;
