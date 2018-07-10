import * as passport from "passport";
import * as LocalStrategy from "passport-local";
import * as GooglePlusTokenStrategy from "passport-google-plus-token";
import * as FacebookTokenStrategy from "passport-facebook-token";
import { ExtractJwt, Strategy } from "passport-jwt";


import User from "../models/user";

import * as conf from "../../shared/config/keys";

// JSON WEB TOKEN STRATEGY
passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: conf.keys.jwt.secret
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
  new LocalStrategy.Strategy(
    {
      usernameField: "email"
    },
    async (email: string, password: string, done: any) => {
      try {
        //find the user for the given email
        const user = await User.findOne({ "local.email": email });
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

// GOOGLE OAUTH STRATEGY
passport.use(
  "google",
  new GooglePlusTokenStrategy(
    {
      clientID: conf.keys.google.clientID,
      clientSecret: conf.keys.google.clientSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        /*
        console.log("access token:", accessToken);
        console.log("refresh token:", refreshToken);
        console.log("profile", profile);
        */
        //check if this current user exists in our DB
        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
          console.log("User already exists in our DB");
          return done(null, existingUser);
        }

        //If new account
        console.log("User doesn't exist, we are creating a new one in our DB");
        const newUser = new User({
          method: "google",
          google: {
            id: profile.id,
            email: profile.emails[0].value
          }
        });

        await newUser.save();
        done(null, newUser);
      } catch (err) {
        done(err, false, err.message);
      }
    }
  )
);

// FACEBOOK OAUTH STRATEGY
passport.use(
  "facebook",
  new FacebookTokenStrategy(
    {
      clientID: conf.keys.facebook.clientID,
      clientSecret: conf.keys.facebook.clientSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        /*
        console.log("access token:", accessToken);
        console.log("refresh token:", refreshToken);
        console.log("profile", profile);
        */
        //check if this current user exists in our DB
        const existingUser = await User.findOne({ "facebook.id": profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }

        //If new account
        console.log("User doesn't exist, we are creating a new one in our DB");
        const newUser = new User({
          method: "facebook",
          facebook: {
            id: profile.id,
            email: profile.emails[0].value
          }
        });

        await newUser.save();
        done(null, newUser);
      } catch (err) {
        done(err, false, err.message);
      }
    }
  )
);
