
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };
  
// Initialize all route with a callback function
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData (request, response) {
  response.send(projectData);
};

// Post Route
app.post('/addWeatherJournal', addWeatherJournal);

function addWeatherJournal (request,response){
    let newWeatherData = request.body;
	console.log(newWeatherData);
	let newRecord = {
		temperature: newWeatherData.temperature,
		date: newWeatherData.date,
		userResponse: newWeatherData.userResponse
	}
	projectData.push(newRecord);
};
  

