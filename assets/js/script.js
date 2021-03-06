//Global

//https://www.boredapi.com/documentation
var boredApi = "https://www.boredapi.com/api/activity"

//https://api.chucknorris.io/#!
var jokesApi = "https://api.chucknorris.io/jokes/random"
var jokeEl = document.getElementById("jokes")
var jokeBtnEl = document.getElementById("start-btn")
var activityEl = document.getElementById("calledActivity")
var activityBtn = document.getElementById("newActivity")
var activityType = document.getElementById("activityType")
var guess= document.getElementById("guess")
var game = document.getElementById("game")
var numberGuessGame = document.getElementById("guessBtn")
var guessResponse = document.getElementById("guessResponse")
var guessNumber = document.getElementById("guessNumber")
var guessBtn = document.getElementById("guessBtn")
var nameBtn = document.getElementById("nameBtn")
var scoreEnter = document.getElementById("score")
var displayNumGuessHS = document.getElementById("displayNG")
var targetNum = random();
var guessMin = 1
var guessMax = 1000
var guessCount = 1


//fetch bored activity data000
function getboredactivity() {
    if (activityType.value === 'random') {
        fetch(boredApi)
            .then(function (response) { return response.json() })
            .then(function (data) {activity(data)})
            .catch(function (error) {
                activityEl.innerText = "Something went wrong.  Please try again"
                console.log(error)
            })
    } else {
        var boredApiTemp = boredApi + '?type=' + activityType.value
        fetch(boredApiTemp)
            .then(function (response) { return response.json() })
            .then(function (data) {activity(data)})
            .catch(function (error) {
                activityEl.innerText = "Something went wrong.  Please try again"
                console.log(error)
            })
    }
}

//fetch jokes data

function getJoke() {
    var jokesCategory = document.getElementById("joke").value
    if (jokesCategory === 'random') {
        fetch(jokesApi)
        .then(function (response) { return response.json() })
        .then(function (data) {
            if (data.categories[0] == 'explicit') {
                getJoke()
            }
            jokeEl.innerHTML = data.value
        })
        .catch(function (error) {
            jokeEl.innerHTML = "Something went wrong.  Please try again"
            console.log(error)
        })
    } else {
        var jokeApiCategory = jokesApi + "?category=" + jokesCategory
        fetch(jokeApiCategory)
        .then (function (response) {return response.json() })
        .then (function (data) { jokeEl.innerHTML = data.value})
        .catch (function (error) {
            jokeEl.innerHTML = "Something went wrong.  Please try again"
            console.log(error)
        })
    }
}

// function getJoke() {
//     fetch(jokesApi)
//         .then(function (response) { return response.json() })
//         .then(function (data) {

//             var jokesSearch= document.getElementById("joke").value.trim()
//             if (jokesSearch){
            
//                 var searchApi = `https://api.chucknorris.io/jokes/random?category=${jokesSearch}`
//                 fetch(searchApi).then(function(response){
//                     return response.json()
//                 }).then(function (data){
//                 console.log(data)
//                 if(data.status == 404 ){
//                     jokeEl.innerHTML=data.message
//                 }
//                 else if(data.categories[0] == "explicit"){
//                     jokeEl.innerHTML="no jokes found"
//                 }
//                 else{
//                     jokeEl.innerHTML=data.value
//                 }
                
//             })
//         }
//             else{
//             jokeEl.innerHTML= data.value
// }


//         })
//         .catch(function (error) { console.log(error) })
// }



// activity API call
function activity (data) {
    var activity = data.activity
    activityEl.innerText = activity
}            
// guess game
function numberGuess (event) {
    event.preventDefault()
    guessCount = guessCount + 1
    // user enters no value
    if (guess.value === "") {
        guessCount = guessCount - 1
        guessResponse.innerText = "Please enter a number"
    }
    // user guesses correctly
    else if (guess.value == targetNum) {
        guessCount = guessCount - 1
        targetNum = random();
        score(guessCount)
    } 
    // user fails to guess correctly
    else if (guessCount > 10) {
        guessResponse.innerText = "Too bad. Try again"
        guessCount = 1
        guessNumber.innerText = "Guess number " + guessCount
        targetNum = random();
        guess.value = 0
    } 
    // user guesses too low
    else if (guess.value < targetNum) {
        guessNumber.innerText = "Guess number " + guessCount
        guessMin = guess.value
        guessMin = parseInt(guessMin, 10)
        guess.setAttribute("min", guessMin)
        guessResponse.innerText = "Too Low.  Guess a number between " + guessMin + " and " + guessMax
        guess.value = 0
    } 
    // user guesses too high
    else if (guess.value > targetNum) {
        guessNumber.innerText = "Guess number " + guessCount
        guessMax = guess.value
        guessMax = parseInt(guessMax, 10)
        guess.setAttribute("max", guessMax)
        guessResponse.innerText = "Too High.  Guess a number between " + guessMin + " and " + guessMax
        guess.value = 0
    }
    }
// random number between 1 and 1000 function
function random () {
    var num = Math.floor(Math.random() * 1000 + 1);
    return num;
}
// user wins, changes buttons, reset values
function score (guess) {
    var gameTemp = document.getElementById("game")
    gameTemp.style.display = "none"
    guessNumber.innerText = "Congratulations.  Your score is " + guess
    guessResponse.innerText = "Enter your name"
    scoreEnter.style.display = "block"
    var guess = document.getElementById("guess")
    guess.setAttribute("min", 1)
    guess.setAttribute("max", 1000)
    guess.value = 0
}
// set scores to local storage
function logScore (event) {
    event.preventDefault()
    var name = document.getElementById("name")
    var tempScores = {ID : name.value, count : guessCount}
    var storedScores = localStorage.getItem("scores")
    var highScores = JSON.parse(storedScores)
    if (highScores != null) {
        highScores.push(tempScores)
        highScores.sort(function(a,b){
            return a.count - b.count
        })
    } else {
        highScores = []
        highScores.push(tempScores)
    }
    var scores = localStorage.setItem("scores", JSON.stringify(highScores))
    scoreEnter.style.display = "none"
    var gameTemp = document.getElementById("game")
    gameTemp.style.display = "block"
    name.value = ''
    guessResponse.innerText = "Guess a number between 1 and 1000"
}
// displays locally stored scores
function displayScore () {
    var storedScores = localStorage.getItem("scores")
    var highScores = JSON.parse(storedScores)
    if (highScores != null) {
        for (i=0; i < highScores.length && i < 5; i++) {
            var listScore = document.getElementById("score"+i)
            listScore.innerText = highScores[i].ID + ": " + highScores[i].count
        }
    } else {
        var listScore = document.getElementById("score0")
        listScore.innerText = "No scores to display yet."
    }
}

activityBtn.addEventListener("click", getboredactivity)
jokeBtnEl.addEventListener("click" , getJoke)
game.addEventListener("submit", numberGuess)
scoreEnter.addEventListener("submit", logScore)
displayNumGuessHS.addEventListener("click", displayScore)
getboredactivity()
getJoke()