import LocalStrategy from "passport-local";
import { UserModel } from "../models/userSchema";
import bcrypt from "bcrypt";
import logger from "../config/winston";
import passport from "passport";

// passportjs middleware function to authenticate user when loggin in
// req.login also calls this same function
passport.use(
  new LocalStrategy((username: string, password: string, done) => {
    // call mongoose query to check if username exists in database
    UserModel.findOne({ username: username }, async (err, user) => {
      // if error for some reason, break
      if (err) {
        logger.error(err);
        return done(err);
      }
      // if user is not found, break
      if (!user) {
        return done(null, false);
      }
      // when user is found, call bcrypt to try to compare provided password to hash
      if (await bcrypt.compare(password, user.hash)) {
        logger.info(`${user.username} Logged In`);
        return done(null, { id: user._id.toString(), username: user.username, image: user.image });
      } else {
        // if it fails, return failed attempt and log user attempt
        logger.warn(`${user.username} Login Atempt, Incorrect password`);
        return done(null, false);
      }
    });
  })
);

// function to add user to session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// function to remove user from session
passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id);
  done(null, { id: user._id.toString(), username: user.username, image: user.image });
});
