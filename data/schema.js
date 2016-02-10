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
    } else if (type === 'Profile') {
      console.log("####", id);
      return User.getProfileById(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof User) {
      return GraphQLUser;
    } else if (obj instanceof Profile) {
      return GraphQLProfile;
    }
    return null;
  }
);

var GraphQLProfile = new GraphQLObjectType({
  name: 'Profile',
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
  fields: {
    id: globalIdField('User'),
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
        console.log("@@@", user);
       return User.getUserProfile(user.user_id)
      }
    },
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
/*    profile: {
      type: GraphQLProfile,
      args: {
        profile_id: {
          type: GraphQLString
        }
      },
      resolve: (root, {profile_id}) => User.getProfileByProfileId(profile_id),
    },*/
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