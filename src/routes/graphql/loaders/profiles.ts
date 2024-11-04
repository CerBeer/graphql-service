import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../types/context.js';

import DataLoader from 'dataloader';

export const profilesLoader = (
  info: GraphQLResolveInfo,
  { prisma, dataLoaders }: Context,
) => {
  let dataLoader = dataLoaders.get(info.fieldNodes);
  if (!dataLoader) {
    dataLoader = new DataLoader(async (ids: readonly string[]) => {
      const foundElements = await prisma.profile.findMany({
        where: {
          userId: { in: [...ids] },
        },
      });
      const result = ids.map((id) => foundElements.find((profile) => profile.userId === id));
      return result;
    });
    dataLoaders.set(info.fieldNodes, dataLoader);
  }
  return dataLoader;
};
