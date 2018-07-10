import * as passport from "passport";
import * as LocalStrategy from "passport-local";
import User from "../models/user";

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
