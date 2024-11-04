import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { Context } from "./context.js";
import { ProfileType } from "./profile.js";
import { PostType } from "./post.js";

export const UserType = new GraphQLObjectType<User, Context>({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },

    profile: {
      type: ProfileType,
      resolve: async ({ id }, _args, context) => {
        return await context.prisma.profile.findUnique({
          where: { userId: id },
        });
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async ({ id }, _args, context) => {
        return context.prisma.post.findMany({
          where: { authorId: id },
        });
      },
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }, _args, context) => {
        return context.prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: id,
              },
            },
          },
        });
      },
    },

    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }, _args, context) => {
        return context.prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: id,
              },
            },
          },
        });
      },
    },

  }),
});

export type User = {
  id: string,
  name: string,
  balance: number,
};
