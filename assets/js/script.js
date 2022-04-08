//Global

//https://www.boredapi.com/documentation
var boredApi = "http://www.boredapi.com/api/activity/"

//https://api.chucknorris.io/#!
var jokesApi = "https://api.chucknorris.io/jokes/random"

var jokeEl = document.getElementById("joke")


//fetch bored activity data000
function getboredactivity() {
    fetch(boredApi)
        .then(function (response) { return response.json() })
        .then(function (data) { console.log(data) })
        .catch(function (error) { console.log(error) })
}

//fetch jokes data
function getJoke() {
    fetch(jokesApi)
        .then(function (response) { return response.json() })
        .then(function (data) { 
            var joke = data.value
            var chuckJoke= document.createElement("h2")
            chuckJoke.innerHTML=joke
            jokeEl.appendChild(chuckJoke)
            console.log(data) })
        .catch(function (error) { console.log(error) })
}

//getboredactivity()
getJoke()