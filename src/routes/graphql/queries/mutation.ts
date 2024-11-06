/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { Context, ID, RootObject } from "../types/context.js";
import { Subscribe, UserChange, UserChangeType, UserCreate, UserCreateType, UserType } from "../types/user.js";
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
        const result = await context.prisma.user.delete({
          where: {
            id: id,
          },
        });
        return result.id;
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
        const result = await context.prisma.post.delete({
          where: {
            id: id,
          },
        });
        return result.id;
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
        const result = await context.prisma.profile.delete({
          where: {
            id: id,
          },
        });
        return result.id;
      },
    },

    subscribeTo: {
      type: GraphQLString,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_obj, { userId, authorId }: Subscribe, context) => {
        const result = await context.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            userSubscribedTo: {
              create: {
                authorId: authorId,
              },
            },
          },
        });
        return result.id;
      },
    },

    unsubscribeFrom: {
      type: GraphQLString,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_obj, { userId, authorId }: Subscribe, context) => {
        const result = await context.prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: userId,
              authorId: authorId,
            },
          },
        });
        return result.authorId;
      }
    },
  }
});
