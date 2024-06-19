console.log("JS init");

const searchEl = $("#search-button");


let lat=0;
let lon=0;

console.log(lat + ", "  + lon );


searchEl.on('click', function(){
    var country = $('#search-input').val();
    let lonAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${country}&limit=5&appid=54ce6fe12fbefa3507abb38187d01121`
    doFetch(lonAPI);
    
});
$(document).ready(function(){
    // const pastEl = $(".history");


    // pastEl.on('click', function(){
    //     console.log("Hi");
    //     // console.log(pastEl.attr(lat));
    // })
    $(document).on('click', '.history', function() {
        console.log("Hi");
        console.log($(this).attr('lat'));
    });
})


function doFetch(api){
    fetch(api).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            lat = data[0].lat;
            lon = data[0].lon;
            const weathAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=54ce6fe12fbefa3507abb38187d01121&units=imperial`
    
            fetch(weathAPI).then(function(response){
                if(response.ok){
                    response.json().then(function(data){
                        createHistory(data.city.name, lat, lon);
                        createTodayCard(data);
                        console.log(data.list[0]);
                        console.log('city name');
                        console.log(data.city.name);
                        console.log('date');
                        console.log(data.list[0].dt_txt);
                        console.log('cloudiness');
                        console.log(data.list[0].weather[0].icon);
                        console.log('temp');
                        console.log(data.list[0].main.temp);
                        console.log('wind');
                        console.log(data.list[0].wind.speed);
                        console.log('hum');
                        console.log(data.list[0].main.humidity);
                        
                        for(let i=0; i<4 ; i++){
                            let listIndex = 8*(i +1);
                            createFutureCard(data, listIndex);
                        }
                        // console.log(data.list[0].weather);
                        // console.log(data.list[8]);

                    })
                }else{
                    console.log('bad');
                }
            })
          });
        }
    });
}
function createHistory(data, lat, lon){
    const historyCard = $('<div>');
    historyCard.attr('class', 'history');
    historyCard.attr('lat', lat);
    historyCard.attr('lon', lon);
    historyCard.text(data);
    $('#past-search').append(historyCard);
    console.log('card added');
}
function createTodayCard(data){
    const todayCard = $('<div>');
    todayCard.attr('id', 'today-weather-card');

        // Create and append h2 element
    const city = $('<h2>').text(data.city.name + `(${data.list[0].dt_txt})`);

    todayCard.append(city);

        // Create and append four p tags
   
    const cloudIcon = $('<p>').text(data.list[0].weather[0].icon);
    todayCard.append(cloudIcon);
    const temp = $('<p>').text('Temp: ' + data.list[0].main.temp + "F");
    todayCard.append(temp);
    const wind  = $('<p>').text('Wind: ' + data.list[0].wind.speed + "mps");
    todayCard.append(wind);
    const hum = $('<p>').text('Humidity: ' + data.list[0].main.humidity + "%");
    todayCard.append(hum);
        

        // Append the new div to the div with id "today-weather"
    $('#today-weather').append(todayCard);
}

function createFutureCard(data, i){
    const futureCard = $('<div>');
    futureCard.attr('class', 'future-weather-card');

        // Create and append h2 element
    const date = $('<h2>').text(`(${data.list[i].dt_txt})`);

    futureCard.append(date);

        // Create and append four p tags
   
    const cloudIcon = $('<p>').text(data.list[i].weather[0].icon);
    futureCard.append(cloudIcon);
    const temp = $('<p>').text('Temp: ' + data.list[i].main.temp + "F");
    futureCard.append(temp);
    const wind  = $('<p>').text('Wind: ' + data.list[i].wind.speed + "mps");
    futureCard.append(wind);
    const hum = $('<p>').text('Humidity: ' + data.list[i].main.humidity + "%");
    futureCard.append(hum);


    $('#future-weather').append(futureCard);
}