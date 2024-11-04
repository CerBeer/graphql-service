import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInputObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { Context } from "./context.js";
import { ProfileType } from "./profile.js";
import { PostType } from "./post.js";
import { profilesLoader } from "../loaders/profiles.js";
import { postsLoader } from "../loaders/posts.js";

export const UserType = new GraphQLObjectType<UserQuery, Context>({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },

    profile: {
      type: ProfileType,
      resolve: async ({ id }, _args, context, info) => {
        const dataLoader = profilesLoader(info, context);
        return dataLoader.load(id);
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async ({ id }, _args, context, info) => {
        const dataLoader = postsLoader(info, context);
        return dataLoader.load(id);
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

export const UserCreateType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat }
  },
});

export const UserChangeType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat }
  },
});

export type User = {
  name: string,
  balance: number,
};

export type UserQuery = { id: string } & User;

export type UserCreate = { dto: User }

export type UserChange = { dto: User }

export type Subscribe = {
  userId: string,
  authorId: string,
}
