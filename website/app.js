/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();




//example of Api call
//api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=523847e1c3ae8b74f9b3303c447bab38

//API variables
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID='
const apiKey = '523847e1c3ae8b74f9b3303c447bab38';

const getData = async (baseURL, apiKey) => {

    const res = await fetch(baseURL+apiKey);

    try {
        const data = await response.json();
        console.log(newData);
        //return newData
    } 

    catch (error) {
        console.log('error', error);
    }
}

/* const response = await fetch(baseURL+apiKey) {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
}) */