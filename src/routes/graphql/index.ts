import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, GraphQLSchema, parse, validate } from 'graphql';
import { Context } from './types/context.js';
import { rootQueryType } from './queries/query.js';
import { rootMutationType } from './queries/mutation.js';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { body } = req;
      const { query, variables } = body;
      const context: Context = { prisma };

      const graphQLErrors = validate(schema, parse(query), [depthLimit(5)]);
      if (graphQLErrors.length > 0) {
        return { errors: graphQLErrors };
      }
      
      return await graphql({
        schema: schema,
        source: query,
        variableValues: variables,
        contextValue: context,
      });
    },
  });
};

export const schema = new GraphQLSchema({
  query: rootQueryType,
  mutation: rootMutationType,
})

export default plugin;
