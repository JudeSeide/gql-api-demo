import { ApolloServer, gql } from 'apollo-server';
import { readFileSync } from 'fs';
import { resolvers } from './resolvers';
import { buildProductVariantDataloader } from './fixtures/variants';

const schema = `${__dirname}/schema.graphql`;
const typeDefs = gql`${readFileSync(schema, 'utf8')}`;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    tracing: true,
    introspection: true,
    context: () => ({
        loaders: {
            variant: buildProductVariantDataloader(),
        }
    }),
});

server.listen(4004)
    .then(({ url }) => {
        console.log('\x1b[36m%s\x1b[0m', `🚀 Server ready at ${url}`);
    })
    .catch((error) => {
        console.log('\x1b[31m', `🤦🏽 Failed to start sever: ${error}`);
    });
