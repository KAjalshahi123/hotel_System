const express =  require('express');
const app =  express();
const db = require('./db');
const person = require('./module/person');

const bodyParser = require('body-parser');
app.use(bodyParser.json());


const personRouter = require('./routes/PersonRouter');
app.use('/person', personRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});