import { User, UserStore } from '../../models/user';
import { logger, logTestStart, logTestFinish, logTestError } from '../../logger';
import 'jasmine-expect';
import { QueryResult } from 'pg';

const specUserStore = 'userStoreSpec.ts';

describe(specUserStore, () => {
  let userStore = new UserStore();
  beforeAll(() => {
    logger.warn('Model Test: User');
  });

  beforeEach(() => {});

  afterAll(() => {});

  // const describeIndexMethod = 'index method';
  // describe(describeIndexMethod, () => {
  //   const itDescription = 'should fetch users and have the expected properties';
  //   it(itDescription, async () => {
  //     try {
  //       logTestStart(specUserStore, describeIndexMethod, itDescription);
  //       const users = await userStore.index();
  //       logger.warn(`users at index method: ${JSON.stringify(users)}`);
  //       expect(Array.isArray(users)).toBe(true);
  //       expect(users.length).toBeGreaterThan(0);
  //       users.forEach((user, index) => {
  //         expect(user['id']).toBeDefined();
  //         expect(user['firstname']).toBeDefined();
  //         expect(user['lastname']).toBeDefined();
  //         expect(user['email']).toBeDefined();
  //         expect(user['password_digest']).toBeDefined();
  //       });

  //       logTestFinish(specUserStore, describeIndexMethod, itDescription);
  //     } catch (err: unknown) {
  //       logTestError(specUserStore, describeIndexMethod, itDescription, err);
  //       throw err;
  //     }
  //   });
  // });

  // const describeShowMethod = 'show method';
  // describe(describeShowMethod, () => {
  //   const itDescription = 'should fetch a specific user by ID';
  //   it(itDescription, async () => {
  //     try {
  //       logger.warn(
  //         `${specUserStore} - ${describeShowMethod}: ${itDescription} - started`
  //       );
  //       const userId = '1';
  //       logger.info(`UserId: ${userId}`);
  //       const user: User = await userStore.show(userId);

  //       logger.info(`Result of userStore.show: ${JSON.stringify(user)}`);
  //       expect(typeof user).toBe('object');

  //       const expectedProperties: (keyof User)[] = [
  //         'id',
  //         'firstname',
  //         'lastname',
  //         'email',
  //         'password_digest',
  //       ];
  //       expectedProperties.forEach((property: keyof User) => {
  //         expect(user[property]).toBeDefined();
  //       });
  //       logger.warn(
  //         `${specUserStore} - ${describeShowMethod}: ${itDescription} - successfully finished`
  //       );
  //     } catch (err) {
  //       logger.error(
  //         `${specUserStore} - ${describeShowMethod}: ${itDescription} - failed: ${err}`
  //       );
  //     }
  //   });
  // });

  // const describeCreateMethod = 'create method';
  // describe(describeCreateMethod, () => {
  //   const itDescription = 'should create a new user';
  //   it(itDescription, async () => {
  //     try {
  //       logger.warn(
  //         `${specUserStore} - ${describeCreateMethod}: ${itDescription} - started`
  //       );
  //       const date = new Date();
  //       const newUser = {
  //         firstname: 'Carlos',
  //         lastname: 'Judas',
  //         email: 'carlos@gmail.com',
  //         password_digest: '1234',
  //       };
  //       const createdUser: User = await userStore.create(newUser);

  //       expect(createdUser.id).toBeDefined();
  //       expect(createdUser.firstname).toBe('Carlos');
  //       expect(createdUser.lastname).toBe('Judas');
  //       expect(createdUser.email).toEqual('carlos@gmail.com');
  //       expect(createdUser.password_digest).toBeDefined();

  //       logger.warn(
  //         `${specUserStore} - ${describeCreateMethod}: ${itDescription} - successfully finished`
  //       );
  //     } catch (err) {
  //       logger.error(
  //         `${specUserStore} - ${describeCreateMethod}: ${itDescription} - failed: ${err}`
  //       );
  //       throw err;
  //     }
  //   });
  // });

  // const describeDeleteMethod = 'delete method';
  // describe(describeDeleteMethod, () => {
  //   const itDescription = 'should delete an user with specific id';
  //   it(itDescription, async () => {
  //     try {
  //       logTestStart(specUserStore, describeDeleteMethod, itDescription);
  //       const userId = '4';
  //       const result = await userStore.delete(userId);
  //       expect(result).toBeNumber();

  //       // if the result is 0, means that the order does not exist... If it is one, means that it exist and it was deleted.
  //       expect(result).toBeGreaterThanOrEqual(0);
  //     } catch (err) {
  //       logger.error(
  //         `${specUserStore} - ${describeDeleteMethod}: ${itDescription} - failed  ${err}`
  //       );
  //       throw err;
  //     }
  //   });
  // });

  // const describeUpdateMethod = 'update method';
  // describe(describeUpdateMethod, () => {
  //   const itDescription = 'should update a specific user by an ID';
  //   it(itDescription, async () => {
  //     try {
  //       logger.warn(
  //         `${specUserStore} - ${describeUpdateMethod}: ${itDescription} - started`
  //       );
  //       const userId = '1';

  //       const updateUser = {
  //         firstname: 'John',
  //         lastname: 'Doe',
  //         email: 'john.doe@yahoo.com',
  //         password_digest: '123456789',
  //       };

  //       const updatedUser: QueryResult = await userStore.update(userId, updateUser);

  //       expect(updatedUser.rowCount).toBe(1);
  //     } catch (err) {
  //       logger.error(
  //         `${specUserStore} - ${describeUpdateMethod}: ${itDescription} - failed: ${err}`
  //       );
  //     }
  //   });
  // });

  /**
   * STOPPED HERE
   */
  const describeAuthenticateMethod = 'authenticate method';
  describe(describeAuthenticateMethod, () => {
    const itDescription = 'should authenticate an user with email and password';
    it(itDescription, async () => {
      try {
        logger.warn(
          `${specUserStore} - ${describeAuthenticateMethod}: ${itDescription} - started`
        );

        //123456 is equal or should be equal the password saved in the create-user-table
        const login = {
          email: 'john.doe@example.com',
          password: '123456',
        };

        const authenticate: User | null = await userStore.authenticate(login);

        expect(authenticate?.email).toEqual('john.doe@example.com');
        expect(authenticate?.firstname).toEqual('John');
        expect(authenticate?.lastname).toEqual('Doe');
        expect(authenticate?.password_digest).toEqual(
          '$2b$10$34vVRl6sVjGtf1YTXd8q7ea7LvcWMMyum6s98GaDB5Eb51AQ6ns5m'
        );

        logger.warn(JSON.stringify(authenticate));
      } catch (err) {
        logger.error(
          `${specUserStore} - ${describeAuthenticateMethod}: ${itDescription} - failed: ${err}`
        );
      }
    });
  });

  // const describeOrderByUserMethod = 'currentOrderByUser method';
  // describe(describeOrderByUserMethod, () => {
  //   const itDescription = 'should fetch active orders for a user';
  //   it(itDescription, async () => {
  //     try {
  //       logger.warn(
  //         `${specUserStore} - ${describeOrderByUserMethod}: ${itDescription} - started`
  //       );
  //       const userId = '1';
  //       const status = 'active';
  //       const orders = await userStore.currentOrderByUser(userId, status);
  //       logger.warn(`result of order: ${JSON.stringify(orders)}`);

  //       expect(Array.isArray(orders)).toBe(true);
  //       expect(orders.length).toBeGreaterThan(0);

  //       expect(orders[0].id).toBe(1);
  //       expect(Number(orders[0].quantity)).toEqual(10);
  //       expect(orders[0].order_status).toBe('active');
  //       expect(Number(orders[0].product_id)).toBe(1);
  //       expect(Number(orders[0].user_id)).toBe(1);

  //       logger.warn(
  //         `${specUserStore} - ${describeOrderByUserMethod}: ${itDescription} - successfully finished`
  //       );
  //     } catch (err) {
  //       logger.error(
  //         `${specUserStore} - ${describeOrderByUserMethod}: ${itDescription} - failed: ${err}`
  //       );
  //       throw err;
  //     }
  //   });
  // });
});
