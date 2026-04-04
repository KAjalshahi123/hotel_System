// const mongoose = require('mongoose');

// const mongoUrl = "mongodb://127.0.0.1:27017/hotel";

// // set up mongoose connection
// mongoose.connect(mongoUrl);

// // get the default connection
// const db = mongoose.connection;

// // correct event name
// db.on('connected', () => {
//     console.log('MongoDB connection successful');
// });

// db.on('error', (err) => {
//     console.error('MongoDB connection error:', err);
// });

// db.on('disconnected', () => {
//     console.log('MongoDB connection disconnected');
// });

// // export the connection
// module.exports = db;


const mongoose = require('mongoose');
const mongoUrl = "mongodb://127.0.0.1:27017/hotel";

//const mongoUrl = "mongodb+srv://shahikajal274508_db_user:Qweryt54321@cluster0.ilbvi5z.mongodb.net/hotel";


mongoose.connect(mongoUrl);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB connected');
});

db.on('error', (err) => {
    console.error('MongoDB error:', err);
});

module.exports = db;