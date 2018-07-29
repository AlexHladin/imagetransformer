const passport = require('passport');
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const config = require('../../config');
// const db = require('../models');

passport.serializeUser((user, done) => done(null, user || false));

passport.deserializeUser(async ({ id }, done) => {
  console.log(id);
  /* let user = await db.User.find({where: {id}});
  if (user) {
      return done(null, {...user.get(), role});
  }
  return done(null, false); */
});

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.session.secret
}, async (jwt, done) => {
  try {
    done(null, { id: jwt.sub, role: jwt.role });
  } catch (err) {
    done(err, false);
  }
}));

const isAuthenticated = passport.authenticate('jwt', { session: false });
const isAuthorized = (action, resource) => [
  isAuthenticated,
  (req, res, next) => {
    console.log(res);
  }
];

module.exports = { passport, isAuthenticated, isAuthorized };
