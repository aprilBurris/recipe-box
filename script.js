const input = document.getElementById("recipe-id");
const button = document.getElementById("get-btn");
const statusText = document.getElementById("status");
const recipeArea = document.getElementById("recipe");


async function loadRecipe() {
  const url = "https://dummyjson.com/recipes/" + input.value;

  recipeArea.textContent = ""; // clear the old recipe

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