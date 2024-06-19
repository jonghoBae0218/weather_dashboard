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

function doFetch(api){
    fetch(api).then(function (response) {
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
}
// $(document).ready(function() {
//     $('#search-button').on('click', function() {
//         var searchTerm = $('#search-input').val();
//         console.log('Search term:', searchTerm);

//         // Further processing based on the search term
//         // For example, you can initiate an AJAX request, filter data, or update the UI.
//     });
// });