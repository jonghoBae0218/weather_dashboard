console.log("JS init");

const longAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=london&limit=5&appid=54ce6fe12fbefa3507abb38187d01121'
let lat=0;
let lon=0;
fetch(longAPI).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        lat = data[0].lat;
        lon = data[0].lon;
        const weathAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=54ce6fe12fbefa3507abb38187d01121`

        fetch(weathAPI).then(function(response){
            if(response.ok){
                response.json().then(function(data){
                    console.log(data);
                })
            }else{
                console.log('bad');
            }
        })
      });
    }
});
console.log(lat + ", "  + lon );



