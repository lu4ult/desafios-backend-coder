import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import UserDao from "../daos/user.dao.js";
const userDao = new UserDao();


const strategyOptions = {
  clientID: "Iv1.8deb3f1d353b54ee",
  clientSecret: "743e932ae7f057579fe656dc441acefb2f33f207",
  callbackURL: "http://localhost:8080/users/github",
};


//Con esto sacamos el error "Failed to deserialize user out of session"
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userDao.getById(id);
  return done(null, user);
});


const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  console.log("registerOrLogin")
  // console.log(profile);
  const email = profile._json.email;
  const user = await userDao.getByEmail(email);

  console.log(email)
  console.log(user)

  if (user) return done(null, user);
  const newUser = await userDao.register({
    first_name: profile._json.name,
    email,
    image: profile._json.avatar_url,
    isGithub: true,
  });


  return done(null, newUser);
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));
