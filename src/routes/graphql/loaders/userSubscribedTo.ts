import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../types/context.js';
import DataLoader from 'dataloader';

export const userSubscribedToLoader = (
  info: GraphQLResolveInfo,
  { dataLoaders, prisma }: Context,
) => {
  let dataLoader = dataLoaders.get(info.fieldNodes);
  if (!dataLoader) {
    dataLoader = new DataLoader(async (ids: readonly string[]) => {
      const foundElements = await prisma.user.findMany({
        where: {
          subscribedToUser: {
            some: {
              subscriberId: { in: [...ids] },
            },
          },
        },
        include: {
          subscribedToUser: true,
        },
      });
      const result = ids.map((id) => foundElements.filter((user) => user.subscribedToUser[0].subscriberId === id));
      return result;
    });
    dataLoaders.set(info.fieldNodes, dataLoader);
  }
  return dataLoader;
};
