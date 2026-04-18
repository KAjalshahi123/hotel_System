const express = require('express');
const app = express();
require('./db');

const passport = require('./auth'); // ✅ IMPORTANT

const personRouter = require('./routes/personRouter');

app.use(express.json());

// middleware
app.use((req, res, next) => {
    console.log(`${new Date().toLocaleString()} ${req.method} ${req.url}`);
    next();
});

app.use(passport.initialize());

// LOGIN
app.post('/login',
    passport.authenticate('local', { session: false }),
    (req, res) => {
        res.send("Login success");
    }
);

// CRUD ROUTES
//app.use('/person', personRouter);
app.use('/person', 
    passport.authenticate('local', { session: false }), 
    personRouter
);
app.listen(3031, () => {
    console.log("Server running on port 3031");
});