const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// create a schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre("save", async function(next) {
  try {
    console.log("I'm here");
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.password, salt);
    // Re-assign hashed version over original, plain text password
    this.password = passwordHash;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

// create a model
const User = mongoose.model("user", userSchema);
// export the model
module.exports = User;

/*
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  username: String,
  googleId: String
});

const User = mongoose.model("User", userSchema);

module.exports.getUserById = (id, cb) => {
  User.findById(id, cb);
};

module.exports.getUserByEmail = (email, cb) => {
  User.findOne(email, cb);
};

module.exports.createUser = (newUser, cb) => {
    bcrypt.getSalt(10, (err, salt) => { 
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(cb);
        });
    });
};

module.exports.comparePassword = (myPass, hash, cb) => {
    bcrypt.compare(myPass, hash, (err, isMatch) => {
        if(err) throw err;
        cb(null, isMatch);
    });
};
*/
/*
module.exports = mongoose.model('User', userSchema);
*/
