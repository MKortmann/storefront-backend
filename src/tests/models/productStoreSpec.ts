import { Product, ProductStore } from '../../models/product';
import { logger, logTestStart, logTestFinish, logTestError } from '../../logger';
import 'jasmine-expect';

const specProductStore = 'productStoreSpec.ts';

describe(specProductStore, () => {
  let productStore = new ProductStore();

  beforeAll(() => {
    logger.warn('Model Test: Product');
  });

  beforeEach(() => {});

  afterAll(() => {});

  const describeIndexMethod = 'index method';
  describe(describeIndexMethod, () => {
    const itDescription = 'should fetch products and have the expected properties';
    it(itDescription, async () => {
      try {
        logTestStart(specProductStore, describeIndexMethod, itDescription);
        const products = await productStore.index();
        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBeGreaterThan(0);
        expect(products[0].id).toBe(1);
        expect(products[0].name).toBe('Milk and Honey');
        expect(Number(products[0].price)).toBe(9.99);
        expect(products[0].category).toBe('Book');
        expect(products[0].url).toBe(
          'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        );
        expect(products[0].description).toBe('You can read it!');

        products.forEach((product) => {
          expect(product.id).toBeDefined;
          expect(product.name).toBeDefined;
          expect(Number(product.price)).toBeDefined;
          expect(product.category).toBeDefined;
        });
        logTestFinish(specProductStore, describeIndexMethod, itDescription);
      } catch (err: unknown) {
        logTestError(specProductStore, describeIndexMethod, itDescription, err);
        throw err;
      }
    });
  });

  const describeShowMethod = 'show method';
  describe(describeShowMethod, () => {
    const itDescription = 'should fetch a specific product by ID';
    it(itDescription, async () => {
      try {
        logger.warn(
          `${specProductStore} - ${describeShowMethod}: ${itDescription} - started`
        );
        const productId = '1';
        logger.info(`ProductId: ${productId}`);
        const product: Product = await productStore.show(productId);

        logger.info(`Result of productStore.show: ${JSON.stringify(product)}`);
        expect(typeof product).toBe('object');

        const expectedProperties: (keyof Product)[] = [
          'id',
          'name',
          'price',
          'url',
          'description',
          'category',
        ];
        expectedProperties.forEach((property: keyof Product) => {
          expect(product[property]).toBeDefined();
        });
        logger.warn(
          `${specProductStore} - ${describeShowMethod}: ${itDescription} - successfully finished`
        );
      } catch (err) {
        logger.error(
          `${specProductStore} - ${describeShowMethod}: ${itDescription} - failed: ${err}`
        );
      }
    });
  });

  const describeCreateMethod = 'create method';
  describe(describeCreateMethod, () => {
    const itDescription = 'should create a new product';
    it(itDescription, async () => {
      try {
        logger.warn(
          `${specProductStore} - ${describeCreateMethod}: ${itDescription} - started`
        );
        const date = new Date();
        const newProduct: Product = {
          name: 'LG TV',
          price: 2000,
          url: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          description: 'LG 85, 4k resolution',
          category: 'Electronics',
        };

        const createdProduct: Product = await productStore.create(newProduct);

        expect(createdProduct.id).toBeDefined();
        expect(createdProduct.name).toBe('LG TV');
        expect(Number(createdProduct.price)).toBe(2000);
        expect(createdProduct.category).toBe('Electronics');
        expect(createdProduct.url).toBe(
          'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        );
        expect(createdProduct.description).toBe('LG 85, 4k resolution');

        logger.warn(
          `${specProductStore} - ${describeCreateMethod}: ${itDescription} - successfully finished`
        );
      } catch (err) {
        logger.error(
          `${specProductStore} - ${describeCreateMethod}: ${itDescription} - failed: ${err}`
        );
        throw err;
      }
    });
  });

  const describeDeleteMethod = 'delete method';
  describe(describeDeleteMethod, () => {
    const itDescription = 'should delete a product with specific id';
    it(itDescription, async () => {
      try {
        logTestStart(specProductStore, describeDeleteMethod, itDescription);
        const productId = '4';
        const result = await productStore.delete(productId);
        logger.warn(`Deleting -> ${JSON.stringify(result)}`);
        expect(result).toBeNumber();
        expect(result).toBeGreaterThanOrEqual(0);
      } catch (err) {
        logger.error(
          `${specProductStore} - ${describeDeleteMethod}: ${itDescription} - failed: ${err}`
        );
        throw err;
      }
    });
  });

  const describeProductByCategory = 'decribeProductByCategory';
  describe(describeProductByCategory, () => {
    const itDescription = 'should fetch product by category';
    it(itDescription, async () => {
      try {
        logger.warn(
          `${specProductStore} - ${describeProductByCategory}: ${itDescription} - started`
        );
        const userId = '1';
        const status = 'active';
        const products = await productStore.showByCategory('Electronics');
        logger.warn(`result of product by category: ${JSON.stringify(products)}`);

        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBeGreaterThan(0);
        products.forEach((item) => {
          expect(item.id).toBeDefined();
          expect(item.name).toBeDefined();
          expect(item.price).toBeDefined();
          expect(item.category).toBeDefined();
          expect(item.url).toBeDefined();
          expect(item.description).toBeDefined();
        });
        logger.warn(
          `${specProductStore} - ${describeProductByCategory}: ${itDescription} - successfully finished`
        );
      } catch (err) {
        logger.error(
          `${specProductStore} - ${describeProductByCategory}: ${itDescription} - failed: ${err}`
        );
        throw err;
      }
    });
  });

  const describeShowTopProducts = 'show top products';
  describe(describeShowTopProducts, () => {
    const itDescription = 'should show top X products';
    it(itDescription, async () => {
      try {
        logTestStart(specProductStore, describeShowTopProducts, itDescription);
        const productId = '1';
        const products = await productStore.showTopProducts(5);
        logger.warn(`show top products -> ${JSON.stringify(products)}`);
        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBeGreaterThan(0);
        expect(products[0].name).toBeDefined();
        expect(Number(products[0].quantity)).toBeGreaterThanOrEqual(20);
      } catch (err) {
        logger.error(
          `${specProductStore} - ${describeShowTopProducts}: ${itDescription} - failed: ${err}`
        );
        throw err;
      }
    });
  });
});
