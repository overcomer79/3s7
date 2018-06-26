const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const LocalStrategy = require("passport-local").Strategy;

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const keys = require("./keys");
const User = require("../models/user");

// JSON WEB TOKEN STRATEGY
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: keys.jwt.secret
    },
    async (payload, done) => {
      try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);
        // if user doesn't exists, handle it
        if (!user) {
          return done(null, false);
        }
        // Otherwise, return the user
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

// LOCAL STRATEGY
passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    async (email, password, done) => {
      try {
        //find the user for the given email
        const user = await User.findOne({ email });

        //if not, handle it
        if (!user) {
          return done(null, false);
        }

        //Check if the password is correct
        const isMatch = await user.isValidPassword(password);
        //if not, handel it
        if (!isMatch) {
          return done(null, false);
        }
        //otherwiese, return the user
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

/*
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.jwt.secret;
//opts.issuer = "accounts.examplesoft.com";
//opts.audience = "yoursite.net";
passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.getUserById({ id: jwt_payload._doc._id }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);
*/

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/oauth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      /*
      console.log("passport callback fired");
      console.log(profile);
      */
      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          console.log("user is", currentUser);
          done(null, currentUser);
        } else {
          new User({
            username: profile.displayName,
            googleId: profile.id
          })
            .save()
            .then(newUser => {
              console.log("new user created", newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
