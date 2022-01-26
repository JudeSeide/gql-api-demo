import DataLoader from 'dataloader';
import { Product, products } from './fixtures/products';
import { ProductVariant, variants } from './fixtures/variants';

interface Context {
    loaders: {
        variant: DataLoader<string, ProductVariant>;
    };
}

export const resolvers = {
    Query: {
        productById: async (_: unknown, { id }: { id: string }) => products.find(id),
        products: async (_: unknown, { ids }: { ids?: string[] }) => products.findAll(ids),
    },
    Product: {
        // Without data loader
        variants: async (product: Product) => variants.find(product.id),

        // // With data loader
        // variants: async (parent: Product, _: unknown, { loaders }: Context) => loaders.variant.loadMany([parent.id]),
    }
}