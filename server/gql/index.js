const { ApolloServer, gql } = require('apollo-server');
const client = require("../models/knex")

const PREFIX = process.env.MYSQL_TABLE_PREFIX || 'Fall2020_';

const typeDefs = gql`
  
  type Post {
    id: Int
    URL: String
    Text: String
    user: User! # to-one
    comments: [Comment] # to-many
  }
  type Comment {
    id: Int
    content: String
    post: Post! # to-one
    user: User! # to-one
  }
  type User {
    id: Int
    FirstName: String
    LastName: String
  }

  type Query {
    posts: [Post]
    post(id: ID): Post
  }
`;

const resolvers = {
  Query: {
    posts: (_, {}) => client.from(`${PREFIX}Posts`),
    post: (_, { id }) => client.from(`${PREFIX}Posts`).where({ id }).first(),

    },
    Post: {
        user: ({ Owner_id }) => client.from(`${PREFIX}Users`).where({ id: Owner_id }).first(),
        comments: ({ id }) => client.from(`${PREFIX}Comments`).where({ Post_id: id })
      },
      Comment: {
        user: ({ Owner_id }) => client.from(`${PREFIX}Users`).where({ id: Owner_id }).first()
      }  
};

const server = new ApolloServer({ typeDefs, resolvers });

module.exports = server;