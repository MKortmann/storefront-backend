import { Order, OrderStore } from '../../models/order';
import { logger, logTestStart, logTestFinish, logTestError } from '../../logger';
import 'jasmine-expect';

const specOrderStore = 'orderStoreSpec.ts';

describe(specOrderStore, () => {
  // let orderStore;
  let orderStore = new OrderStore();

  beforeAll(() => {
    // Initialize or mock any necessary resources before running the tests
    //@ts-ignoreö
    logger.warn('Model Test: Order');
  });

  beforeEach(() => {});

  afterAll(() => {
    // Clean up or release any resources after running all tests
  });

  const describeIndexMethod = 'index method';
  describe(describeIndexMethod, () => {
    const itDescription = 'should fetch orders and have the expected properties';
    it(itDescription, async () => {
      try {
        logTestStart(specOrderStore, describeIndexMethod, itDescription);
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
        logTestFinish(specOrderStore, describeIndexMethod,  itDescription);
      } catch (err: unknown) {
        logTestError(specOrderStore, describeIndexMethod, itDescription, err);
        throw err;
      }
    });
  });

  const describeShowMethod = 'show method';
  describe(describeShowMethod, () => {
    const itDescription = 'should fetch a specific order by ID';
    it(itDescription, async () => {
      try {
        logger.warn(`${specOrderStore} - ${describeShowMethod}: ${itDescription} - started`)
        const orderId = '1';
        const order: Order = await orderStore.show(orderId);
        logger.info(`${JSON.stringify(order)}`)
        expect(typeof order).toBe('object');


        const expectedProperties: (keyof Order)[] = ['id','quantity','order_status', 'created_at','product_id','user_id' ]
        expectedProperties.forEach((property: keyof Order) => {
          expect(order[property]).toBeDefined();
        });
        logger.warn(`${specOrderStore} - ${describeShowMethod}: ${itDescription} - successfully finished`)
      } catch (err) {
        logger.error(`${specOrderStore} - ${describeShowMethod}: ${itDescription} - failed: ${err}`)
      }
    });
  });

  // // Add more describe blocks for other methods like create, delete, currentOrderByUser, etc.

  const describeCreateMethod = "create method"
  describe(describeCreateMethod, () => {
    const itDescription = 'should create a new order';
    it(itDescription, async () => {
      try {
        logger.warn(`${specOrderStore} - ${describeCreateMethod}: ${itDescription} - started`)
        const date = new Date();
        const newOrder = {
          "quantity": 12,
          "order_status": "active",
          "product_id": 1,
          "user_id": 1,
          "created_at": date,
        };
        const createdOrder: Order = await orderStore.create(newOrder);

            expect(createdOrder.id).toBeDefined();
            expect(createdOrder.quantity).toContain(12)
            expect(createdOrder.order_status).toBe("active");
            expect(createdOrder.created_at).toEqual(date);
            expect(createdOrder.product_id).toContain(1);
            expect(createdOrder.user_id).toContain(1)

        logger.warn(`${specOrderStore} - ${describeCreateMethod}: ${itDescription} - successfully finished`)
      } catch(err) {
        logger.error(`${specOrderStore} - ${describeCreateMethod}: ${itDescription} - failed: ${err}`)
        throw err;

      }
    });
  });

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
