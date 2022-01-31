import DataLoader from 'dataloader';
import { Product, products } from './fixtures/products';
import { ProductVariant, variants } from './fixtures/variants';

export const resolvers = {
    Query: {
        // Without data loader
        productById: async (_: unknown, { id }: { id: string }) => products.find(id),
        products: async (_: unknown, { ids }: { ids?: string[] }) => products.findAll(ids),
    },
    Product: {
        // Without data loader
        variants: async (parent: Product) => variants.find(parent.id),
    }
}
