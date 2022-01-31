import DataLoader from 'dataloader';
import { Product, products } from './fixtures/products';
import { ProductVariant } from './fixtures/variants';

interface Context {
    loaders: {
        product: DataLoader<string, Product>;
        variant: DataLoader<string, ProductVariant>;
    };
}

export const resolvers = {
    Query: {
        // With data loader
        productById: async (_: unknown, { id }: { id: string }, ctx: Context) => ctx.loaders.product.load(id),
        products: async (_: unknown, { ids }: { ids?: string[] }, ctx: Context) =>
            ids ? ctx.loaders.product.loadMany(ids) : products.findAll(ids),
    },
    Product: {
        // With data loader
        variants: async (parent: Product, _: unknown, { loaders }: Context) => loaders.variant.load(parent.id),
    },
}
