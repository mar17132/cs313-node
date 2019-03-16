
var movieDivs = $('.movieSearch');
var movieText = $('#movieSearchTxt');
var movieButton = $('#movieSearchBtn');
var formDiv = $('.form');
var movieList = $('.movie-list');
var movieDisplay = $('.movie-display');
var movieDisButton = $('.movie-display-button');

var title = $('#title');
var poster = $('#poster');
var plot = $('#plot');


function hideAllMovieDiv()
{
    movieDivs.hide();
}


function showActiveDiv(elm)
{
    elm.show();
}

function apiCall(callTyp,value)
{
    var returnJsonObj = null;
    var sendString = "";
    var xhttp = new XMLHttpRequest();

    if(callTyp == "search")
    {
        sendString = "&s=" + value;
    }
    else
    {
        sendString = "&i=" + value;
    }

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
        {
            returnJsonObj = JSON.parse(this.responseText);

            if(callTyp == "search")
            {
                listMovies(returnJsonObj);
            }
            else
            {
                displayMovie(returnJsonObj);
            }
        }
    };
    xhttp.open("GET", "http://www.omdbapi.com/?apikey=66440cc3&r=json&type=movie" + sendString, true);
    xhttp.send();
}

function listMovies(jsonObj)
{
    if(jsonObj.Search)
    {
        newTable = createTable();
        $.each(jsonObj.Search,function(index,value){
            newRow = $("<tr></tr>");

            titleCell = $('<td></td>');
            titleCell.text(value.Title);

            yearCell = $('<td></td>');
            yearCell.text(value.Year);

            optionCell = $('<td></td>');
            optionButton = $("<input type='button' value='View Movie' class='movie-display-button'/>");
            hiddenValue = $("<input type='hidden' class='movie-id' value='" + value.imdbID + "'/>");
            optionButton.appendTo(optionCell);
            hiddenValue.appendTo(optionCell);

            titleCell.appendTo(newRow);
            yearCell.appendTo(newRow);
            optionCell.appendTo(newRow);

            newRow.appendTo(newTable);
        });

        newTable.appendTo(movieList);
    }
    else
    {
        movieList.html("<h3>No movie found</h3>");
    }
}

function createTable()
{
    newTable = $("<table class='movieTable' ></table>");
    newRow = $("<tr></tr>");
    titleHeader = $('<th>Title</th>');
    YearHeader = $('<th>Year</th>');
    optionHeader = $('<th>Options</th>');

    titleHeader.appendTo(newRow);
    YearHeader.appendTo(newRow);
    optionHeader.appendTo(newRow);
    newRow.appendTo(newTable);

    return newTable;
}


function displayMovie(jsonObj)
{
    title.text(jsonObj.Title);
    poster.attr('src',jsonObj.Poster);
    plot.text(jsonObj.Plot);
}

movieButton.on('click',function(){
    hideAllMovieDiv();
    showActiveDiv(movieList);
    apiCall('search',movieText.val());
});


movieList.on('click','.movie-display-button',function(){
    hideAllMovieDiv();
    showActiveDiv(movieDisplay);
    getID = $(this).next('.movie-id').val();
    apiCall('movie',getID);
});

$(document).ready(function(){
    hideAllMovieDiv();
    showActiveDiv(formDiv);
});
