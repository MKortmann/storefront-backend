import { Order, OrderStore } from '../../models/order';
import { logger, logTestStart, logTestFinish, logTestError } from '../../logger';
import 'jasmine-expect';

const specOrderStore = 'orderStoreSpec.ts';

describe(specOrderStore, () => {
  let orderStore = new OrderStore();

  beforeAll(() => {
    logger.warn('Model Test: Order');
  });

  beforeEach(() => {});

  afterAll(() => {});

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
        logTestFinish(specOrderStore, describeIndexMethod, itDescription);
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
        logger.warn(
          `${specOrderStore} - ${describeShowMethod}: ${itDescription} - started`
        );
        const orderId = '1';
        logger.info(`OrderId: ${orderId}`);
        const order: Order = await orderStore.show(orderId);

        logger.info(`Result of orderStore.show: ${JSON.stringify(order)}`);
        expect(typeof order).toBe('object');

        const expectedProperties: (keyof Order)[] = [
          'id',
          'quantity',
          'order_status',
          'created_at',
          'product_id',
          'user_id',
        ];
        expectedProperties.forEach((property: keyof Order) => {
          expect(order[property]).toBeDefined();
        });
        logger.warn(
          `${specOrderStore} - ${describeShowMethod}: ${itDescription} - successfully finished`
        );
      } catch (err) {
        logger.error(
          `${specOrderStore} - ${describeShowMethod}: ${itDescription} - failed: ${err}`
        );
      }
    });
  });

  // const describeCreateMethod = 'create method';
  // describe(describeCreateMethod, () => {
  //   const itDescription = 'should create a new order';
  //   it(itDescription, async () => {
  //     try {
  //       logger.warn(
  //         `${specOrderStore} - ${describeCreateMethod}: ${itDescription} - started`
  //       );
  //       const date = new Date();
  //       const newOrder = {
  //         quantity: 12,
  //         order_status: 'active',
  //         product_id: 1,
  //         user_id: 1,
  //         created_at: date,
  //       };
  //       const createdOrder: Order = await orderStore.create(newOrder);

  //       expect(createdOrder.id).toBeDefined();
  //       expect(createdOrder.quantity).toContain(12);
  //       expect(createdOrder.order_status).toBe('active');
  //       expect(createdOrder.created_at).toEqual(date);
  //       expect(createdOrder.product_id).toContain(1);
  //       expect(createdOrder.user_id).toContain(1);

  //       logger.warn(
  //         `${specOrderStore} - ${describeCreateMethod}: ${itDescription} - successfully finished`
  //       );
  //     } catch (err) {
  //       logger.error(
  //         `${specOrderStore} - ${describeCreateMethod}: ${itDescription} - failed: ${err}`
  //       );
  //       throw err;
  //     }
  //   });
  // });

  // const describeDeleteMethod = 'delete method';
  // describe(describeDeleteMethod, () => {
  //   const itDescription = 'should delete an order with specific id';
  //   it(itDescription, async () => {
  //     try {
  //       logTestStart(specOrderStore, describeDeleteMethod, itDescription);
  //       const orderId = '4';
  //       const result = await orderStore.delete(orderId);
  //       expect(result).toBeNumber();
  //       expect(result).toBeGreaterThanOrEqual(1);
  //     } catch (err) {
  //       logger.error(
  //         `${specOrderStore} - ${describeDeleteMethod}: ${itDescription} - failed: ${err}`
  //       );
  //       throw err;
  //     }
  //   });
  // });

  const describeOrderByUserMethod = 'currentOrderByUser method';
  describe(describeOrderByUserMethod, () => {
    const itDescription = 'should fetch active orders for a user';
    it(itDescription, async () => {
      try {
        logger.warn(
          `${specOrderStore} - ${describeOrderByUserMethod}: ${itDescription} - started`
        );
        const userId = '1';
        const status = 'active';
        const orders = await orderStore.currentOrderByUser(userId, status);
        logger.warn(`result of order: ${JSON.stringify(orders)}`);

        expect(Array.isArray(orders)).toBe(true);
        expect(orders.length).toBeGreaterThan(0);

        expect(orders[0].id).toBe(1);
        expect(Number(orders[0].quantity)).toEqual(10);
        expect(orders[0].order_status).toBe('active');
        expect(Number(orders[0].product_id)).toBe(1);
        expect(Number(orders[0].user_id)).toBe(1);

        logger.warn(
          `${specOrderStore} - ${describeOrderByUserMethod}: ${itDescription} - successfully finished`
        );
      } catch (err) {
        logger.error(
          `${specOrderStore} - ${describeOrderByUserMethod}: ${itDescription} - failed: ${err}`
        );
        throw err;
      }
    });
  });
});
