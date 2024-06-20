/* ===================================== */
// DEPENDENCIES
const searchEl = $("#search-button");



/* ===================================== */
// On Click Methods

// Method when clicking search button
searchEl.on('click', function(event){
    var country = $('#search-input').val();
    // API that uses city name to get location data
    let lonAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${country}&limit=5&appid=54ce6fe12fbefa3507abb38187d01121`
    doFetch(lonAPI);
    
});

// Method when clicking cities in search history
$(document).on('click', '.history', function() {
    // Target that specific box
    const cityName = $(this).text();

    // Call data from local storage using city name
    const cityInfo = JSON.parse(localStorage.getItem(cityName));
    const lat = cityInfo.latitude;
    const lon = cityInfo.longitude;

    // Set API based on that and fetch the data
    const callBackAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=54ce6fe12fbefa3507abb38187d01121&units=imperial`
    fetchWithWAPI(callBackAPI, false);    

});


/* ===================================== */
// Functions envoked by click functions

// Function to fetch data using longitude api
function doFetch(api){
    fetch(api).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            // Set the latitude and longitude data using API
            lat = data[0].lat;
            lon = data[0].lon;
            const weathAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=54ce6fe12fbefa3507abb38187d01121&units=imperial`
            // Then call a function to fetch Weather API
            fetchWithWAPI(weathAPI, true);
            
            
          });
        }
    });
}


// Function that saves and creates weather card
function fetchWithWAPI(weathAPI, newSearch){
    fetch(weathAPI).then(function(response){
    // If there are past datas, remove them
    removeCurrentInfo();

        if(response.ok){
            response.json().then(function(data){
                // If it is not calling fetchWithAPI from history, create a history
                if(newSearch){
                    createHistory(data.city.name, lat, lon);
                }
                // Create todays data
                createTodayCard(data);

                // Put text for future weather forecast
                $('#future-header').text('Five Day Forecast:');
                
                // Make five forecasts
                for(let i=0; i<5 ; i++){
                    // 8 comes from the fact that the api is based on 3 hours.
                    let listIndex = 8*(i +1)-1;
                    createFutureCard(data, listIndex);
                }

            })
        }else{
            console.log('bad');
        }
    })
}

// Function to remove previous search result
function removeCurrentInfo(){
    $('#today-weather').children().first().remove();        
    $("#future-weather").find('.future-weather-card').remove();
}

// Function to create search history.
function createHistory(data, lat, lon){
    const historyCard = $('<div>');
    historyCard.attr('class', 'history');
    historyCard.text(data);


    // Create an object with lan and lon properties
    const cityData = {
        latitude: lat,
        longitude: lon
    };

    // Convert the object to a JSON string
    const jsonData = JSON.stringify(cityData);

    // Save the JSON string to local storage under the key 'locationData'
    localStorage.setItem(`${data}`, jsonData);

    // Add it on the top of past search section
    $('#past-search').prepend(historyCard);
}

// Create today weather card
function createTodayCard(data){
    const todayCard = $('<div>');
    todayCard.attr('id', 'today-weather-card');

    // Create and append h2 element
    const city = $('<h2>').text(data.city.name +'('+ substringDate(`(${data.list[0].dt_txt})`) +')');

    todayCard.append(city);

    // Set datas
    const code = data.list[0].weather[0].icon;
    const cloudIcon = $('<img>').attr('src', `https://openweathermap.org/img/wn/${code}@2x.png`);
    city.append(cloudIcon);
    const temp = $('<p>').text('Temp: ' + data.list[0].main.temp + " F");
    todayCard.append(temp);
    // vanilla data is m/s, so multiply 2.237 to get MPH. 
    // Do round(num*100)/100 to acheive two decimal places
    const wind  = $('<p>').text('Wind: ' + Math.round(data.list[0].wind.speed*2.237*100)/100 + " MPH");
    todayCard.append(wind);
    const hum = $('<p>').text('Humidity: ' + data.list[0].main.humidity + " %");
    todayCard.append(hum);
        

    // Append the new div to the div with id "today-weather"
    $('#today-weather').append(todayCard);
}

function createFutureCard(data, i){
    const futureCard = $('<div>');
    futureCard.attr('class', 'future-weather-card');

    // Create and append h2 element
    const date = $('<h2>').text(substringDate(`(${data.list[i].dt_txt})`));

    futureCard.append(date);

    
    const code = data.list[i].weather[0].icon;
    const cloudIcon = $('<img>').attr('src', `https://openweathermap.org/img/wn/${code}@2x.png`);
    futureCard.append(cloudIcon);
    const temp = $('<p>').text('Temp: ' + data.list[i].main.temp + " ");
    futureCard.append(temp);
    // vanilla data is m/s, so multiply 2.237 to get MPH. 
    // Do round(num*100)/100 to acheive two decimal places
    const wind  = $('<p>').text('Wind: ' + Math.round(data.list[i].wind.speed*2.237 *100)/100 + " MPH");
    futureCard.append(wind);
    const hum = $('<p>').text('Humidity: ' + data.list[i].main.humidity + " %");
    futureCard.append(hum);

    // Add it to future weather
    $('#future-weather').append(futureCard);
}

// Use the weather code from API and get respective photo.
function getWeathIcon(code){
    const API = `https://openweathermap.org/img/wn/${code}@2x.png`;
    fetch(API).then(function(response){
        console.log(response);
    });

}

// Function to substring only the date info from given string
function substringDate(date){
    return date.substring(1,11);
}