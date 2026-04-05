const express =  require ('express');
const db = require('./db');
const menuRouter = require('./routes/menuRouter');
const Menu = require('./module/Menu');

const app = express();

// Middleware function logging incoming requests
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} Request made to : ${req.url}`);
    next();
}
app.use(logRequest);

app.use('/menu', menuRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
