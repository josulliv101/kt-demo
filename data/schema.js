import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  toGlobalId,
} from 'graphql-relay';

import User from './models/User';

var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'User') {
      return User.getUserById(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof User) {
      return GraphQLUser;
    }
    return null;
  }
);

var GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    uid: {
      type: GraphQLString,
      resolve: user => user.uid,
    },
    name: {
      type: GraphQLString,
      resolve: user => user.name.full,
    },
    token: {
      type: GraphQLString,
      resolve: () => 'mytoken123abc',
    }
  },
  interfaces: [nodeInterface],
});

var Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    viewer: {
      type: GraphQLUser,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: (root, {id, uid}) => User.getUserById(uid),
    },
    node: nodeField,
  },
});

export default new GraphQLSchema({
  query: Root,
  //mutation: Mutation,
});