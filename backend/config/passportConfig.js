const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

var Users = mongoose.model("Users");

passport.use(
	new localStrategy({ usernameField: "email" }, (username, password, done) => {
		Users.findOne({ email: username }, (err, user) => {
			if (err) return done(err);
			else if (!user)
				return done(null, false, { message: "Email is not registered" });
			else if (!user.verifyPassword(password))
				return done(null, false, { message: "Wrong password." });
			else return done(null, user);
		}).populate("_id");
	})
);
