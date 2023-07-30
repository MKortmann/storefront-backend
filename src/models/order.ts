// @ts-ignore
import Client from '../database';

export type Order = {
  id: number;
  quantity: number;
  order_status: string;
  created_at: Date;
  product_id: number;
  user_id: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders;';

      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Order: ${err}`);
    }
  }
}
