import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { MemberType, MemberTypeId } from "./member.js";
import { Context } from "./context.js";
import { memberLoader } from "../loaders/member.js";

export const ProfileType = new GraphQLObjectType<ProfileQuery, Context>({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeId },

    memberType: {
      type: MemberType,
      resolve: ({ memberTypeId }, _args, context, info) => {
        const dataLoader = memberLoader(info, context);
        return dataLoader.load(memberTypeId);
      },
    },
  }),
});


export const ProfileCreateType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeId },
  },
});

export const ProfileChangeType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeId },
  },
});

export type Profile = {
  isMale: boolean,
  yearOfBirth: number,
  userId: string,
  memberTypeId: string,
};

export type ProfileQuery = { id: string } & Profile;

export type ProfileCreate = { dto: Profile }

export type ProfileChange = { dto: Profile }
