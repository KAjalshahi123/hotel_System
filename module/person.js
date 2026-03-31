const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: String,
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['developer', 'designer', 'manager'],
        required: true

    },
    mobile:{
        type: String,
        unique: true,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required: true
    }

});

// create a model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
    

