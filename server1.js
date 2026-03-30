const express =  require('express');
const app =  express();
const db = require('./db');
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
app.listen(3000)
