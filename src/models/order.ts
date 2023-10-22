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

  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      //@ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(u: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (quantity, order_status, created_at, product_id, user_id) VALUES($1, $2, $3, $4, $5) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        u.quantity,
        u.order_status,
        u.created_at,
        u.product_id,
        u.user_id,
      ]);

      console.log(`user: ${JSON.stringify(result.rows[0])}`);

      console.log(result);
      const order = result.rows[0];
      return order;
    } catch (err) {
      throw new Error(
        `Unable to create a new order ${
          (u.quantity, u.order_status, u.created_at, u.product_id, u.user_id)
        }`
      );
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';

      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);
      console.log(result);

      const rowCount = result.rowCount;

      conn.release();
      console.log(`rowCount: ${rowCount}`);
      if (rowCount == 1) {
        return `order deleted`;
      } else {
        throw new Error(`Order with ID ${id} was not founded`);
      }
    } catch (err) {
      throw new Error(`Could not delete the order ${id}. Error: ${err}`);
    }
  }

  async currentOrderByUser(user_id: string, status: string): Promise<Order> {
    try {
      const query = {
        sql: 'SELECT * FROM orders WHERE user_id = $1 AND order_status = $2',
        values: [user_id, status],
      };
      //@ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(query.sql, query.values);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not find active orders from user: ${user_id}. Error: ${err}`
      );
    }
  }
}
