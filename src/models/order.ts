import Client from '../database';
import { logger } from '../logger';

export type Order = {
  id?: number;
  quantity: number;
  order_status: string;
  created_at: Date;
  product_id: number;
  user_id: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const query = {
        sql: 'SELECT * FROM orders;',
      };

      const result = await conn.query(query.sql);
      conn.release();

      logger.info(`Fetched orders: ${JSON.stringify(result.rows)}`);

      return result.rows;
    } catch (err) {
      logger.error(`Could not get orders. Order: ${err}`);
      throw err;
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const query = {
        sql: 'SELECT * FROM orders WHERE id=($1)',
        values: [id],
      };

      const conn = await Client.connect();
      const result = await conn.query(query.sql, query.values);
      conn.release();

      logger.info(`Fetch order by id: ${id} - result: ${JSON.stringify(result)}`);
      return result.rows[0];
    } catch (err) {
      logger.error(`Could not find order ${id}. Error: ${err}`);
      throw err;
    }
  }

  async create(u: Order): Promise<Order> {
    try {
      const query = {
        sql: 'INSERT INTO orders (quantity, order_status, created_at, product_id, user_id) VALUES($1, $2, $3, $4, $5) RETURNING *',
        values: [u.quantity, u.order_status, u.created_at, u.product_id, u.user_id],
      };

      const conn = await Client.connect();

      const result = await conn.query(query.sql, query.values);

      logger.info(`create order - result: ${JSON.stringify(result)}`);

      const order = result.rows[0];
      return order;
    } catch (err) {
      logger.error(
        `Unable to create a new order ${
          (u.quantity, u.order_status, u.created_at, u.product_id, u.user_id)
        }`
      );
      throw err;
    }
  }

  async delete(id: string): Promise<number> {
    try {
      const query = {
        sql: 'DELETE FROM orders WHERE id=($1)',
        values: [id],
      };

      const conn = await Client.connect();

      const result = await conn.query(query.sql, query.values);
      console.log(result);

      conn.release();
      logger.info(`Try to delete user order: ${JSON.stringify(result)}`);

      return result.rowCount;
    } catch (err) {
      logger.error(`No possible to delete order with id: ${id}`);
      throw err;
    }
  }
  async currentOrderByUser(user_id: string, status: string): Promise<Order[]> {
    try {
      const query = {
        sql: 'SELECT * FROM orders WHERE user_id = $1 AND order_status = $2',
        values: [user_id, status],
      };
      const conn = await Client.connect();
      const result = await conn.query(query.sql, query.values);
      conn.release();

      logger.info(`Create order by user - result: ${JSON.stringify(result)}`);
      return result.rows;
    } catch (err) {
      logger.error(`Could not find active orders from user: ${user_id}. Error: ${err}`);
      throw err;
    }
  }
}
