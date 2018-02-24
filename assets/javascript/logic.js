var topics = ["grilled cheese", "tacos", "french fries", "chicken and waffles", "sushi", "chicken wings", "poached egg", "gyro", "burrito"];

var buttonMaker = function () {
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.append(topics[i]);
        button.addClass("btn");
        button.addClass("gifBtn");
        button.attr("data-name", topics[i]);
        $("#btnsHere").append(button);
    }
}

buttonMaker();

$(document).on("click", ".gifBtn", function () {
    $("#gifsGoHere").empty();
    // maybe add some animation for when gifs are loading
    var btnName = $(this).attr("data-name");
    var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + btnName + "&api_key=5FSzsi9N2ELO4W6fF57lalA1rXicaxgG&limit=10&rating=pg";
    console.log(btnName);
    console.log(queryUrl);
    $.ajax({
            url: queryUrl,
            method: "GET"
        })
        .then(function (response) {
            // make the gifs
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r") {
                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating.toUpperCase());
                    var foodGif = $('<img class="">');
                    foodGif.attr("src", results[i].images.fixed_height_still.url);
                    foodGif.attr("data-still", results[i].images.fixed_height_still.url);
                    foodGif.attr("data-animate", results[i].images.fixed_height.url);
                    foodGif.attr("data-state", "still");
                    foodGif.addClass("gif");
                    gifDiv.addClass("gif-style");
                    p.addClass("text-center");
                    p.addClass("mt-3");
                    gifDiv.append(foodGif);
                    gifDiv.append(p);
                    $("#gifsGoHere").prepend(gifDiv);
                }
            }
        });
});
$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$("#add").on("click", function () {
    event.preventDefault();
    var userInput = $("#userInput").val().toLowerCase();
    topics.push(userInput);
    $("#btnsHere").empty();
    buttonMaker();
    console.log(topics);
});