//Global

//https://www.boredapi.com/documentation
var boredApi = "http://www.boredapi.com/api/activity"

//https://api.chucknorris.io/#!
var jokesApi = "https://api.chucknorris.io/jokes/random"
var activityEl = document.getElementById("calledActivity")
var activityBtn = document.getElementById("newActivity")
var jokeEl = document.getElementById("joke")
var activityType = document.getElementById("activityType")


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
// function getJoke() {
//     fetch(jokesApi)
//         .then(function (response) { return response.json() })
//         .then(function (data) { 
//             var joke = data.value
//             var icon_url= data.icon_url
//             var chuckJokeImg= document.createElement("img")
//             chuckJokeImg.setAttribute("src" , icon_url)
//             jokeEl.appendChild(chuckJokeImg)
            

            
            
            
            
            
//             console.log(data) })
//         .catch(function (error) { console.log(error) })
// }
// activity API call
function activity (data) {
    console.log(data)
    console.log(activityType.value)
    var activity = data.activity
    activityEl.innerText = activity
}                                                 
activityBtn.addEventListener("click", getboredactivity)
getboredactivity()
// getJoke()
