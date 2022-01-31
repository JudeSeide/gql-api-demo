import DataLoader from 'dataloader';
import { Product, products } from './fixtures/products';
import { ProductVariant, variants } from './fixtures/variants';

interface Context {
    loaders: {
        product: DataLoader<string, Product>;
        variant: DataLoader<string, ProductVariant>;
    };
}

export const resolvers = {
    Query: {
        // Without data loader
        productById: async (_: unknown, { id }: { id: string }) => products.find(id),
        products: async (_: unknown, { ids }: { ids?: string[] }) => products.findAll(ids),

        // // With data loader
        // productById: async (_: unknown, { id }: { id: string }, ctx: Context) => ctx.loaders.product.load(id),
        // products: async (_: unknown, { ids }: { ids?: string[] }, ctx: Context) =>
        //     ids ? ctx.loaders.product.loadMany(ids) : products.findAll(ids),
    },
    Product: {
        // Without data loader
        variants: async (parent: Product) => variants.find(parent.id),

        // // With data loader
        // variants: async (parent: Product, _: unknown, { loaders }: Context) => loaders.variant.load(parent.id),
    }
}
