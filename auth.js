const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./module/person');

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            console.log("LOGIN:", username, password);

            const user = await Person.findOne({ username });

            if (!user) {
                console.log("User not found");
                return done(null, false);
            }

            if (user.password !== password) {
                console.log("Wrong password");
                return done(null, false);
            }

            console.log("Login success");
            return done(null, user);

        } catch (err) {
            return done(err);
        }
    }
));

module.exports = passport;

// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const Person = require('./module/person');

// passport.use(new LocalStrategy(
//     async (username, password, done) => {
//         try {
//             const user = await Person.findOne({ username });

//             if (!user) return done(null, false);

//             if (user.password !== password) return done(null, false);

//             return done(null, user);

//         } catch (err) {
//             return done(err);
//         }
//     }
// ));

// module.exports = passport;