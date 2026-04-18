const express = require('express');
const router = express.Router();
const Person = require('../module/person');

// GET all
router.get('/', async (req, res) => {
    const data = await Person.find();
    res.json(data);
});

// GET by work
router.get('/work/:type', async (req, res) => {
    const data = await Person.find({ work: req.params.type });
    res.json(data);
});

// POST
router.post('/', async (req, res) => {
    const newUser = new Person(req.body);
    const saved = await newUser.save();
    res.json(saved);
});

// PUT
router.put('/:id', async (req, res) => {
    const updated = await Person.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
    const deleted = await Person.findByIdAndDelete(req.params.id);
    res.json(deleted);
});

module.exports = router;