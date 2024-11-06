import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../types/context.js';
import DataLoader from 'dataloader';

export const postsLoader = (
  info: GraphQLResolveInfo,
  { prisma, dataLoaders }: Context,
) => {
  let dataLoader = dataLoaders.get(info.fieldNodes);
  if (!dataLoader) {
    dataLoader = new DataLoader(async (ids: readonly string[]) => {
      const foundElements = await prisma.post.findMany({
        where: {
          authorId: { in: [...ids] },
        },
      });
      const result = ids.map((id) => foundElements.filter((post) => post.authorId === id));
      return result;
    });
    dataLoaders.set(info.fieldNodes, dataLoader);
  }
  return dataLoader;
};
