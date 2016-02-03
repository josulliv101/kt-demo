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
  email: String
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

let userAnonymous = new User({ name: { first: 'Anonymous', last: 'User' }});

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
