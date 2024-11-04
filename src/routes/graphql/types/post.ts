import { GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";

export const PostType = new GraphQLObjectType<Post>({
  name: 'Post',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString},
    authorId: { type: UUIDType },
  }),
});

export type Post = {
  id: string,
  title: string,
  content: string,
  authorId: string,
};
