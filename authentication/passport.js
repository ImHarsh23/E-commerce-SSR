const LocalStrategy = require("passport-local");
const Users = require("../models/Users"); 
const products =  require("../models/products");
const passport = require("passport");


passport.use(new LocalStrategy(
    async function(email, password, done) {
        email = email.toLowerCase();
        try{
            let user = await Users.findOne({email});
            if(!user){
                return done(null, false);
            }

            if(user.password != password){
                return done(null, false);
            }
            return done(null, user);
        }
        catch(err){
            done(err);
        }
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
        let user = await Users.findOne({ _id: id }).populate("cart.id");
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;