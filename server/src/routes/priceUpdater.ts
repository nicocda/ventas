// priceUpdater.ts
import pool from '../db';

interface PriceUpdateCriteria {
  type?: string;
  provider?: string;
  isNational?: boolean;
  percentage: number;
}

export async function updatePrice(criteria: PriceUpdateCriteria): Promise<number> {
  const { type, provider, isNational, percentage } = criteria;
  let condition = '';

  if (type) condition += ` AND type like '${type}'`;
  if (provider) condition += ` AND provider like '${provider}'`;

  if (!type && !provider) {
    throw new Error('You must specify at least one criteria to update the price.');
  }

  const query = `UPDATE products SET price = price + (price * ? / 100) WHERE 1=1 ${condition}`;
  console.log(query + percentage)
  // Ejecutar la consulta y obtener el resultado
  const [result] = await pool.execute(query, [percentage]);

  // Verificar si la propiedad 'affectedRows' existe en el resultado
  if ('affectedRows' in result) {
    // Utiliza result.affectedRows para obtener el número de filas afectadas
    return result.affectedRows;
  } else {
    // Si no se encuentra 'affectedRows', devolver 0 para indicar que no hubo actualizaciones
    return 0;
  }
}