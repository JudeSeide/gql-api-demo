import DataLoader from 'dataloader';

export type ProductVariant = {
    sku: string;
    size: string;
    stock: number;
    productId: string;
};

const data: ProductVariant[] = [
    {
        sku: '221379M200002',
        size: 'M',
        stock: 10,
        productId: '1',
    },
    {
        sku: '221379M200003',
        size: 'S',
        stock: 8,
        productId: '2',
    },
    {
        sku: '221379M200004',
        size: 'L',
        stock: 5,
        productId: '3',
    },
    {
        sku: '221379M200005',
        size: 'XL',
        stock: 3,
        productId: '4',
    },
    {
        sku: '221379M200006',
        size: 'XXL',
        stock: 2,
        productId: '5',
    },
    {
        sku: '221379M200007',
        size: 'XXXL',
        stock: 1,
        productId: '1',
    },
    {
        sku: '221379M200008',
        size: 'S',
        stock: 0,
        productId: '2',
    },
    {
        sku: '221379M200009',
        size: 'M',
        stock: 20,
        productId: '3',
    },
    {
        sku: '221379M200010',
        size: 'L',
        stock: 10,
        productId: '4',
    },
    {
        sku: '221379M200011',
        size: 'XL',
        stock: 5,
        productId: '5',
    },
    {
        sku: '221379M200012',
        size: 'XXL',
        stock: 3,
        productId: '1',
    },
    {
        sku: '221379M200013',
        size: 'XXXL',
        stock: 2,
        productId: '2',
    },
    {
        sku: '221379M200014',
        size: 'S',
        stock: 1,
        productId: '3',
    },
    {
        sku: '221379M200015',
        size: 'M',
        stock: 0,
        productId: '4',
    },
    {
        sku: '221379M200016',
        size: 'L',
        stock: 10,
        productId: '5',
    },
];

export const variants = {
    find: async (productId: string): Promise<ProductVariant[]> => {
        console.log('\x1b[33m', `select * from product_variants where product_id = ${productId}`);
        return data.filter(variant => variant.productId === productId);
    },
    findAll: async (productIds: string[]): Promise<(ProductVariant | null)[][]> => {
        console.log('\x1b[33m', 'select * from product_variants where product_id in', productIds);
        return productIds.map(productId => data.filter(variant => variant.productId === productId));
    },
};

export const buildProductVariantDataloader = () => new DataLoader<string, (ProductVariant | null)[]>(
    async (keys: ReadonlyArray<string>) => variants.findAll(keys as string[]),
);
