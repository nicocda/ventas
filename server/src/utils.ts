// utils.ts
interface ResultSetHeader {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
}


export function getRowCount(result: any): number {
  if (Array.isArray(result)) {
    return result.length;
  } else if ('affectedRows' in result && result instanceof Object) {
    // Utilizamos la interfaz personalizada ResultSetHeader para verificar si tiene la propiedad 'affectedRows'
    return result.affectedRows;
  } else {
    return 0;
  }
}