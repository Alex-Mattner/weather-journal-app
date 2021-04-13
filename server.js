// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');     // code by Alex hinzugefügt am 12.04

// Start up an instance of app
const app = express();                  // code by Alex hinzugefügt am 12.04

/*Dependencies*/                        // code by Alex hinzugefügt am 13.04.
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// Cors for cross origin allowance
const cors = require('cors');           // code by Alex hinzugefügt am 12.04
app.use(cors());                        // code by Alex hinzugefügt am 12.04


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
//set up server port
const port = 8000;

// spin up the server
const server = app.listen(port, listening);                          // code by Alex hinzugefügt am 13.04
//const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})

// callback to debug server
    function listening() {                                          // code by Alex hinzugefügt am 13.04
        console.log('server is running');
        console.log(`server is running on localhost: ${port}`)
    }







    
// TESTING FOR PRACTICE
app.get('/', function(req, res) {
    res.send('Hello World');
})

app.get('/', function(request, response) {
    response.send(projectData);
})