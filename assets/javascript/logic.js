var topics = ["grilled cheese", "tacos", "french fries", "fried chicken", "sushi", "chicken wings", "poached egg", "cheeseburger", "burrito"];
// for loop that creates buttons from the topics array
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

// document listener is necessary because new button elements are being created
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
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + btnName + "&api_key=5FSzsi9N2ELO4W6fF57lalA1rXicaxgG&limit=10&rating=pg";
    $.ajax({
            url: queryUrl,
            method: "GET"
        })
        .then(function (response) {
            // make the gifs and give them the data info that will be called later to toggle the gifs from animate and still
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r") {
                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating.toUpperCase());
                    var foodGif = $('<img>');
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
// another document listener because new elements are being created, changes gifs from animating to still with associated css.animate classes
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
// on click listener for our button that adds new buttons
$("#add").on("click", function () {
    event.preventDefault();
    var userInput = $("#userInput").val().toLowerCase();
    if (userInput == "") {
        // after adding the class shake and triggering the css animate animation, wait for the end of the animation, then remove the shake class so it will be repeated when conditions are met (if the button is clicked when there's nothing in the userInput field)
        $("#userInput").addClass("shake").one("animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd", function () {
            $(this).removeClass("shake");
        });
        $("#userInput").attr("placeholder", "please enter a word!");
        return;
    }
    // adds user input to the topics array, clears the DOM of the buttons and remakes the buttons with user's input
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