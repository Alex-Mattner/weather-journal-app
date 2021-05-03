/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '523847e1c3ae8b74f9b3303c447bab38';
const serverBaseURL = 'http://127.0.0.1:8000' 
       

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// EventListener for button id="generate"
const generate = document.getElementById('generate');
generate.addEventListener('click', async (event) => {
    
    event.preventDefault();

    // get user input (zipcode + textarea)
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    // initiate variable for storing data recievey by GET request
    let weather; 

    //function to request data from API
    await getWeatherByZipFromOpenWeatherApi(baseURL, zipCode, apiKey)

        .then (result => { 
            console.log(result);
            weather = result;
        });
        
        //console.log(weather);

    let newProjectData = {
        date: d,
        temp: weather.main.temp,
        content: document.getElementById('feelings').value
    };

    //console.log('send post request to server')
    await postProjectDataToAPI(newProjectData);

    //console.log('update UI');
    await updateUserInterface();

})


// function to GET data from Weather API
const getWeatherByZipFromOpenWeatherApi = async (baseURL, zipCode, apiKey ) => {
    
    const url = `${baseURL}${zipCode}&appid=${apiKey}`;
    //console.log(url);

    const userData = {
        zip: zipCode,
        feelings: feelings,
        newDate
    }
    //console.log(userData);

    // initiation of storage variable
    let result; 

    await fetch(url)
        .then (response => response.json())
        .then (data => {
            console.log(data); 
            console.log('return weather data');
            result =  data;
        })
        .catch (error => console.log('error', error))

    console.log(result);
    return result
}


// function to add data to POST request
const postProjectDataToAPI = async (data = {}) => {
   
    console.log(data);

    const request =  {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        //create JSON string from JS object --> body data must match content type 
        body: JSON.stringify(data)
    };

    // sent POST request to server
    const response = await fetch (`${serverBaseURL}/projectdata`, request);

   // evaluation of response
    try {
        const newData = await response.json();
        console.log(newData);
        return response.body
    } 

    catch (error) {
        console.log('error', error);
        }

}


// updateUserInterface() function to GET the project data
const updateUserInterface = async () => {
    console.log('get projectdata from server');
    await fetch(`${serverBaseURL}/projectdata`)
    
    .then( async response =>   {
        //console.log('processing response');
        
            const responseData = await response.json();
            //console.log(responseData);

        try {
            document.getElementById('date').innerHTML = 'Date:' + responseData[0].date;
            document.getElementById('temp').innerHTML = 'Temp:' + responseData[0].temp;
            document.getElementById('content').innerHTML = 'Feel:' + responseData[0].content;
        } 

        catch(error){
            console.log('error', error);
        }

    });
    
    
}


