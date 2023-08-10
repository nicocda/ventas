// priceUpdater.ts
import pool from '../db';

interface PriceUpdateCriteria {
  type?: string;
  provider?: string;
  code?: string;
  percentage: number;
}

export async function updatePrice(criteria: PriceUpdateCriteria): Promise<number> {
  const { type, provider, code, percentage } = criteria;
  let condition = '';

  if (code) condition += ` AND code like '${code}'`;
  if (type) condition += ` AND type like '${type}'`;
  if (provider) condition += ` AND provider like '${provider}'`;

  if (!type && !provider && !code) {
    throw new Error('You must specify at least one criteria to update the price.');
  }

  const updateQuery = `UPDATE products SET price = price + (price * ? / 100) WHERE 1=1 ${condition}`;
  const insertQuery = `INSERT INTO price_history (product_id, price, modification_date) 
                       SELECT id, price, NOW() FROM products WHERE 1=1 ${condition}`;

  // Ejecutar la consulta de actualización y obtener el resultado
  const [updateResult] = await pool.execute(updateQuery, [percentage]);

  // Verificar si la propiedad 'affectedRows' existe en el resultado de la actualización
  if ('affectedRows' in updateResult) {
    // Utiliza updateResult.affectedRows para obtener el número de filas afectadas por la actualización
    const affectedRows = updateResult.affectedRows;

    // Si hubo al menos una fila afectada por la actualización, ejecutar la consulta de inserción
    if (affectedRows > 0) {
      const [insertResult] = await pool.execute(insertQuery);

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
}
