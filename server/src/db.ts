// src/db.ts
import { createPool, Pool } from 'mysql2/promise';

const pool: Pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'nicolas23',
  database: 'ventas',
  connectionLimit: 10,
});

export default pool;
