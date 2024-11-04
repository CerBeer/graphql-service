import { GraphQLObjectType, GraphQLEnumType, GraphQLInt, GraphQLFloat  } from "graphql";

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: { value: 'BASIC' },
    BUSINESS: { value: 'BUSINESS' },
  },
});

export const MemberType = new GraphQLObjectType<Member>({
  name: 'MemberType',
  fields: () => ({
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  }),
});

export type Member = {
  id: 'BASIC' | 'BUSINESS',
  discount: number,
  postsLimitPerMonth: number,
};
