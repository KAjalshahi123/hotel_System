const express =  require('express');
const app =  express();
const db = require('./db');
const person = require('./module/person');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Middleware function to log incoming requests
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} Request made to : ${req.url}`);
    next();
}
 app.use(logRequest);
const personRouter = require('./routes/PersonRouter');
app.use('/person', personRouter);

app.listen(3031, () => {
    console.log("Server running on port 3031");
})
