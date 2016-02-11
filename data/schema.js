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
      return User.getUserByUserId(id);
    } else if (type === 'Viewer') {
      return User.getUserByUserId(id).then(user => ({ id: user.id, user, authenticated: !user.anonymous }))
    } else if (type === 'Profile') {
      return User.getProfileById(id);
    }
    return null;
  }
);

var GraphQLProfile = new GraphQLObjectType({
  name: 'Profile',

  isTypeOf: function(obj) { return !!obj.profile_id },

  fields: {
    id: globalIdField('Profile'),
    profile_id: {
      type: GraphQLString,
    },
    owner_id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
      resolve: profile => profile.name.full,
    },
    picture: {
      type: GraphQLString,
    }
  },
  interfaces: [nodeInterface],
});

var GraphQLUser = new GraphQLObjectType({
  name: 'User',

  isTypeOf: function(obj) { return !!obj.user_id },

  fields: {
    id: globalIdField('User', (obj, info) => {
      return obj.user_id;
    }),
    uid: {
      type: GraphQLString,
    },
    user_id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
      resolve: user => user.name.full,
    },
    profile: {
      type: GraphQLProfile,
      resolve: user => {
       return User.getUserProfile(user.user_id)
      }
    },
  },
  interfaces: [nodeInterface],
});

var GraphQLViewer = new GraphQLObjectType({
  name: 'Viewer',

  isTypeOf: function(obj) { return !!obj.user },

  fields: {
    id: globalIdField('Viewer'),
    user: {
      type: GraphQLUser,
      resolve: ({user}) => user,
    },
    authenticated: {
      type: GraphQLBoolean,
      resolve: ({authenticated}) => authenticated,
    },
  },
  interfaces: [nodeInterface],
});

var RootQuery = new GraphQLObjectType({
  name: 'Root',
  fields: {
    viewer: {
      type: GraphQLViewer,
      args: {
        user_id: {
          type: GraphQLString
        }
      },
      resolve: (root, {user_id}) => User.getUserByUserId(user_id).then(user => ({ id: user.id, user, authenticated: !user.anonymous }))
    },
    profile: {
      type: GraphQLProfile,
      args: {
        profile_id: {
          type: GraphQLString
        }
      },
      resolve: (root, {profile_id}) => User.getProfileByProfileId(profile_id),
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

var CreateNewProfileMutation = mutationWithClientMutationId({

  name: 'CreateNewProfile',

  inputFields: {
    fname: {type: GraphQLString },
    lname: {type: GraphQLString },
    picture: {type: GraphQLString },
    profile_id: {type: GraphQLString },
    owner_id: {type: GraphQLString }
  },
 
  outputFields: {
    success: {
      type: GraphQLString,
      resolve: ({profile}) => profile.id
    },
  },
   
  mutateAndGetPayload: User.addProfile
 
});

const RootMutation = new GraphQLObjectType({

  name: "RootMutation",

  fields: () => ({
    createNewUser: CreateNewUserMutation,
    createNewProfile: CreateNewProfileMutation
  })

});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});