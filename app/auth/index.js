const passport = require('passport');
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const _ = require('lodash');

const config = require('../../config');
const User = require('../model/user');

passport.serializeUser((user, done) => done(null, user || false));

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.session.secret
}, (jwt, done) => {
  try {
    User.find({ _id: jwt.id }, (err, user) => {
      if (err) {
        throw err;
      }

      done(null, _.first(user));
    });
  } catch (err) {
    done(err, false);
  }
}));

const isAuthenticated = passport.authenticate('jwt', { session: false });

module.exports = { passport, isAuthenticated };
