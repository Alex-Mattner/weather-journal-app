// Setup empty JS object to act as endpoint for all routes
projectData = [];  

// Require Express to run server and routes
const express = require('express');    

// Start up an instance of app
const app = express();                 

/*Dependencies*/                        
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// Cors for cross origin allowance
const cors = require('cors');          
app.use(cors());                        


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
//set up server port
const port = 8000;

// spin up the server
const server = app.listen(port, listening);                          

// callback to debug server
    function listening() {                                         
        console.log('server is running');
        console.log(`server is running on localhost: ${port}`)
    }


    
//Add a GET route that returns projectData
// GET https://127.0.0.1:8000/.../projectdata
// 200 OK: {"temperature": 14, "date": 15.12.2019, "user_experiance": "Bal blub foo"}
app.get('/projectdata', allData);

function allData(request, response) {
    //console.log('test');
    response.send(projectData);
    console.log(projectData);
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

