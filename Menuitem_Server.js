const db = require('./db');
const Menu = require('./module/Menu');

const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server is running");
});

app.get('/menu', async (req, res) => {
    try {
        const menuItems = await Menu.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/menu', async (req, res) => {
    try {
        const data = req.body;

        const newMenuItem = new Menu(data);
        const savedMenuItem = await newMenuItem.save();

        res.status(201).json(savedMenuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const routermen = require('./routes/menuRouter');
app.use('/menu', routermen);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
