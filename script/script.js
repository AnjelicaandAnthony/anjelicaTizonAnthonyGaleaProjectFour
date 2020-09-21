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
        $('ul').empty();
        foodAndBeer.displayPairings(res)
    });
};

foodAndBeer.displayPairings = function(pairing){
    
    pairing.forEach((beer) => {
        const beerName = $('<h2>').text(beer.name);
        const pairing = $('<p>').text(`Goes well with: ${beer.food_pairing}`);
        const image = $('<img>').attr({'src': beer.image_url});

        const displayedBeer = $('<li>').append(beerName, pairing, image);

        // Appends each beer to the page - but doesn't display them - display:none is applied on the <li>'s
        $('ul').append(displayedBeer);
        $('.showMoreButton').show();
        $('.restart').hide();

        // Targets the first 3 <li>'s and shows them
        $('li').slice(0,3).show();
    });
};

//Functions that happen on page load/app initialization
foodAndBeer.init = function() {

     // Event listener for a submit event on the form
     $('form').submit(function(event) {
        event.preventDefault();
        const foodSearch= $('.searchbar').val();
        foodAndBeer.getPairings(foodSearch);
    });

    // Event listener for a change in dropdown selection
    $('.foodDropdown').on('change', function(event) {
        event.preventDefault();
        const foodDropdown = $(this).val();
        foodAndBeer.getPairings(foodDropdown);
    });

    // Event Listener for clicking load more button: get the next 3 pairings and fade in slow
    $('.showMoreButton').on('click', function(){
        $('li:hidden').slice(0,3).fadeIn('slow');

        // if the number of hidden <li>'s is 0, fade out the how more button
        if($('li:hidden').length == 0){
            $('.showMoreButton').fadeOut('slow');
            $('.restart').fadeIn('slow');
        };
    });

    // Reload the page when restart button is clicked
    $('.restart').click(function() {
        location.reload();
    });
};

// Document Ready
$(function() {
    foodAndBeer.init();
});