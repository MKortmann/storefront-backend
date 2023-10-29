import Client from '../database';
import bcrypt from 'bcrypt';
import { Login } from '../types';
import { Order } from './order';
import { logger } from '../logger';
import { QueryResult } from 'pg';

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
      const query = {
        sql: 'SELECT * FROM users',
      };

      const conn = await Client.connect();
      const result = await conn.query(query.sql);
      conn.release();

      logger.info(`Fetched users: ${JSON.stringify(result.rows)}`);
      return result.rows;
    } catch (err) {
      logger.error('Error fetching users', err);
      throw err;
    }
  }

  async show(id: string): Promise<User> {
    try {
      const query = {
        sql: 'SELECT * FROM users WHERE id=($1)',
        values: [id],
      };

      const conn = await Client.connect();
      const result = await conn.query(query.sql, query.values);
      conn.release();

      logger.info(`Fetch user with id: ${id} - user: ${JSON.stringify(result.rows[0])}`);

      return result.rows[0];
    } catch (err) {
      logger.error(`Error fetching user with id: ${id}`, err);
      throw err;
    }
  }

  async create(u: User): Promise<User> {
    try {
      const salt = await bcrypt.genSalt(salt_rounds);
      const hash = await bcrypt.hashSync(u.password + pepper, salt);

      const query = {
        sql: 'INSERT INTO users (firstname, lastname, email, password_digest) VALUES($1, $2, $3, $4) RETURNING *',
        values: [u.firstname, u.lastname, u.email, hash],
      };

      const conn = await Client.connect();
      const result = await conn.query(query.sql, query.values);

      logger.info(`user creation result: ${JSON.stringify(result)}`);

      return result.rows[0];
    } catch (err) {
      logger.error(`No possible to create user: ${JSON.stringify(u)}`);
      throw err;
    }
  }

  async delete(id: string): Promise<number> {
    try {
      const query = {
        sql: 'DELETE FROM users WHERE id=($1)',
        values: [id],
      };

      const conn = await Client.connect();

      const result = await conn.query(query.sql, query.values);
      conn.release();

      logger.info(`Try to delete user result: ${JSON.stringify(result)}`);

      return result.rowCount;
    } catch (err) {
      logger.error(`No possible to delete a user with id: ${id}`);
      throw err;
    }
  }

  async update(id: string, u: User): Promise<QueryResult<any>> {
    try {
      const query = {
        sql: 'UPDATE users SET firstname=$1, lastname=$2, email=$3 WHERE id=($4)',
        values: [u.firstname, u.lastname, u.email, id],
      };
      const conn = await Client.connect();
      const result = await conn.query(query.sql, query.values);

      logger.info(`User update result: ${JSON.stringify(result)}`);

      conn.release();

      return result;
    } catch (err) {
      logger.error(`Could not update user ${id}. Error: ${err}`);
      throw err;
    }
  }

  async authenticate(login: Login): Promise<User | null> {
    try {
      const query = {
        sql: 'SELECT * FROM users WHERE email=($1)',
        values: [login.email],
      };

      const conn = await Client.connect();
      const result = await conn.query(query.sql, query.values);

      logger.info(`User authenticate result: ${JSON.stringify(result)}`);

      if (result.rows.length) {
        const user = result.rows[0];

        if (await bcrypt.compare(login.password + pepper, user.password_digest)) {
          logger.info('compared! Matched!');
          return user;
        }
      } else {
        logger.error(`User not founded`);
      }
      logger.error(`password not matched!`);
      return null;
    } catch (err) {
      logger.error(`No possible to authenticate user!`);
      throw err;
    }
  }

  async lastOrdersByUser(user_id: string): Promise<Order[]> {
    try {
      const query = {
        sql: 'SELECT * FROM orders WHERE user_id=$1 ORDER BY created_at DESC LIMIT 5',
        values: [user_id],
      };
      const conn = await Client.connect();
      const result = await conn.query(query.sql, query.values);
      conn.release();
      logger.info(`Last orders by user - result: ${JSON.stringify(result)}`);
      return result.rows;
    } catch (err) {
      logger.error(`Could not find active orders from user: ${user_id}. Error: ${err}`);
      throw err;
    }
  }
}
