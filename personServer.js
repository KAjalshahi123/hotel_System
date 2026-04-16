const express = require('express');
const app = express();
require('./db');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./module/person');

const personRouter = require('./routes/personRouter');

app.use(express.json());

// log middleware
app.use((req, res, next) => {
    console.log(`${new Date().toLocaleString()} ${req.method} ${req.url}`);
    next();
});

app.use(passport.initialize());

// LOGIN AUTH
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await Person.findOne({ username });

            if (!user) return done(null, false);

            if (user.password !== password) return done(null, false);

            return done(null, user);

        } catch (err) {
            return done(err);
        }
    }
));

// ROUTES
app.use('/person', personRouter);

// LOGIN
app.post('/login',
    passport.authenticate('local', { session: false }),
    (req, res) => {
        res.send("Login success");
    }
);

app.listen(3031, () => {
    console.log("Server running on port 3031");
});