/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let openWeatherApiKey = '&appid=d3c5afe31b7352e8daff388941151d1f';
const proxyUrl = "https://cors-anywhere.herokuapp.com";

const saveDataURL = 'http://localhost:3000/addWeatherJournal';

const getAllDataURL = 'http://localhost:3000/all';

//get the generateButton
const generateButton = document.getElementById('generate');
//get the zipTextInput
const zipTextInput = document.getElementById('zip');
//get the feeilingsTextArea
const feelingsTextArea = document.getElementById('feelings');


//add the click event listner
generateButton.addEventListener('click', getWeatherDataAndSave, false);



/* Function to GET Web API Data*/
//let returnedData;
const getData = async (url = '') =>{ 
console.log("start getting weather");
  const request = await fetch(url);
  try {
  // Transform into JSON
  const returnedData = await request.json();
  //console.log(returnedData);
  return returnedData;
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
};


/* Function to POST data */
const postData = async ( url = '', data = {})=>{
	console.log("start posting weather");
	//console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};


// Create a new date instance dynamically with JS
function getDate(){	

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
let newDate = mm+"."+dd+"."+yyyy;
return newDate;
}

//zipcode: 94040
function createApiUrl(baseUrl,zipCode,apiKey){
	return baseUrl + zipCode + apiKey;
}

function getWeatherDataAndSave(){
	if(zipTextInput.value.trim().length === 0 || feelingsTextArea.value.trim().length === 0)
	{
		console.log("empty");
		return;
	}

	//create the url
	let requestURL = createApiUrl(baseURL, zipTextInput.value, openWeatherApiKey);
	//get weather data 
	let promise = getData(requestURL);
	
	promise = promise.then(function(returnedData){
	//save data
	SaveData(returnedData);
	//get all data and show the new one
	updateUI();
	});
	
}

function SaveData(newDataRecieved){
	postData(saveDataURL,{temperature:newDataRecieved.main.temp, date:getDate(), userResponse:feelingsTextArea.value});
}


const updateUI = async () => {
	console.log("start getting saved weather to fetch UI");
  const request = await fetch(getAllDataURL);
  try{
    const allData = await request.json();
	console.log(allData);
    document.getElementById('temp').innerHTML = allData[allData.length - 1].temperature;
    document.getElementById('date').innerHTML = allData[allData.length - 1].date;
    document.getElementById('content').innerHTML = allData[allData.length - 1].userResponse;

  }catch(error){
    console.log("error", error);
  }
}



