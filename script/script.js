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
        $('ul').empty();
        foodAndBeer.displayPairings(res) // ADD - CALL FUNCTION THAT DISPLAYS BEER PAIRINGS
    })
}


foodAndBeer.displayPairings = function(pairing){
    console.log(pairing)
    pairing.forEach((beer)  => {
    const title = $('<h2>').text(beer.name)
    const description  = $('<p>').text(beer.food_pairing) 
    const image =$('<img>').attr({"src":beer.image_url}) 
    const displayedBeer = $('<li>').append(title, description, image)
    $('ul').append(displayedBeer)
    })
}   


//Functions that happen on page load
foodAndBeer.init = function() {
    $('.foodDropdown').on('change', function(event){
        event.preventDefault();
        const foodDropdown = $(this).val();
        console.log(foodDropdown)
        foodAndBeer.getPairings(foodDropdown);
    });

    // $('.searchbar').on('submit', function(event){
    //     console.log('HI YOU SEARCHED');
    //     event.preventDefault();
    //     const foodSearch= $(this).val();
    //     console.log(foodSearch)
    //     foodAndBeer.getPairings(foodSearch);
    // });

    $('form').submit(function(event) {
        console.log('HI YOU SEARCHED');
        event.preventDefault();
        const foodSearch= $('.searchbar').val();
        console.log(foodSearch)
        foodAndBeer.getPairings(foodSearch);
      });

    // 'input:text[class=‘searchbar’]'

}

// Document Ready
$(function() {
foodAndBeer.init();
});