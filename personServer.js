const express = require('express');
const app = express();
require('./db');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./module/person');

const personRouter = require('./routes/personRouter');
const authRouter = require('./auth');

app.use(express.json());

// log middleware
app.use((req, res, next) => {
    console.log(`${new Date().toLocaleString()} ${req.method} ${req.url}`);
    next();
});

app.use(passport.initialize());

// LOGIN AUTH

const localAuthRouter = authRouter.authenticate('local', { session: false });
// ROUTES
app.use('/person',  personRouter);


// app.get()

// // LOGIN
app.post('/login',
    authRouter.authenticate('local', { session: false }),
    (req, res) => {
        res.send("Login success");
    }
);

app.listen(3031, () => {
    console.log("Server running on port 3031");

})


