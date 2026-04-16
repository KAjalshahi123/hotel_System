const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/hotel");

const db = mongoose.connection;

db.on('connected', () => {
    console.log("MongoDB connected");
});

db.on('error', (err) => {
    console.log("MongoDB error:", err);
});

module.exports = db;

//const mongoUrl = "mongodb+srv://shahikajal274508_db_user:Qweryt54321@cluster0.ilbvi5z.mongodb.net/hotel";


