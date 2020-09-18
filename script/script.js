// Namespacing
const foodAndBeer = {};

foodAndBeer.getPairings = function(userChoice){
    $.ajax({
        url: 'https://api.punkapi.com/v2/beers',
        method: 'GET',
        responseType: 'JSON',
        data: {
            food: userChoice
        }
    }).then((res) => {
        console.log(res)
        foodAndBeer.displayPairings(res) // ADD - CALL FUNCTION THAT DISPLAYS BEER PAIRINGS
    })
}


foodAndBeer.displayPairings = function(pairing){
    console.log(pairing);

}


//Functions that happen on page load
foodAndBeer.init = function() {
    $('.foodDropdown').on('change', function(event){
        event.preventDefault();
        const foodDropdown = $(this).val();
        console.log(foodDropdown)
        foodAndBeer.getPairings(foodDropdown);
    })
  }
  
// Document Ready
$(function() {
foodAndBeer.init();
});