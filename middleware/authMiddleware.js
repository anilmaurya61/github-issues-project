const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const { JWT_SECRET } = process.env;

passport.use(
  new LocalStrategy(
    { usernameField: "username" },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username });
        console.log(user);
        if (!user || !(await user.verifyPassword(password))) {
            console.log("Invalid username or password");
          return done(null, false, { message: "Invalid username or password" });
        }

        return done(null, user);
      } catch (error) {
        return done("error");
      }
    }
  )
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      
      const user = await User.findById(payload.id);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;