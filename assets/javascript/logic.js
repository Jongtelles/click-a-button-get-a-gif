var topics = ["grilled cheese", "butter chicken", "french fries", "chicken and waffles", "sushi", "chicken wings", "poached egg", "gyro"];

var search = $("#search").val().trim();


var queryUrl = ("http://api.giphy.com/v1/gifs/search?q" + search + "&api_key=5FSzsi9N2ELO4W6fF57lalA1rXicaxgG&limit=10");

$.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function (response) {});

$(".gif").on("click", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});