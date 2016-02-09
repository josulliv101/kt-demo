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
  }
});

UserSchema.set('toJSON', { getters: true, virtuals: true });
UserSchema.set('toObject', { getters: true, virtuals: true });

UserSchema.virtual('name.full').get(function() {
  var {name} = this;
  return name.first + ' ' + name.last;
});

UserSchema.virtual('uid').get(function() {
  return this.id;
});

let User = mongoose.model('User', UserSchema);

exports.UserSchema = User;

let userAnonymous = new User({ user_id: -1, name: { first: 'Anonymous', last: 'User' }});


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

function getUserByUserId(user_id) {
  console.log('DB::getUserByUserId', user_id);
  return new Promise((resolve, reject) => {

    if (!user_id) return resolve(userAnonymous);

    User.findOne({user_id: user_id}).exec((err,res) => {

        // No user found
        if (!res) return resolve(userAnonymous);

        err ? reject(err) : resolve(res);
    });
  });
}

function getUserById(id) {
  console.log('DB::getUserById', id);
  return new Promise((resolve, reject) => {

    if (!id) return resolve(userAnonymous);

    User.findOne({id:id}).exec((err,res) => {
        err ? reject(err) : resolve(res);
    });
  });
}

function getListOfUsers() {
  return new Promise((resolve, reject) => {
    User.find({}).populate('users').exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
}

exports.getUserById = getUserById;
exports.getUserByUserId = getUserByUserId;
