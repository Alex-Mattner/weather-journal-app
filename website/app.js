/* Global Variables */
    //API variables
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '523847e1c3ae8b74f9b3303c447bab38';
const serverBaseURL = 'http://127.0.0.1:8000' 
        //example of API call
        //api.openweathermap.org/data/2.5/weather?zip=523847e1c3ae8b74f9b3303c447bab38

       // const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID='


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Click EventListener for button id="generate"
const generate = document.getElementById('generate');
generate.addEventListener('click', async (event) => {
    
    event.preventDefault();

    // get user input (zipcode + textarea)
    const zipCode = document.getElementById('zip').value;
        console.log(zipCode);
    const feelings = document.getElementById('feelings').value;
        console.log(feelings);

    console.log('send get request to openWeather API');

    var weather; 
    await getWeatherByZipFromOpenWeatherApi(baseURL, zipCode, apiKey)
    .then (result => 
    { 
        console.log(result);
        weather = result;
    });
    console.log(weather);

    let newProjectData = {
        date: d,
        temp: weather.main.temp,
        content: document.getElementById('feelings').value
    }

    console.log('send post request to server')
    await postProjectDataToAPI (newProjectData);

    console.log('update UI');
    await updateUserInterface();
    }
)

// previously called function to GET data from Weather API

const getWeatherByZipFromOpenWeatherApi = async (baseURL, zipCode, apiKey ) => {

    console.log(baseURL);
    console.log(zipCode);
    console.log(apiKey);

    const url = `${baseURL}${zipCode}&appid=${apiKey}`;
    console.log(url);

    const userData = {
        zip: zipCode,
        feelings: feelings,
        newDate
    }
    console.log(userData);

    var result; 

    await fetch(url)
    .then (response => response.json())
    .then (data => {
        console.log(data); 
        console.log('return weather data');
        result =  data
    })
    .catch (error => console.log('error', error))

    console.log(result);
    return result
}


// postData function to add data to POST request
const postProjectDataToAPI = async (data = {}) => {
   
    console.log(data);

    const request =  {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        //create JSON string from JS obj., because body data must match content type 
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
    //.then (async data => data.json())
    .then( async response =>   {
        console.log('processing response');
        
            const responseData = await response.json();
            console.log(responseData);
                     
    

        //console.log(response);
        //response.json().then(data => console.log(data));
        console.log('update DOM');

        try {
            //const allDataSendFromServer = await response;
            document.getElementsByClassName('date').innerHTML = 'Date:' + responseData[0].date;
            document.getElementsByClassName('temp').innerHTML = 'Temp:' + responseData[0].temp;
            document.getElementsByClassName('content').innerHTML = 'Feel:' + responseData[0].content;
        } 

        catch(error){
            console.log('error', error);
        }

    });
    
    
}


