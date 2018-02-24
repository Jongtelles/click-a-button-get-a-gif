var topics = ["grilled cheese", "tacos", "french fries", "fried chicken", "sushi", "chicken wings", "poached egg", "cheeseburger", "burrito"];

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
// creates initial buttons
buttonMaker();

$(document).on("click", ".gifBtn", function () {
    event.preventDefault();
    // this conditional will run only once, alerting the user to click the gifs to get them to animate
    var info = $("#info").attr("class");
    if (info == "row justify-content-center temp") {
        $("#info").html('<h2 class="animated lightSpeedIn">click gifs to animate, click again to stop</h2>');
        $("#info").removeClass("temp");
    }
    // empty out gifs so they don't clutter the page
    $("#gifsGoHere").empty();
    var btnName = $(this).attr("data-name");
    var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + btnName + "&api_key=5FSzsi9N2ELO4W6fF57lalA1rXicaxgG&limit=10&rating=pg";
    // var queryUrl = "http://api.giphy.com/v1/gifs/random?api_key=5FSzsi9N2ELO4W6fF57lalA1rXicaxgG&limit=10&rating=pg&tag=" + btnName;
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
                    gifDiv.addClass("animated");
                    gifDiv.addClass("flipInX");
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
        $(this).addClass("animated");
        $(this).addClass("bounce");
        $(this).removeClass("pulse");
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).addClass("animated");
        $(this).addClass("pulse");
        $(this).removeClass("bounce");
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
// on click listener for our add button
$("#add").on("click", function () {
    event.preventDefault();
    var userInput = $("#userInput").val().toLowerCase();
    if (userInput == "") {
        // after adding the class shake and triggering the css animate animation, wait for the end of the animation, then remove the shake class so it will be repeated when conditions are met (there's nothing in the userInput field)
        $("#userInput").addClass("shake").one("animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd", function () {
            $(this).removeClass("shake");
        });
        $("#userInput").attr("placeholder", "please enter a food!");
        return;
    }
    topics.push(userInput);
    $("#btnsHere").empty();
    buttonMaker();
    $("#userInput").attr("placeholder", "add your own!");
    $("#userInput").val("");
});
// allows hitting enter to trigger a click on our add button
$("#userInput").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#add").click();
    }
});