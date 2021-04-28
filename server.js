// Setup empty JS object to act as endpoint for all routes
projectData = [];  // projectData = []; array is also possible, both are objects in JS 

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

// callback to debug server
    function listening() {                                          // code by Alex hinzugefügt am 13.04
        console.log('server is running');
        console.log(`server is running on localhost: ${port}`)
    }


    
//TESTING FOR PRACTICE
app.get('/', function(req, res) {
    res.send('Hello World');
})

/* app.get('/', function(request, response) {
    response.send(projectData);
})  */



//Add a GET route that returns projectData
// GET https://127.0.0.1:8000/.../projectdata
// 200 OK: {"temperature": 14, "date": 15.12.2019, "user_experiance": "Bal blub foo"}
app.get('/projectdata', allData);

function allData(request, response) {
    console.log('test');
    response.send(projectData);
    console.log(projectData);
    //???   projectData = [];
    //???   return projectData

}



//Add a POST route that adds incoming data to projectData
// POST https://127.0.0.1:8000/.../projectdata : {"temperature": 14, "date": 15.12.2019, "user_experiance": "Bal blub foo"}
// 200 OK: {"temperature": 14, "date": 15.12.2019, "user_experiance": "Bal blub foo"}
app.post('/projectdata', addIncomingDataToProjectData);

    function addIncomingDataToProjectData(request, response) {
        console.log(request.body);
        newEntryToProjectData = {
            date: request.body.date,
            temp: request.body.temp,
            content: request.body.content
         }

         projectData.push(newEntryToProjectData);
         //projectData.push(body);  --> dann wäre newEntrytoProjectData komplet unnötig???
        response.send(newEntryToProjectData);
    }















//example of Api call
//api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=523847e1c3ae8b74f9b3303c447bab38

//API variables
/*const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID='
const apiKey = '523847e1c3ae8b74f9b3303c447bab38';

const getData = async (baseURL, apiKey) => {

    const res = await fetch(baseURL+apiKey);

    try {
        const data = await.response.json();
        console.log(newData);
        //return newData
    } 

    catch (error) {
        console.log('error', error);
    }
}

 






const response = await fetch(baseURL+apiKey) {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
}) */