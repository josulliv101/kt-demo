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
      // node's will be passing real ids, so can't use friendlier ids like 'user_id'
      return {}
    } else if (type === 'Profile') {
      return User.getProfileById(id);
    } else if (type === 'Campaign') {
      return User.getCampaignById(id);
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
    fname: {
      type: GraphQLString,
      resolve: profile => profile.name.first,
    },
    lname: {
      type: GraphQLString,
      resolve: profile => profile.name.last,
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
    isCustomer: {
      type: GraphQLBoolean,
      resolve: user => user.isCustomer,
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

var GraphQLCampaign = new GraphQLObjectType({
  name: 'Campaign',

  isTypeOf: function(obj) { return !!obj.campaign_id },

  fields: {
    id: globalIdField('Campaign', (obj, info) => {
      return obj.campaign_id;
    }),
    campaign_id: {
      type: GraphQLString,
    },
    owner_id: {
      type: GraphQLString,
    },
    owner: {
      type: GraphQLUser,
      resolve: campaign => {
        //console.log('owner!', campaign.owner_id);
        return User.getUserByUserId(campaign.owner_id)
      }
    },
    location: {
      type: GraphQLString,
      resolve: campaign => campaign.location.full,
    },
    picture: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    }
  },
  interfaces: [nodeInterface],
});

var GraphQLViewer = new GraphQLObjectType({
  name: 'Viewer',

  isTypeOf: function(obj) { return !obj.campaign_id && !obj.profile_id && !obj.user_id },

  fields: {
    id: globalIdField('Viewer'),
    campaigns: {
      type: new GraphQLList(GraphQLCampaign),
      resolve: User.getCampaigns
    },
  },
  interfaces: [nodeInterface],
});

var RootQuery = new GraphQLObjectType({
  name: 'Root',
  fields: {
    viewer: {
      type: GraphQLViewer,
      resolve: (root, {}) => User.getUserByUserId('-1').then(user => ({ id: user.id, user, authenticated: !user.anonymous }))
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
    user: {
      type: GraphQLUser,
      args: {
        user_id: {
          type: GraphQLString
        }
      },
      resolve: (root, {user_id}) => User.getUserByUserId(user_id),
    },
    campaign: {
      type: GraphQLCampaign,
      args: {
        campaign_id: {
          type: GraphQLString
        }
      },
      resolve: (root, {campaign_id}) => User.getCampaignById(campaign_id),
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

var CreateNewCampaignMutation = mutationWithClientMutationId({

  name: 'CreateNewCampaign',

  inputFields: {
    title: {type: GraphQLString },
    description: {type: GraphQLString },
    picture: {type: GraphQLString },
    city: {type: GraphQLString },
    state: {type: GraphQLString },
    owner_id: {type: GraphQLString }
  },
 
  outputFields: {
    success: {
      type: GraphQLString,
      resolve: ({campaign}) => campaign.id
    },
    viewer: {
      type: GraphQLViewer,
      resolve: ({campaign}) => User.getUserByUserId(campaign.owner_id).then(user => ({ id: user.id, user, authenticated: !user.anonymous }))
    }
  },
   
  mutateAndGetPayload: User.addCampaign
 
});

var UpdateProfileMutation = mutationWithClientMutationId({

  name: 'UpdateProfile',

  inputFields: {
    fname: {type: GraphQLString },
    lname: {type: GraphQLString },
    profile_id: {type: GraphQLString },
    user_id: {type: GraphQLString }
  },
 
  outputFields: {
    profile: {
      type: GraphQLProfile,
      resolve: (profile) => profile
    }
  },
   
  mutateAndGetPayload: User.updateProfile
 
});

const RootMutation = new GraphQLObjectType({

  name: "RootMutation",

  fields: () => ({
    createNewUser: CreateNewUserMutation,
    createNewProfile: CreateNewProfileMutation,
    createNewCampaign: CreateNewCampaignMutation,
    updateProfile: UpdateProfileMutation
  })

});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});