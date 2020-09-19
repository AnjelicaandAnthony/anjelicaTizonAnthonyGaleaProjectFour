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
    
    for (let i = 0; i <= 2; i = i + 1) {
        const title = $('<h2>').text(pairing[i].name)
        const description  = $('<p>').text(pairing[i].food_pairing) 
        const image =$('<img>').attr({"src":pairing[i].image_url}) 
        const displayedBeer = $('<li>').append(title, description, image)

        $('ul').append(displayedBeer)
        // $('li').toggleClass()
        
        // $("#seeMore").click(function(e){
        //     e.preventDefault();
        //     $("div:hidden").slice(0,3).fadeIn("slow");
            
        //     if($("div:hidden").length == 0){
        //         $("#seeMore").fadeOut("slow");
        //     }
        // });     
    }

    $('.showMoreButton').on('click', function(event){
        event.preventDefault();
        console.log('hello')
        
        for (let i = 3; i <= 5 ; i = i + 1) {
            const title = $('<h2>').text(pairing[i].name)
            const description  = $('<p>').text(pairing[i].food_pairing) 
            const image =$('<img>').attr({"src":pairing[i].image_url}) 
            const displayedBeer = $('<li>').append(title, description, image)
    
            $('ul').append(displayedBeer)
        }
    });   
    
    // pairing.forEach((beer)  => {
    // const title = $('<h2>').text(beer.name)
    // const description  = $('<p>').text(beer.food_pairing) 
    // const image =$('<img>').attr({"src":beer.image_url}) 
    // const displayedBeer = $('<li>').append(title, description, image)
    
    // const threeDisplayedBeers = displayedBeer.slice(0,2)
    // console.log(threeDisplayedBeers)

    // $('ul').append(displayedBeer)

    // })
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