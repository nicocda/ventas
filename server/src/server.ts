// src/server.ts
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRoutes from './routes/productRoutes';

const app: Application = express();
const port = 4000;
const ipAddress = '0.0.0.0'; // Escuchar en todas las interfaces de red (acceso desde cualquier dispositivo en la red local)


app.use(bodyParser.json());
app.use(cors());

app.use('/api/products', productRoutes);

app.listen(port,ipAddress, () => {
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