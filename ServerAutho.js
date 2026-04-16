const express = require('express');
const app = express();
const db = require('./db');
const Person = require('./module/person');

const bcrypt = require('bcrypt');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(express.json()); // ✅ IMPORTANT

// 🔹 Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toLocaleString()} Request: ${req.method} ${req.url}`);
    next();
});

// 🔹 Initialize passport
app.use(passport.initialize());


// 🔐 LOCAL STRATEGY (LOGIN)
passport.use(new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' }, // ✅ IMPORTANT
    async (username, password, done) => {
        try {
            console.log("Login attempt:", username);

            const user = await Person.findOne({ username });

            if (!user) {
                return done(null, false, { message: 'User not found' });
            }

            const isMatch = await user.comparePassword(password);

            if (!isMatch) {
                return done(null, false, { message: 'Wrong password' });
            }

            return done(null, user);

        } catch (err) {
            return done(err);
        }
    }
));


// 🟢 REGISTER API (SAVE DATA)
app.post('/person', async (req, res) => {
    try {
        const data = req.body;

        const newUser = new Person(data);
        const savedUser = await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            data: savedUser
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


// 🔐 LOGIN API
app.post('/login',
    passport.authenticate('local', { session: false }),
    (req, res) => {
        res.json({
            message: "Login successful",
            user: req.user.username
        });
    }
);


// 🚀 START SERVER
app.listen(3031, () => {
    console.log("Server running on port 3031");
});