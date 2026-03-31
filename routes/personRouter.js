const express = require('express');
const router = express.Router();
const Person = require('../module/person');

router.get('/', async (req, res) => {
    try {
        const people = await Person.find();
        res.status(200).json(people);
    }
    catch (error) {
        console.error("Error fetching people from database:", error);
        res.status(500).send("Error fetching people from database");
    }
});

router.get('/:worktype', async(req, res)=>{
    try {
        const worktype = req.params.worktype;
        const validTypes = ['developer', 'designer', 'manager'];

        if(validTypes.includes(worktype)){
            const people = await Person.find({ work: worktype });
            res.status(200).json(people);
        }
        else{
            res.status(400).send("Invalid work type");
        }
    }
    catch (error) {
        console.error("Error fetching people:", error);
        res.status(500).send("Error fetching people");
    }
});

router.post('/', async (req, res) => {
    try{
        const data = req.body;
        const newPerson = new Person(data);
        const savedPerson = await newPerson.save();
        res.status(201).json(savedPerson);
    }
    catch(error){
        console.error("Error saving person:", error);
        res.status(500).send("Error saving person");
    }
});

module.exports = router;