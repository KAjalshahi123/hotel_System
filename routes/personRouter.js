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

// POST (save)
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

// const express = require('express');
// const router = express.Router();
// const Person = require('../module/person');

// // middleware
// router.use((req, res, next) => {
//     console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
//     next();
// });

// // GET all
// router.get('/', async (req, res) => {
//     try {
//         const people = await Person.find();
//         res.json(people);
//     } catch (err) {
//         res.status(500).send("Error fetching data");
//     }
// });

// // GET by work
// router.get('/work/:worktype', async (req, res) => {
//     try {
//         const worktype = req.params.worktype;
//         const valid = ['developer', 'designer', 'manager'];

//         if (!valid.includes(worktype)) {
//             return res.status(400).send("Invalid work type");
//         }

//         const data = await Person.find({ work: worktype });
//         res.json(data);

//     } catch (err) {
//         res.status(500).send("Error fetching data");
//     }
// });

// // POST
// router.post('/', async (req, res) => {
//     try {
//         const newPerson = new Person(req.body);
//         const saved = await newPerson.save();
//         res.status(201).json(saved);
//     } catch (err) {
//         res.status(500).send("Error saving");
//     }
// });

// // PUT
// router.put('/:id', async (req, res) => {
//     try {
//         const updated = await Person.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true, runValidators: true }
//         );

//         if (!updated) {
//             return res.status(404).send("Not found");
//         }

//         res.json(updated);

//     } catch (err) {
//         res.status(500).send("Error updating");
//     }
// });

// // DELETE
// router.delete('/:id', async (req, res) => {
//     try {
//         const deleted = await Person.findByIdAndDelete(req.params.id);

//         if (!deleted) {
//             return res.status(404).send("Not found");
//         }

//         res.json(deleted);

//     } catch (err) {
//         res.status(500).send("Error deleting");
//     }
// });

// module.exports = router;