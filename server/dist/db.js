"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/db.ts
const promise_1 = require("mysql2/promise");
const pool = (0, promise_1.createPool)({
    host: 'localhost',
    user: 'ngiordano',
    password: 'nicolas23',
    database: 'ventas',
    connectionLimit: 10,
});
exports.default = pool;
