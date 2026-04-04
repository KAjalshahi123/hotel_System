const express =  require('express');
const app =  express();
const db = require('./db.js');
const person = require('./module/person');
const Menu = require('./module/Menu');


const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send("Hello World how can i help  you ");

})

app.get('/chiken', (req, res) => {
    res.send("you can eat chiken");
}
)

app.get('/idl', (req, res)=> {
    var order = {
        name : "idldal",
        price: 100,
        quantity: 1
    }
    res.send(order);
})

// app.post('/person', (req, res)=> {
//     const data = req.body;
    // const newPerson = new person();
    // create new person document using the mongoose model and save it to the database
    // newPerson.name = data.name;
    // newPerson.age = data.age;
    // newPerson.work = data.work;
    // newPerson.mobile = data.mobile;
    // newPerson.email = data.email;
    // newPerson.address = data.address;
    // newPerson.salary = data.salary;

    // short hand  way  to asign the values to the new person document

    // --> it❌ 1. Callback Hell (Major Problem)
    // ❌ When multiple async operations
//     save(() => {
//    find(() => {
//       update(() => {
//          delete(() => {

 
//     const newPerson = new person(data);
//     newPerson.save((error, savedperson) => {
//         if (error) {
//             return res.status(500).send("Error saving person to database");
//         }
//         console.log("Person saved to database:", savedperson);
//         res.status(200).json(savedperson);

//     });
// });

// ------> Why async/await over callbacks?
// 1. Callback Hell: When you have multiple asynchronous operations that depend on each other, you end up with nested callbacks, which can become difficult to read and maintain.
// 2. Error Handling: With callbacks, you need to handle errors in each callback, which can lead to repetitive code and potential mistakes. With async/await, you can use try/catch blocks for cleaner error handling.
// 3. Readability: Async/await allows you to write asynchronous code that looks more like synchronous code, making it easier to understand and follow the flow of the program.


app.post('/person', async (req, res) => {
    try{
        const data = req.body;
        const newPerson = new person(data);
        const savedPerson = await newPerson.save();
        console.log("Person saved to database:", savedPerson);
        res.status(200).json(savedPerson);
    }
    catch(error){
        console.error("Error saving person to database:", error);
        res.status(500).send("Error saving person to database");
    }
});

app.get('/person', async (req, res) => {
    try {
        const people = await person.find();
        res.status(200).json(people);
    }
    catch (error) {
        console.error("Error fetching people from database:", error);
        res.status(500).send("Error fetching people from database");
    }
});

app.get('/person/:worktype', async(req, res)=>{
    try {
        const worktype = req.params.worktype;
        if(worktype  == 'developer'|| worktype == 'designer' || worktype == 'manager'){

            const people = await person.find({ work: worktype });
            res.status(200).json(people);
        }
        else{
            res.status(400).send("Invalid work type. Please provide 'developer', 'designer', or 'manager'.");
        }
    }
    catch (error) {
        console.error("Error fetching people by work type from database:", error);
        res.status(500).send("Error fetching people by work type from database");
    }

});


// const personRouter = require('./routes/PersonRouter');
// app.use('/person', personRouter);

// const menuRouter = require('./Menuitem_Server');
// app.use('/menu', menuRouter);

// Menu  Server

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

app.get('/:tasty', async (req, res) => {
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

 const routermen = require('./routes/menuRouter');
 app.use('/menu', routermen);

 const personRouter = require('./routes/PersonRouter');
app.use('/person', personRouter);

app.listen(3030)

