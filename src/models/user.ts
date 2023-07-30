// @ts-ignore
import Client from '../database';

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const sql = 'SELECT * FROM users';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      //@ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (firstname, lastname, email, password_digest) VALUES($1, $2, $3, $4) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.email,
        u.password,
      ]);

      console.log(`user: ${JSON.stringify(result.rows[0])}`);

      const user = result.rows[0];
      return user;
    } catch (err) {
      throw new Error(`Unable to create a new user ${(u.firstname, u.lastname)}`);
    }
  }
}
