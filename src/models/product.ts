import Client from '../database';
import { logger } from '../logger';
export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
  quantity?: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const query = {
        sql: 'SELECT * FROM products',
      };

      const conn = await Client.connect();
      const result = await conn.query(query.sql);
      conn.release();

      logger.info(`Fetched products: ${JSON.stringify(result.rows)}`);

      return result.rows;
    } catch (err) {
      logger.error('Error fetching products', err);
      throw err;
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const query = {
        sql: 'SELECT * FROM products WHERE id=($1)',
        values: [id],
      };

      const conn = await Client.connect();
      const result = await conn.query(query.sql, query.values);
      conn.release();

      logger.info(
        `Fetch product with id: ${id} - product: ${JSON.stringify(result.rows[0])}`
      );
      return result.rows[0];
    } catch (err) {
      logger.error(`Error fetching product with id: ${id}`, err);
      throw err;
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const query = {
        sql: 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *',
        values: [p.name, p.price, p.category],
      };

      const conn = await Client.connect();
      const result = await conn.query(query.sql, query.values);

      logger.info(`Product creation result: ${JSON.stringify(result)}`);

      return result.rows[0];
    } catch (err) {
      logger.error(`No possible to create a product: ${JSON.stringify(p)}`);
      throw err;
    }
  }

  async delete(id: string): Promise<number> {
    try {
      const query = {
        sql: 'DELETE FROM products WHERE id=($1)',
        values: [id],
      };
      console.log(`query: ${JSON.stringify(query)}`);
      const conn = await Client.connect();
      const result = await conn.query(query.sql, query.values);
      logger.info(
        `Result from deleting product with id=${id}: ${JSON.stringify(result)}`
      );
      conn.release();

      logger.info(`Try to delete product result: ${JSON.stringify(result)}`);

      return result.rowCount;
    } catch (err) {
      logger.error(`No possible to delete a product with id: ${id}`);
      throw err;
    }
  }

  async showByCategory(category: string): Promise<Product[]> {
    try {
      const query = {
        sql: 'SELECT * FROM products WHERE category=($1)',
        values: [category],
      };

      const conn = await Client.connect();
      const result = await conn.query(query.sql, query.values);
      conn.release();

      logger.info(`show by category - result rows: ${JSON.stringify(result.rows)}`);
      return result.rows;
    } catch (err) {
      logger.error(`Could not find products by category: ${category}. Error: ${err}`);
      throw err;
    }
  }

  async showTopProducts(number: number): Promise<Product[]> {
    try {
      const query = {
        sql: 'SELECT p.name AS name, SUM(o.quantity) AS quantity FROM products p JOIN orders o ON p.id = o.product_id GROUP BY p.id, p.name, p.category ORDER BY quantity DESC LIMIT $1',
        values: [number],
      };

      const conn = await Client.connect();
      const result = await conn.query(query.sql, query.values);
      conn.release();

      logger.info(`showTopProducts - result rows: ${result.rows}`);

      return result.rows;
    } catch (err) {
      throw err;
    }
  }
}
