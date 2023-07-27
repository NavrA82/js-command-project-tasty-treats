// const localStorageRecipes = localStorage.getItem("recipes");

// if (localStorageRecipes) {
//   const recipeList = document.querySelector(".recipe-list");

//   const recipes = JSON.parse(localStorageRecipes);
//   recipes.forEach(recipe => {
//     const recipeItem = document.createElement("li");
//     recipeItem.textContent = recipe.title;
//     recipeList.appendChild(recipeItem);
//   });
// } else {
//   document.querySelector(".favorites").textContent = "No favorites found.";
// }

// const localStorageRecipes = localStorage.getItem("recipes");

// if (localStorageRecipes) {
//   const recipeList = document.querySelector(".recipe-list");

//   const recipes = JSON.parse(localStorageRecipes);
//   recipes.forEach(recipe => {
//     const recipeItem = document.createElement("li");
//     recipeItem.textContent = recipe.title;
//     recipeList.appendChild(recipeItem);
//   });
// } else {
//   document.querySelector(".favorites").textContent = "No favorites found.";
// }

function loadFavorites() {
  const recipes = localStorage.getItem("recipes");
  if (!recipes) {
    document.getElementById("favorites").innerHTML = "No favorites found.";
    return;
  }
  const recipeList = document.getElementById("recipe-list");
  for (const i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const recipeItem = document.createElement("li");
    recipeItem.textContent = recipe.title;
    recipeList.appendChild(recipeItem);
  }
}