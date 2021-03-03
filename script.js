const Url = "https://tastedive.com/ask/ws";  
const accessKey = "403876-JacobBra-TTTBUVGF";

function getDataFromAPI(theQuery, callbackFunc)
{    
    $.ajax({
        url: `${'https://tastedive.com/ask/ws'}`,
        type: "get",
        dataType: "jsonp",        
        data: {
            q: `${theQuery}`,
            format: "json",
            type: "movies",
            info: 1,
            limit: 10,
            k: `${accessKey}`,             
        }    
    })        
        .done(callbackFunc)  
        .fail(function() {
            alert("Movie could not be found, please try again!");
    }); 
}



function renderResult(result) {   
    return `      
      <div class="result">
        <p class="bold"> ${result.Name} </p>
        <iframe width=100% height=200 src="https://www.youtube.com/embed/${result.yID}?feature=oembed\" frameborder="0" allowfullscreen></iframe> 
        <p class="description"> ${result.wTeaser}</p>        
        <p>\n</p>
      </div>      
    `;    
}



function displayDataFromAPI(data)
{   
    if(data.Similar.Results.length === 0)
    {
        $('.js-search-results').html(`        
          <p class="bold"> Movies for this search not found. </p>       
        `);
    }
    else
    {
        const results = data.Similar.Results.map((item, index) => renderResult(item));
    
        $('.js-search-results').html(results); 
    } 
     
}


function GetSearchQuery(event){
    return $(event.currentTarget).find('.js-query').val();    
    
}


function handleGetMoviesButtonClick()
{    //This is event handler for the search button on search page 
    // will produce a description of suggested movies along with youtube preview of movie.
    
    $('.js-form').on('submit', function(event) {
        event.preventDefault();
        
        let searchQuery = GetSearchQuery(event);

        $(event.currentTarget).find('.js-query').val('');
        //will pull data from api
        getDataFromAPI(searchQuery, displayDataFromAPI);        
                
    });    
}

function displaySearchPage()
{
    //will flip from home page to search page on enter click
    $('div.homePage').remove();    
    $('div.searchPage').prop('hidden', false);  
    $('html').removeClass('homePageBackground');
    $('html').addClass('searchPageBackground');  
}

function handleEnterButtonClick()
{
    //fucntion for enter click, user will be brought from home page to search page. 
    $('.homePage').on('click', '.js-enterButton',function (event) {        
        event.preventDefault();
        displaySearchPage();
    });
}

function handleMovieApp()
{
    //call back function that will handle all in app events. 
    handleEnterButtonClick();
    handleGetMoviesButtonClick(); 
}

$(handleMovieApp);
