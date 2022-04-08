//Global

//https://www.boredapi.com/documentation
var boredApi = "http://www.boredapi.com/api/activity/"

//https://api.chucknorris.io/#!
var jokesApi = "https://api.chucknorris.io/jokes/random"

var jokeEl = document.getElementById("jokes")
var jokeBtnEl = document.getElementById("start-btn")

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


        jokeBtnEl.addEventListener("click" , function(){
            jokeEl.innerHTML= joke
        })


        })
        .catch(function (error) { console.log(error) })
}

//getboredactivity()
setInterval(() => {
     getJoke()
}, 1000);