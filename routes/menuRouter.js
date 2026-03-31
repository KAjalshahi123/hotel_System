const express =  require('express');
const router =  express.Router();
const Menu = require('../module/Menu');
const db = require('../db');


router.get('/', async(req, res) => {
    try{
        const menuItem =  await Menu.find();
        res.status(200).json(menuItem);
    }
    catch(erroe){
        console.error("Error fetching", error);
        res.status(500).json({ message: error.message });
    }
    });

    router .post('/', async(req, res)=>{
        try{
            const data =  req.body;
            const newMenuItem = new Menu(data);
            const savedMenu = await newMenuItem.save();
            res.status(200).json(savedMenu);
        }
        catch(error){
            console.error("Error saving menu item:", error);
            res.status(500).json({ message: error.message });
        }
    })

    router.get('/:tasty', async (req, res) => {
        try{
            const tastetype =  req.params.tasty;
            if(tastetype === 'spicy'|| tastetype === 'sweet' || tastetype === 'sour'){
                const menuItem  = await Menu.find({taste: tastetype});
                res.status(200).json(menuItem);
            }
            else{
                res.status(400).json({ message: "Invalid taste type" });
            }
        }
        catch(error){
            console.error("Error fetching menu item ", error);
            res.status(500).json({ message: error.message });
        }
    })

    module.exports = router;
