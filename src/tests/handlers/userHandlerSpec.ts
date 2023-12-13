import request from 'supertest';
import express from 'express';
import userRoutes from '../../handlers/users';
import { User } from '../../models/user';
import { logger } from '../../logger';

const app = express();
app.use(express.json());
userRoutes(app);

const bearerToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0bmFtZSI6Ik1hcmNlbG8iLCJsYXN0bmFtZSI6IktvcnRtYW5uIiwiZW1haWwiOiJjb21wYW55bXZtc0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzQ3ODk0NTYifSwiaWF0IjoxNjk5ODEzMTQyfQ.WX35z0E1aY3b0u7w-RBaGRaamcHJHN17o-bymPaNyIA';

// describe('User handeler - GET /users', () => {
//   it('should respond with a list of users and status 200', async () => {
//     const response = await request(app)
//       .get('/users')
//       .set('Authorization', `Bearer ${bearerToken}`);

//     expect(response.status).toBe(200);
//     expect(response.body).toBeDefined();
//   });
// });

// describe('User handeler - GET /user', () => {
//   it('return an user by specific user id', async () => {
//     const response = await request(app)
//       .get('/user/1')
//       .set('Authorization', `Bearer ${bearerToken}`);

//     expect(response.status).toBe(200);
//     expect(response.body).toBeDefined();
//   });
// });

type NewUser = Omit<User, 'password_digest'> & { password: string };

// describe('User handeler - POST /user', () => {
//   it('it should create an user', async () => {
//     const newUser: NewUser = {
//       firstname: 'John',
//       lastname: 'Doe 2',
//       email: 'john2@gmail.com',
//       password: '123456',
//     };

//     const response = await request(app)
//       .post('/user')
//       .set('Authorization', `Bearer ${bearerToken}`)
//       .send(newUser)
//       .expect(200);
//     logger.warn(JSON.stringify(response));

//     expect(response.body).toBeDefined();
//   });
// });

// describe('User handeler - DELETE  /user/:id', () => {
//   it('it should delete a user', async () => {
//     const response = await request(app)
//       .delete('/user/4')
//       .set('Authorization', `Bearer ${bearerToken}`);

//     expect([200, 404]).toContain(response.status);

//     logger.warn(JSON.stringify(response.text));

//     expect(response.body).toBeDefined();
//   });
// });

describe('User handeler - UPDATE USER  /user/:id', () => {
  it('it should update an user by id', async () => {
    const updateUser: NewUser = {
      firstname: 'Thomas',
      lastname: 'Kaltenbach',
      email: 'john2@gmail.com',
      password: '1234789456',
    };
    const response = await request(app)
      .put('/user/1')
      .set('Authorization', `Bearer ${bearerToken}`)
      .send(updateUser)
      .expect(200);

    logger.warn(JSON.stringify(response.text));
    const result = JSON.parse(response.text);

    expect(response.body).toBeDefined();
    expect(result['user'].firstname).toBe(updateUser.firstname);
    expect(result['user'].lastname).toBe(updateUser.lastname);
    expect(result['user'].email).toBe(updateUser.email);
    expect(result['user'].password_digest).toBe(updateUser.password);
  });
});
