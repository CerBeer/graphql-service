import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../types/context.js';
import DataLoader from 'dataloader';

export const subscribedToUserLoader = (
  info: GraphQLResolveInfo,
  { dataLoaders, prisma }: Context,
) => {
  let dataLoader = dataLoaders.get(info.fieldNodes);
  if (!dataLoader) {
    dataLoader = new DataLoader(async (ids: readonly string[]) => {
      const foundElements = await prisma.user.findMany({
        where: {
          userSubscribedTo: {
            some: {
              authorId: { in: [...ids] },
            },
          },
        },
        include: {
          userSubscribedTo: true,
        },
      });
      const subscribes = ids.map((id) => foundElements.filter((user) => user.userSubscribedTo[0].authorId === id));
      return subscribes;
    });
    dataLoaders.set(info.fieldNodes, dataLoader);
  }
  return dataLoader;
};
