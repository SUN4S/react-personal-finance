import LocalStrategy from "passport-local";
import { UserModel } from "../models/userSchema";
import bcrypt from "bcrypt";
import passport from "passport";

passport.use(
  new LocalStrategy(function (username: string, password: string, done) {
    UserModel.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!bcrypt.compare(password, user.hash)) {
        return done(null, false);
      }
      return done(null, { id: user._id.toString() });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id);
  done(null, { id: user._id.toString() });
});
