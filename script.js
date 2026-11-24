const input = document.getElementById("recipe-id");
const button = document.getElementById("get-btn");
const statusText = document.getElementById("status");
const recipeArea = document.getElementById("recipe");

const dishInput = document.getElementById("dish-name");
const postButton = document.getElementById("post-btn");
const postStatus = document.getElementById("post-status");
const savedArea = document.getElementById("saved");


async function loadRecipe() {

  const url = "https://dummyjson.com/recipes/" + input.value;

  // check if the input is empty before making a request
  if (input.value === ""){
    statusText.textContent = "Type a number first.";
    return; //stop function
  }

  try {
  recipeArea.textContent = "";   // clear the old recipe first

 statusText.textContent = "Loading...";

// fetch recipe data from API
  const response = await fetch(url);

  // Check if the server returned an error
  if (!response.ok) {
    statusText.textContent = "Recipe not found. Try entering a number 1-50.";
    return; //stop function
  }

  // Parse the JSON data from the response
  const recipe = await response.json();
  console.log(recipe);
  statusText.textContent = ""; // Clear the "Loading..." message

  // Create the main Bootstrap card container
  const card = document.createElement("div");
  card.className = "card p-3";

  // Create and append the recipe title
  const title = document.createElement("h2");
  title.className = "h4";
  title.textContent = recipe.name;
  card.appendChild(title);

 recipeArea.appendChild(card);

 // Create and append the cuisine type
  const cuisine = document.createElement("h2");
  cuisine.className = "fs-3 h4";
  cuisine.textContent = `This is an ${recipe.cuisine} cuisine!`;
  card.appendChild(cuisine);

// Create and append the preparation time
  const ready = document.createElement("h2");
  ready.className = "fs-3 h4";
  ready.textContent = `Ready in ${recipe.prepTimeMinutes} minutes!`;
  card.appendChild(ready);

  // Add the completed card to the page
  recipeArea.appendChild(card);

  // Handle network failures or unexpected code errors
  } catch(error) {
    postStatus.textContent = "Can't reach the recipe server. Check your internet.";
  }

}
// get recipe button
button.addEventListener("click", loadRecipe);


// Define an async function to handle adding a new dish
async function addDish() {
    // Check if the input field is empty
    if (dishInput.value === ""){
        // Display a prompt telling the user to enter a dish name
        postStatus.textContent = "Type a dish name first.";
        return; // Stop the function early
    }
    // Start a try block to safely handle network requests or potential errors
    try {

// Clear any previously displayed content in the saved area
  savedArea.textContent = "";

// Update the status message to show that the request is in progress
  postStatus.textContent = "Sending...";
  const response = await fetch("https://dummyjson.com/recipes/add", {
    method: "POST", // Specify the HTTP method //POST is used for creating/sending new data
    headers: { "Content-Type": "application/json" }, // Tell the server that the incoming request body is formatted as JSON
    body: JSON.stringify({ name: dishInput.value }) // Convert the JavaScript object containing the input field's value into a JSON string
  });

  // Check if the server returned an error status
  if (!response.ok) {
    postStatus.textContent = "The server didn't add it. Try again.";
    return; // Stop running function
  }
  // Parse the JSON data returned by the server
  const newDish = await response.json();
  // Clear any previous loading or error status messages
  postStatus.textContent = "";
  console.log(newDish);

  // Create a new paragraph element to display the success message
  const message = document.createElement("p");
  message.className = "alert alert-success";
  message.textContent = 'Added "' + newDish.name + '" as recipe #' + newDish.id + " (practice server: not really saved)";
  savedArea.appendChild(message); // Add the new message to the page

  dishInput.value = "";   // clear the box for the next dish
  // Handle network errors
} catch(error) {
  postStatus.textContent = "Can't reach the recipe server. Check your internet.";
}
}
  // add it button
postButton.addEventListener("click", addDish);