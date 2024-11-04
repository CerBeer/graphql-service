/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { Context, RootObject } from "../types/context.js";
import { UserCreate, UserCreateType, UserType } from "../types/user.js";
import { PostCreateType, PostCreate, PostType } from "../types/post.js";
import { ProfileCreate, ProfileCreateType, ProfileType } from "../types/profile.js";

export const rootMutationType = new GraphQLObjectType<RootObject, Context>({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        dto: { type: new GraphQLNonNull(UserCreateType) },
      },
      resolve: async (_obj, { dto }: UserCreate, context) => {
        return context.prisma.user.create({
          data: dto,
        });
      },
    },

    createPost: {
      type: PostType,
      args: {
        dto: { type: new GraphQLNonNull(PostCreateType) },
      },
      resolve: async (_obj, { dto }: PostCreate, context) => {
        return context.prisma.post.create({
          data: dto,
        });
      },
    },

    createProfile: {
      type: ProfileType,
      args: {
        dto: { type: new GraphQLNonNull(ProfileCreateType) },
      },
      resolve: async (_obj, { dto }: ProfileCreate, context) => {
        return context.prisma.profile.create({
          data: dto,
        });
      },
    },
  }
});
