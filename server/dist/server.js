"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const app = (0, express_1.default)();
const port = 4000;
const ipAddress = '0.0.0.0'; // Escuchar en todas las interfaces de red (acceso desde cualquier dispositivo en la red local)
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/products', productRoutes_1.default);
app.listen(port, ipAddress, () => {
    console.log(`Servidor corriendo en http://${ipAddress}:${port}`);
});
//const express = require('express');
// const app = express();
// const port = 3000; // Puedes cambiar el puerto aquí
// const ipAddress = '0.0.0.0'; // Escuchar en todas las interfaces de red (acceso desde cualquier dispositivo en la red local)
// app.listen(port, ipAddress, () => {
//   console.log(`Servidor corriendo en http://${ipAddress}:${port}`);
// });
// 
