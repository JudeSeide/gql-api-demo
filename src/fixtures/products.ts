import { isEmpty } from 'lodash';

export type Product = {
    id: string;
    name: string;
};

const data: Product[] = [
    {
        id: '1',
        name: 'Product 1',
    },
    {
        id: '2',
        name: 'Product 2',
    },
    {
        id: '3',
        name: 'Product 3',
    },
    {
        id: '4',
        name: 'Product 4',
    },
    {
        id: '5',
        name: 'Product 5',
    },
];

export const products = {
    find: async (id: string): Promise<Product | null> => {
        console.log('\x1b[34m', `select * from products where id = ${id}`);
        return data.find(product => product.id === id) || null;
    },
    findAll: async (ids?: string[], batched: boolean = false): Promise<(Product | null)[]> => {
        if (isEmpty(ids)) {
            console.log('\x1b[34m', 'select * from products');
            return data;
        }

        console.log('\x1b[34m', 'select * from products where id in', ids);

        if (batched) {
            return ids.map(id => data.find(product => product.id === id) ?? null);
        }

        return data.filter(product => ids.includes(product.id));
    },
};
