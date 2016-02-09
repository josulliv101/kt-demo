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
    user_id: {
      type: GraphQLString,
      resolve: user => user.user_id,
    },
    name: {
      type: GraphQLString,
      resolve: user => user.name.full,
    }
  },
  interfaces: [nodeInterface],
});

var RootQuery = new GraphQLObjectType({
  name: 'Root',
  fields: {
    viewer: {
      type: GraphQLUser,
      args: {
        user_id: {
          type: GraphQLString
        }
      },
      resolve: (root, {user_id}) => User.getUserByUserId(user_id),
    },
    node: nodeField,
  },
});

var CreateNewUserMutation = mutationWithClientMutationId({

  name: 'CreateNewUser',

  inputFields: {
    fname: {type: GraphQLString },
    lname: {type: GraphQLString },
    email: {type: GraphQLString },
    user_id: {type: GraphQLString }
  },
 
  outputFields: {
    success: {
      type: GraphQLString,
      resolve: ({user}) => user.id
    },
  },
   
  mutateAndGetPayload: User.addUser
 
});

const RootMutation = new GraphQLObjectType({

  name: "RootMutation",

  fields: () => ({
    createNewUser: CreateNewUserMutation
  })

});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});