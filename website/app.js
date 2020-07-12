/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q='
openWeatherApiKey = '&appid=d3c5afe31b7352e8daff388941151d1f';
//http://api.openweathermap.org/data/2.5/weather?q=cairo&appid=d3c5afe31b7352e8daff388941151d1f


/*
const postData = async ( url = '', data = {})=>{
  console.log(data)
    const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      // console.log(newData);
      return newData
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
}
postData('/addAnimal', {animal:'lion'});
*/


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


function createApiUrl(baseURL,cityName,apiKey){
	return baseURL + cityName + openWeatherApiKey;
}