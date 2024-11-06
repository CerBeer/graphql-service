/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "../types/uuid.js";
import { Context, ID, RootObject } from "../types/context.js";
import { MemberType, MemberTypeId } from "../types/member.js";
import { UserType } from "../types/user.js";
import { PostType } from "../types/post.js";
import { ProfileType } from "../types/profile.js";

export const rootQueryType = new GraphQLObjectType<RootObject, Context>({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: async (_obj, _args, context) => {
        return context.prisma.user.findMany();
      },
    },

    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_obj, { id }: ID, context) => {
        return await context.prisma.user.findUnique({
          where: { id },
        });
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async (_obj, _args, context) => {
        return context.prisma.post.findMany();
      },
    },

    post: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_obj, { id }: ID, context) => {
        return await context.prisma.post.findUnique({
          where: { id }
        });
      }
    },

    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (_obj, _args, context) => {
        return context.prisma.profile.findMany();
      },
    },

    profile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_obj, { id }: ID, context) => {
        return await context.prisma.profile.findUnique({
          where: { id }
        });
      },
    },

    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (_obj, _args, context) => {
        return context.prisma.memberType.findMany();
      },
    },

    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeId)},
      },
      resolve: async (_obj, { id }: ID, context) => {
        return await context.prisma.memberType.findUnique({
          where: { id },
        });
      },
    },
  }
});
