import { OrderStore } from '../../models/order';
import { logger } from '../../logger';

describe('OrderStore', () => {
  // let orderStore;
  let orderStore = new OrderStore();

  beforeAll(() => {
    // Initialize or mock any necessary resources before running the tests
    //@ts-ignoreö
    // logger.warn('Model Test: Order');
  });

  beforeEach(() => {});

  afterAll(() => {
    // Clean up or release any resources after running all tests
  });

  describe('index method', () => {
    const test = 'should fetch orders and have the expected properties';
    it(test, async () => {
      try {
        // logger.warn(`Test: index method: ${test}`);
        const orders = await orderStore.index();
        expect(Array.isArray(orders)).toBe(true);
        expect(orders.length).toBeGreaterThan(0);
        orders.forEach((order) => {
          expect(order.id).toBeDefined();
          expect(order.quantity).toBeDefined();
          expect(order.order_status).toBeDefined();
          expect(order.created_at).toBeDefined();
          expect(order.product_id).toBeDefined();
          expect(order.user_id).toBeDefined();
        });
        // logger.warn(`Index method test passed successfully`);
      } catch (err) {
        // logger.error(`Index method test failed: ${err}`);
        throw err;
      }
    });
  });

  // describe('show method', () => {
  //   it('should fetch a specific order by ID', async () => {
  //     const orderId = '1';
  //     const order = await orderStore.show(orderId);
  //     // Add expectations here based on the expected behavior of the show method
  //   });
  // });

  // // Add more describe blocks for other methods like create, delete, currentOrderByUser, etc.

  // describe('create method', () => {
  //   it('should create a new order', async () => {
  //     const newOrder = {
  //       /* Provide necessary order data for testing */
  //     };
  //     const createdOrder = await orderStore.create(newOrder);
  //     // Add expectations here based on the expected behavior of the create method
  //   });
  // });

  // describe('delete method', () => {
  //   it('should delete a specific order by ID', async () => {
  //     const orderId = '1';
  //     const deletedCount = await orderStore.delete(orderId);
  //     // Add expectations here based on the expected behavior of the delete method
  //   });
  // });

  // describe('currentOrderByUser method', () => {
  //   it('should fetch active orders for a user', async () => {
  //     const userId = '1';
  //     const status = 'active';
  //     const orders = await orderStore.currentOrderByUser(userId, status);
  //     // Add expectations here based on the expected behavior of the currentOrderByUser method
  //   });
  // });
});
