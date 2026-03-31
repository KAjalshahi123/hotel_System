const express =  require ('express');
const db = require('./db');
const menuRouter = require('./routes/menuRouter');
const Menu = require('./module/Menu');

const app = express();

app.use('/menu', menuRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
