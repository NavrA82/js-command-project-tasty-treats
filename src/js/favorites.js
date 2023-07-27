const localStorageRecipes = localStorage.getItem("recipes");

if (localStorageRecipes) {
  const recipeList = document.querySelector(".recipe-list");

  localStorageRecipes.forEach(recipe => {
    const recipeItem = document.createElement("li");
    recipeItem.textContent = recipe.title;
    recipeList.appendChild(recipeItem);
  });
} else {
  document.querySelector(".favorites").textContent = "No favorites found.";
}