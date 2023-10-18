// @ts-ignore
import Client from '../database';
import bcrypt from 'bcrypt';
import { Login } from '../types';

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const pepper = process.env.PEPPER;
const salt_rounds = Number(process.env.SALT_ROUNDS);

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

      const salt = await bcrypt.genSalt(salt_rounds);
      const hash = await bcrypt.hashSync(u.password + pepper, salt);

      const result = await conn.query(sql, [u.firstname, u.lastname, u.email, hash]);

      console.log(`user: ${JSON.stringify(result.rows[0])}`);

      console.log(result);
      const user = result.rows[0];
      return user;
    } catch (err) {
      throw new Error(`Unable to create a new user ${(u.firstname, u.lastname)}`);
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';

      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);
      console.log(result);

      const rowCount = result.rowCount;

      conn.release();
      console.log(`rowCount: ${rowCount}`);
      if (rowCount == 1) {
        return `user deleted`;
      } else {
        throw new Error(`User with ID ${id} was not founded`);
      }
    } catch (err) {
      throw new Error(`Could not delete the user ${id}. Error: ${err}`);
    }
  }

  async authenticate(login: Login): Promise<User | null> {
    const sql = 'SELECT * FROM users WHERE email=($1)';
    // @ts-ignore
    const conn = await Client.connect();
    const result = await conn.query(sql, [login.email]);

    if (result.rows.length) {
      const user = result.rows[0];

      console.log(`result: ${result}`);

      if (await bcrypt.compare(login.password + pepper, user.password_digest)) {
        console.log('compared! Matched!');
        return user;
      }
    }
    console.log('password not matched!');
    return null;
  }

  async update(id: string, u: User): Promise<User> {
    try {
      // @prettier-ignore
      const sql = 'UPDATE users SET firstname=$1, lastname=$2, email=$3 WHERE id=($4)';

      // @ts-ignore
      const conn = await Client.connect();

      console.log(`id: ${id}`);

      const result = await conn.query(sql, [u.firstname, u.lastname, u.email, id]);

      console.log(`result: ${JSON.stringify(result)}`);

      if (!result) {
        throw new Error("Update query didn't return the expected result.");
      }

      // const user = result.rows[0];

      // if (user.rowCount === 0) {
      //   throw new Error(`Could not find user with ${id} to update.`);
      // }

      conn.release();

      return u;
    } catch (err) {
      throw new Error(`Could not update user ${id}. Error: ${err}`);
    }
  }
}
