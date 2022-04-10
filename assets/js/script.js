//Global

//https://www.boredapi.com/documentation
var boredApi = "http://www.boredapi.com/api/activity"

//https://api.chucknorris.io/#!
var jokesApi = "https://api.chucknorris.io/jokes/random"
var activityEl = document.getElementById("calledActivity")
var activityBtn = document.getElementById("newActivity")
var jokeEl = document.getElementById("joke")
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
            .catch(function (error) {console.log(error)})
    } else {
        var boredApiTemp = boredApi + '?type=' + activityType.value
        fetch(boredApiTemp)
            .then(function (response) { return response.json() })
            .then(function (data) {activity(data)})
            .catch(function (error) {console.log(error)})
    }
}

//fetch jokes data
function getJoke() {
    fetch(jokesApi)
        .then(function (response) { return response.json() })
        .then(function (data) { 
            var joke = data.value
            var icon_url= data.icon_url
            var chuckJokeImg= document.createElement("img")
            chuckJokeImg.setAttribute("src" , icon_url)
            jokeEl.appendChild(chuckJokeImg)
            

            
            
            
            
            
            console.log(data) })
        .catch(function (error) { console.log(error) })
}
// activity API call
function activity (data) {
    var activity = data.activity
    activityEl.innerText = activity
}            
// guess game
function numberGuess (event) {
    event.preventDefault()
    guessCount = guessCount + 1
    if (guess.value == targetNum) {
        guessCount = guessCount - 1
        targetNum = random();
        // guessNumber.innerText = "Guess number " + guessCount
        // guessResponse.innerText = "Congratulations.  Try again"
        score(guessCount)
    }  else if (guessCount > 9) {
        guessResponse.innerText = "Too bad. Try again"
        guessCount = 1
        guessNumber.innerText = "Guess number " + guessCount
        targetNum = random();
        guess.value = ""
    } else if (guess.value < targetNum) {
        guessNumber.innerText = "Guess number " + guessCount
        guessMin = guess.value
        guess.setAttribute("min", guessMin)
        guessResponse.innerText = "Too Low.  Guess a number between " + guessMin + " and " + guessMax
        guess.value = ""
    } else if (guess.value > targetNum) {
        guessNumber.innerText = "Guess number " + guessCount
        guessMax = guess.value
        guess.setAttribute("max", guessMax)
        guessResponse.innerText = "Too High.  Guess a number between " + guessMin + " and " + guessMax
        guess.value = ""
    }
    }

function random () {
    var num = Math.floor(Math.random() * 1000 + 1);
    return num;
}

function score (guess) {
    var gameTemp = document.getElementById("game")
    gameTemp.style.display = "none"
    guessNumber.innerText = "Congratulations.  Your score is " + guess
    guessResponse.innerText = "Enter your name"
    scoreEnter.style.display = "block"
    var guess = document.getElementById("guess")
    guess.setAttribute("min", 1)
    guess.setAttribute("max", 1000)
    guess.value = ""
}

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
}

function displayScore () {
    var storedScores = localStorage.getItem("scores")
    var highScores = JSON.parse(storedScores)
    if (highScores != null) {
        for (i=0; i < highScores.length && i < 5; i++) {
            var listScore = document.getElementById("score"+i)
            listScore.innerText = highScores[i].ID + ": " + highScores[i].count
        }
    }
}

activityBtn.addEventListener("click", getboredactivity)
game.addEventListener("submit", numberGuess)
scoreEnter.addEventListener("submit", logScore)
displayNumGuessHS.addEventListener("click", displayScore)
getboredactivity()
// getJoke()
