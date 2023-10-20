// @ts-ignore
import Client from '../database';

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';

      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      //@ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product with id: ${id}. Error: ${err}`);
    }
  }

  async create(u: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [u.name, u.price, u.category]);

      console.log(`user: ${JSON.stringify(result.rows[0])}`);

      console.log(result);
      const product = result.rows[0];
      return product;
    } catch (err) {
      throw new Error(`Unable to create a new product ${(u.name, u.price, u.category)}`);
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)';

      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);
      console.log(result);

      const rowCount = result.rowCount;

      conn.release();
      console.log(`rowCount: ${rowCount}`);
      if (rowCount == 1) {
        return `product deleted`;
      } else {
        throw new Error(`Product with ID ${id} was not founded`);
      }
    } catch (err) {
      throw new Error(`Could not delete the product ${id}. Error: ${err}`);
    }
  }

  async showByCategory(category: string): Promise<Product> {
    try {
      console.log(`category: ${category}`);
      const sql = 'SELECT * FROM products WHERE category=($1)';
      //@ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [category]);
      conn.release();

      console.log('result rows:');
      console.log(result.rows);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find product from category ${category}. Error: ${err}`);
    }
  }

  async showTopProducts(number: number): Promise<Product> {
    try {
      console.log(`number: ${number}`);
      const sql =
        'SELECT p.name AS product_name, SUM(o.quantity) AS total_quantity FROM products p JOIN orders o ON p.id = o.product_id GROUP BY p.id, p.name, p.category ORDER BY total_quantity DESC LIMIT $1';
      //@ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [number]);
      conn.release();

      console.log('result rows:');
      console.log(result.rows);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find top products Error: ${err}`);
    }
  }
}
