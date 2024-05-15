const LocalStrategy = require("passport-local");
const Users = require("../models/Users");
const Admins = require("../models/Admins");
const products = require("../models/products");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.use("user-local", new LocalStrategy(
    async function (email, password, done) {
        email = email.toLowerCase();
        try {
            let user = await Users.findOne({ email });
            if (!user) {
                return done(null, false);
            }

            if (user.password != password) {
                return done(null, false);
            }
            return done(null, user);
        }
        catch (err) {
            done(err);
        }
    }
)
);

passport.use("admin-local", new LocalStrategy(
    async function (email, password, done) {
        email = email.toLowerCase();
        try {
            let user = await Admins.findOne({ email });
            if (!user) {
                return done(null, false);
            }

            if (user.password !== password) {
                return done(null, false);
            }
            return done(null, user); // Change 'user' to 'admin'
        }
        catch (err) {
            done(err);
        }
    })
);


passport.use(new GoogleStrategy({ //for user
    clientID: "Google client ID",
    clientSecret: "Google client secret",
    callbackURL: "http://localhost:3000/shop/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        console.log("Hello");
        try {
            const user = await Users.findOne({ googleId: profile.id });
            if (user) {
                return done(null, user);
            }

            const newUser = await Users.create({
                googleId: profile.id,
                name: profile.displayName,
                googleAccessToken: accessToken,
                googleImg: profile._json.picture,
            })
            return done(null, newUser);
        }
        catch (err) {
            done(err);
        }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
    try {
        let user = await Users.findOne({ _id: id }).populate("cart.id");
        if (user) {
            return done(null, user);
        }

        user = await Admins.findOne({ _id: id });
        if (user) {
            return done(null, user);
        }
    } catch (err) {
        done(err);
    }
});

module.exports = passport;