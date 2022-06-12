import LocalStrategy from "passport-local";
import { UserModel } from "../models/userSchema";
import bcrypt from "bcrypt";
import logger from "../config/winston";
import passport from "passport";

passport.use(
  new LocalStrategy((username: string, password: string, done) => {
    UserModel.findOne({ username: username }, async (err, user) => {
      if (err) {
        logger.error(err);
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (await bcrypt.compare(password, user.hash)) {
        logger.info(`${user.username} Logged In`);
        return done(null, { id: user._id.toString(), username: user.username, image: user.image });
      } else {
        logger.warn(`${user.username} Login Atempt, Incorrect password`);
        return done(null, false);
      }
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id);
  done(null, { id: user._id.toString(), username: user.username, image: user.image });
});
