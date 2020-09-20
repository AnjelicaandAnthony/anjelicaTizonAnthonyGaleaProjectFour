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
        // console.log(res)
        $('ul').empty();
        foodAndBeer.displayPairings(res)
    })
}

foodAndBeer.displayPairings = function(pairing){
    console.log(pairing.slice(0,2))
    
    // OG CODE
    pairing.forEach((beer) => {
        const beerName = $('<h2>').text(beer.name)
        const pairing = $('<p>').text(`Goes well with: ${beer.food_pairing}`)
        const image = $('<div>').append($('<img>').attr({'src': beer.image_url}))

        const displayedBeer = $('<li>').append(beerName, pairing, image)

        // appends each beer to the page - but doesn't display them - display:none is applied on the <li>'s
        $('ul').append(displayedBeer)
        $('.showMoreButton').show()
        $('.restart').hide()

        // targets the first 3 <li>'s and shows them
        $('li').slice(0,3).show();
    })

    // When clicking load more button:
        // - prevent default
        // - get the next 3 pairings and fade in slow
    // Has to go outside of the loop or else it will load them all
    $(".showMoreButton").click(function(e){
        e.preventDefault();
        console.log('3 more')
        $("li:hidden").slice(0,3).fadeIn("slow");
    // There is a problem here because the console logs more than 1 click

    // if the number of hidden <li>'s is 0, fade out the how more button
    if($("li:hidden").length == 0){
        $(".showMoreButton").fadeOut("slow");
        $(".restart").fadeIn("slow");
        }
    })  
}

//Functions that happen on page load
foodAndBeer.init = function() {
    $('.foodDropdown').on('change', function(event){
        event.preventDefault();
        const foodDropdown = $(this).val();
        // console.log(foodDropdown)
        foodAndBeer.getPairings(foodDropdown);
    });

    $('form').submit(function(event) {
        // console.log('HI YOU SEARCHED');
        event.preventDefault();
        const foodSearch= $('.searchbar').val();
        // console.log(foodSearch)
        foodAndBeer.getPairings(foodSearch);
      });
}

// Document Ready
$(function() {
foodAndBeer.init();
});