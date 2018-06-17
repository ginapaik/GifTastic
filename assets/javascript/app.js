// Creating a food array

var foodList = ["pasta", "pizza", "ice cream", "banana", "steak", "cheeseburger", "broccoli", "carrots", "chocolate"];

function renderButtons() {
    $("#foodButtons").empty();
    // Loop through the foodList array
    for (var i = 0; i < foodList.length; i++) {
      // Then dynamicaly generate buttons for each food item in the array.
      var a = $("<button>");
      // Adding a class
      a.addClass("food");
      // Adding a data-attribute with a value of the food item at index i
      a.attr("data-name", foodList[i]);
      // Providing the button's text with a value of the food item at index i
      a.text(foodList[i]);
      // Adding the button to the HTML
      $("#foodButtons").append(a);
    }
  }

  // Adding new food items to the foodList array and generating new buttons to the page
  $("#add-food").on("click", function(event) {
    event.preventDefault();
    // This line will grab the text from the input box
    var food = $("#food-input").val().trim();
    // The food from the textbox is then added to our array
    foodList.push(food);
    // This clears the input textbox
    $("#food-input").val("");
    // calling renderButtons which handles the processing of our foodList array
    renderButtons();
  });

  renderButtons();

  
  // Generating gifs and ratings when buttons are clicked
  $("button").on("click", function() {
    // clears out previous gifs
    $("#foodGifs").empty();
    var food = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      food + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        console.log(queryURL);

        console.log(response);
      
        var results = response.data;
        // Looping through each result item
        for (var i = 0; i < results.length; i++) {   
          // Creating and storing div and p tags
          var foodDiv = $("<div>");
          foodDiv.addClass("newDiv");

          var p = $("<p>").text("Rating: " + results[i].rating);
          // Creating and storing an image tag
          var foodImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          foodImage.attr("src", results[i].images.fixed_height.url);
          foodImage.attr("data-still", results[i].images.fixed_height_still.url);
          foodImage.attr("data-animate", results[i].images.fixed_height.url);
          foodImage.attr("data-state", "animate");
          // Appending the paragraph and image tag to the foodDiv
          foodDiv.append(p);
          foodDiv.append(foodImage);
          // Prependng the foodDiv to the HTML page in the "#foodGifs" div
          $("#foodGifs").prepend(foodDiv);
        }


        $("img").on("click", function() {
            var state = $(this).attr("data-state");
            if (state = "animate") {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
            else {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
       
        });
      });
  });


