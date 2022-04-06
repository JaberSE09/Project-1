//Global
//https://www.boredapi.com/documentation
var boredApi = "http://www.boredapi.com/api/activity/"
//https://api.chucknorris.io/#!
var jokesApi = "https://api.chucknorris.io/jokes/random"

//fetch bored activity data
function getboredactivity() {
    fetch(boredApi)
        .then(function (response) { return response.json() })
        .then(function (data) { console.log(data) })
        .catch(function (error) {console.log(error)})
}

function getJoke(){
    fetch(jokesApi)
    .then(function (response) { return response.json() })
    .then(function (data) { console.log(data) })
    .catch(function (error) {console.log(error)})
}

//getboredactivity()
//getJoke()