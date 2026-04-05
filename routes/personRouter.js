const express = require('express');
const router = express.Router();
const Person = require('../module/person');

// Middleware function to log incoming requests
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.url}`);
    next();
}

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

router.put('/:id' , async (req, res) =>{
    try{
        const id = req.params.id;
        const data =  req.body;
        const updatedPerson =  await Person.findByIdAndUpdate(id, data, {
            new :true,
            runValidators: true
        })
        if(!updatedPerson){
            res.status(404).send("Person not found");

        }
        console.log("Person updated:", updatedPerson);
        res.status(200).json(updatedPerson);

    }
    catch(error){
        console.error("Error updating person:", error);
        res.status(500).send("Error updating person");
    }

});

router.delete('/:id', async (req, res) => { 
    try { 
        const id = req.params.id; 

        const deletedPerson = await Person.findByIdAndDelete(id); 

        if (!deletedPerson) { 
            return res.status(404).send("Person not found"); 
        } 

        console.log("Person deleted:", deletedPerson); 
        res.status(200).json(deletedPerson); 

    } catch (error) { 
        console.error("Error deleting person:", error); 
        res.status(500).json({ error: error.message }); 
    } 
});

module.exports = router;