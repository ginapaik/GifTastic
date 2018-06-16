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


  $("button").on("click", function() {

    $("#foodGifs").empty();
    // Grabbing and storing the data-animal property value from the button
    var food = $(this).attr("data-name");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      food + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {
            
          // Creating and storing a div tag
          var foodDiv = $("<div>");
          foodDiv.addClass("newDiv");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var foodImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          foodImage.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and image tag to the animalDiv
          foodDiv.append(p);
          foodDiv.append(foodImage);

          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $("#foodGifs").prepend(foodDiv);
          
         
        }
      });
  });
