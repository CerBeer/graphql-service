import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../types/context.js';

import DataLoader from 'dataloader';

export const membersLoader = (
  info: GraphQLResolveInfo,
  { prisma, dataLoaders }: Context,
) => {
  let dataLoader = dataLoaders.get(info.fieldNodes);
  if (!dataLoader) {
    dataLoader = new DataLoader(async (ids: readonly string[]) => {
      const foundElements = await prisma.memberType.findMany();
      const result = ids.map((id) => foundElements.find((member) => member.id === id));
      return result;
    });
    dataLoaders.set(info.fieldNodes, dataLoader);
  }
  return dataLoader;
};
