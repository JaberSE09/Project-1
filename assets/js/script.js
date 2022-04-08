//Global
//https://www.boredapi.com/documentation
var boredApi = "http://www.boredapi.com/api/activity/"
//https://api.chucknorris.io/#!
var jokesApi = "https://api.chucknorris.io/jokes/random"
var activityEl = document.getElementById("calledActivity")

//fetch bored activity data
function getboredactivity() {
    fetch(boredApi)
        .then(function (response) { return response.json() })
        .then(function (data) {activity(data)})
        .catch(function (error) {console.log(error)})
}

function getJoke(){
    fetch(jokesApi)
    .then(function (response) { return response.json() })
    .then(function (data) { console.log(data) })
    .catch(function (error) {console.log(error)})
}

function activity (data) {
    console.log(data)
    var activity = data.activity
    activityEl.innerText = activity
}                                                 

getboredactivity()
// getJoke()