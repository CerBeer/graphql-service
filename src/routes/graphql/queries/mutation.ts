/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { Context, ID, RootObject } from "../types/context.js";
import { UserChange, UserChangeType, UserCreate, UserCreateType, UserType } from "../types/user.js";
import { PostCreateType, PostCreate, PostType, PostChange, PostChangeType } from "../types/post.js";
import { ProfileChange, ProfileChangeType, ProfileCreate, ProfileCreateType, ProfileType } from "../types/profile.js";
import { UUIDType } from "../types/uuid.js";

export const rootMutationType = new GraphQLObjectType<RootObject, Context>({
  name: 'Mutation',
  fields: {
    createUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        dto: { type: new GraphQLNonNull(UserCreateType) },
      },
      resolve: async (_obj, { dto }: UserCreate, context) => {
        return context.prisma.user.create({
          data: dto,
        });
      },
    },

    changeUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(UserChangeType) },
      },
      resolve: async (_obj, { dto, id }: UserChange & ID, context) => {
        return context.prisma.user.update({
          where: { id },
          data: dto,
        });
      },
    },
    
    deleteUser: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_obg, { id }: ID, context) => {
        await context.prisma.user.delete({
          where: {
            id: id,
          },
        });
        return 'User was deleted';
      },
    },

    createPost: {
      type: new GraphQLNonNull(PostType),
      args: {
        dto: { type: new GraphQLNonNull(PostCreateType) },
      },
      resolve: async (_obj, { dto }: PostCreate, context) => {
        return context.prisma.post.create({
          data: dto,
        });
      },
    },

    changePost: {
      type: new GraphQLNonNull(PostType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(PostChangeType) },
      },
      resolve: async (_obj, { dto, id }: PostChange & ID, context) => {
        return context.prisma.post.update({
          where: { id },
          data: dto,
        });
      },
    },

    deletePost: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_obg, { id }: ID, context) => {
        await context.prisma.post.delete({
          where: {
            id: id,
          },
        });
        return 'Post was deleted';
      },
    },

    createProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        dto: { type: new GraphQLNonNull(ProfileCreateType) },
      },
      resolve: async (_obj, { dto }: ProfileCreate, context) => {
        return context.prisma.profile.create({
          data: dto,
        });
      },
    },

    changeProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ProfileChangeType) },
      },
      resolve: async (_obj, { dto, id }: ProfileChange & ID, context) => {
        return context.prisma.profile.update({
          where: { id },
          data: dto,
        });
      },
    },

    deleteProfile: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_obg, { id }: ID, context) => {
        await context.prisma.profile.delete({
          where: {
            id: id,
          },
        });
        return 'Profile was deleted';
      },
    },
  }
});
