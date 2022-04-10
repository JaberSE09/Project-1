//Global

//https://www.boredapi.com/documentation
var boredApi = "http://www.boredapi.com/api/activity"

//https://api.chucknorris.io/#!
var jokesApi = "https://api.chucknorris.io/jokes/random?category=sport"
var jokeEl = document.getElementById("jokes")
var jokeBtnEl = document.getElementById("start-btn")
var activityEl = document.getElementById("calledActivity")
var activityBtn = document.getElementById("newActivity")
var jokeEl = document.getElementById("jokes")
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
function getJoke() {
    fetch(jokesApi)
        .then(function (response) { return response.json() })
        .then(function (data) {

            var jokesSearch= document.getElementById("joke").value.trim()
            if (jokesSearch){
            
                var searchApi = `https://api.chucknorris.io/jokes/random?category=${jokesSearch}`
                fetch(searchApi).then(function(response){
                    return response.json()
                }).then(function (data){
                console.log(data)
                if(data.status == 404 ){
                    jokeEl.innerHTML=data.message
                }
                else if(data.categories[0] == "explicit"){
                    jokeEl.innerHTML="no jokes found"
                }
                else{
                    jokeEl.innerHTML=data.value
                }
                
            })
        }
            else{
            jokeEl.innerHTML= data.value
}


        })
        .catch(function (error) { console.log(error) })
}



// activity API call
function activity (data) {
    console.log(data)
    console.log(activityType.value)
    var activity = data.activity
    activityEl.innerText = activity
}                                                 
activityBtn.addEventListener("click", getboredactivity)
jokeBtnEl.addEventListener("click" , getJoke)
getboredactivity()