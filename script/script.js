// Namespacing
const foodAndBeer = {};

// AJAX call to API
// pass in "food" parameter with a variable that the user enters

foodAndBeer.getPairings = function(){
    $.ajax({
        url: 'https://api.punkapi.com/v2/beers',
        method: 'GET',
        responseType: 'JSON',
        data: {
            food: 'chicken'
        }
    }).then((res) => {
        console.log(res)
    })
}

// Event listeners:



//Functions that happen on page load
foodAndBeer.init = function() {
    foodAndBeer.getPairings()
  }
  
// Document Ready
$(function() {
foodAndBeer.init();
});