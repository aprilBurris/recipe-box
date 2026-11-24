const input = document.getElementById("recipe-id");
const button = document.getElementById("get-btn");
const statusText = document.getElementById("status");
const recipeArea = document.getElementById("recipe");


async function loadRecipe() {

  const url = "https://dummyjson.com/recipes/" + input.value;

  recipeArea.textContent = "";   // clear the old recipe first

 statusText.textContent = "Loading...";


  const response = await fetch(url);

  if (!response.ok) {
    statusText.textContent = "Recipe not found. Try entering a number 1-50.";
    return;
  }

  const recipe = await response.json();
  console.log(recipe);
  statusText.textContent = "";

  
  const card = document.createElement("div");
  card.className = "card p-3";

  const title = document.createElement("h2");
  title.className = "h4";
  title.textContent = recipe.name;
  card.appendChild(title);

 recipeArea.appendChild(card);

  const cuisine = document.createElement("h2");
  cuisine.className = "fs-3 h4";
  cuisine.textContent = `This is an ${recipe.cuisine} cuisine!`;
  card.appendChild(cuisine);


  const ready = document.createElement("h2");
  ready.className = "fs-3 h4";
  ready.textContent = `Ready in ${recipe.prepTimeMinutes} minutes!`;
  card.appendChild(ready);

  recipeArea.appendChild(card);



}

button.addEventListener("click", loadRecipe);


const dishInput = document.getElementById("dish-name");
const postButton = document.getElementById("post-btn");
const postStatus = document.getElementById("post-status");
const savedArea = document.getElementById("saved");

async function addDish() {
  savedArea.textContent = "";

  const response = await fetch("https://dummyjson.com/recipes/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: dishInput.value })
  });
  const newDish = await response.json();
  console.log(newDish);

  const message = document.createElement("p");
  message.className = "alert alert-success";
  message.textContent = 'Added "' + newDish.name + '" as recipe #' + newDish.id + " (practice server: not really saved)";
  savedArea.appendChild(message);

  dishInput.value = "";   // clear the box for the next dish
}

postButton.addEventListener("click", addDish);