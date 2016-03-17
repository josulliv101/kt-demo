import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: mongoose.Types.ObjectId
  },
  name: {
    first: String,
    last: String
  },
  email: {
    type: String
  },
  user_id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  stripe: {
    customer_id: {
      type: String,
      index: true
    },
    plan: {
      type: String
    },
    last4: {
      type: String
    },
    creditcard: {
      last4: {
        type: String
      }
    }
  }
});

let ProfileSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: mongoose.Types.ObjectId
  },
  name: {
    first: String,
    last: String
  },
  picture: {
    type: String
  },
  profile_id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  owner_id: {
    type: String,
    required: true,
    unique: true,
    index: true
  }
});

let CampaignSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: mongoose.Types.ObjectId
  },
  location: {
    city: String,
    state: String
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  picture: {
    type: String
  },
  owner_id: {
    type: String,
    required: true,
    index: true
  },
  owner: {
    type: String
  }
});

UserSchema.set('toJSON', { getters: true, virtuals: true });
UserSchema.set('toObject', { getters: true, virtuals: true });

ProfileSchema.set('toJSON', { getters: true, virtuals: true });
ProfileSchema.set('toObject', { getters: true, virtuals: true });

CampaignSchema.set('toJSON', { getters: true, virtuals: true });
CampaignSchema.set('toObject', { getters: true, virtuals: true });

UserSchema.virtual('name.full').get(function() {
  var {name} = this;
  return name.first + ' ' + name.last;
});

UserSchema.virtual('type').get(function() {
  return 'User';
});
 
UserSchema.virtual('uid').get(function() {
  return this.id;
});

UserSchema.virtual('isCustomer').get(function() {
  return this.stripe.customer_id;
});

UserSchema.virtual('hasSubscription').get(function() {
  return !!this.stripe.customer_id && !!this.stripe.plan;
});

ProfileSchema.virtual('type').get(function() {
  return 'Profile';
});

ProfileSchema.virtual('name.full').get(function() {
  var {name} = this;
  return name.first + ' ' + name.last;
});

CampaignSchema.virtual('type').get(function() {
  return 'Campaign';
});

CampaignSchema.virtual('location.full').get(function() {
  var {location} = this;
  return location.city + ' ' + location.state;
});

CampaignSchema.virtual('campaign_id').get(function() {
  return this.id;
});

let User = mongoose.model('User', UserSchema);
let Profile = mongoose.model('Profile', ProfileSchema);
let Campaign = mongoose.model('Campaign', CampaignSchema);

exports.UserSchema = User;
exports.ProfileSchema = Profile;
exports.CampaignSchema = Campaign;

let userAnonymous = new User({ user_id: null, name: { first: 'Anonymous', last: 'User' }});
userAnonymous.anonymous = true;


exports.addUser = ({fname, lname, email, user_id}) => {

  var newUser = new User({
    name: {
      first: fname,
      last: lname
    },
    email: email,
    user_id: user_id
  });

  return new Promise((resolve, reject) => {
    
    newUser.save((err, res) => err ? reject(err) : resolve({ user: res  }) );

  });

};

exports.addProfile = ({fname, lname, picture, profile_id, owner_id}) => {

  var newProfile = new Profile({
    name: {
      first: fname,
      last: lname
    },
    picture: picture,
    profile_id: profile_id,
    owner_id: owner_id
  });

  return new Promise((resolve, reject) => {
    
    newProfile.save((err, res) => err ? reject(err) : resolve({ profile: res  }) );

  });

};

exports.addCampaign = ({title, description, picture, city, state, owner_id}) => {
  console.log("addCampaign", owner_id);
  var newCampaign = new Campaign({
    location: {
      city: city,
      state: state
    },
    picture: picture,
    title: title,
    description: description,
    owner_id: owner_id
  });

  return new Promise((resolve, reject) => {
    
    newCampaign.save((err, res) => err ? reject(err) : resolve({ campaign: res  }) );

  });

};

exports.updateProfile = ({fname, lname, user_id, profile_id}) => {

  return new Promise((resolve, reject) => {
    Profile.findOne({owner_id: user_id})
           .then((profile) => {
              console.log('updateUser', profile);
              if (fname) profile.name.first = fname;
              if (lname) profile.name.last = lname;
              profile.save((err, res) => err ? reject(err) : resolve(res) );
           })
  });
}

exports.addCustomer = ({user_id, customer_id, email, plan, last4, currency}) => {

  return new Promise((resolve, reject) => {
    User.findOne({user_id: user_id})
           .then((user) => {
              console.log('addCustomer', user);
              user.stripe.customer_id = customer_id;
              user.stripe.last4 = last4;
              user.stripe.currency = currency;
              user.stripe.plan = plan;
              user.email = email;
              user.save((err, res) => err ? reject(err) : resolve(res) );
           })
  });
}
/*  let modify = {};

  console.log('updateUser', user_id, fname, lname, profile_id);

  fname ? modify.fname = fname : null;
  lname ? modify.lname = lname : null;
  profile_id ? modify.profile_id = profile_id : null;
  
  return new Promise((resolve, reject) => {
    Profile.update({owner_id: user_id}, modify, (err, res) => {
      //res.id = id;
      console.log('response', getUserProfile(user_id));
      err ? reject(err) : resolve(getUserProfile(user_id));
    });
  });*/
 

function getProfileByProfileId(profile_id) {
  //console.log('DB::getProfileByProfileId', profile_id);
  return new Promise((resolve, reject) => {

    if (!profile_id) return resolve(null);

    Profile.findOne({profile_id: profile_id}).exec((err,res) => {
        
        //console.log('...results profile', res && res.profile_id);

        // No user found
        if (!res) return resolve(null);
        
        

        err ? reject(err) : resolve(res);
    });
  });
}

function getUserProfile(user_id) {
  //console.log('DB::getUserProfile', user_id);
  return new Promise((resolve, reject) => {

    if (!user_id) return resolve(null);

    Profile.findOne({owner_id: user_id}).exec((err,res) => {
        
        //console.log('DB::getUserProfile results', res);

        // No profile found
        if (!res) return resolve(null);
        
        //console.log('DB::getUserProfile RESOLVE', err, res);

        err ? reject(err) : resolve(res);
    });
  });
}

function getUserByUserId(user_id) {
  //console.log('DB::getUserByUserId', user_id);
  return new Promise((resolve, reject) => {

    if (!user_id) return resolve(userAnonymous);

    User.findOne({user_id: user_id}).exec((err,res) => {
        
        //console.log('DB::getUserByUserId results', res);

        // No user found
        if (!res) return resolve(userAnonymous);

        err ? reject(err) : resolve(res);
    });
  });
}

function getCampaignById(id) {
  //console.log('DB::getProfileById', id);
  return new Promise((resolve, reject) => {

    if (!id) return resolve(null);

    Campaign.findOne({id:id}).exec((err,res) => {
        err ? reject(err) : resolve(res);
    });
  });
}

function getProfileById(id) {
  //console.log('DB::getProfileById', id);
  return new Promise((resolve, reject) => {

    if (!id) return resolve(null);

    Profile.findOne({id:id}).exec((err,res) => {
        err ? reject(err) : resolve(res);
    });
  });
}

function getUserById(id) {
  //console.log('DB::getUserById', id);
  return new Promise((resolve, reject) => {

    if (!id) return resolve(userAnonymous);

    User.findOne({id:id}).exec((err,res) => {
        err ? reject(err) : resolve(res);
    });
  });
}

function getListOfCampaigns() {
  return Campaign.find({});
}

function getListOfUsers() {
  return new Promise((resolve, reject) => {
    User.find({}).populate('users').exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
}

exports.getCampaigns = getListOfCampaigns;
exports.getUserById = getUserById;
exports.getProfileById = getProfileById;
exports.getCampaignById = getCampaignById;
exports.getUserProfile = getUserProfile;
exports.getUserByUserId = getUserByUserId;
exports.getProfileByProfileId = getProfileByProfileId;

