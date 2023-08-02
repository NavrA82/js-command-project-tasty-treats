import axios from 'axios';
let recipe;
const backdrop = document.querySelector('.backdrop-recipes');
const modal = document.querySelector('.modal-recipe');
const closeBtn = document.querySelector('.modal-close-btn-recipe');

closeBtn.addEventListener('click', closeModalRecipe);
document.addEventListener('keydown', onEscKeyPress);
backdrop.addEventListener('click', event => {
  if (event.target !== modal && !modal.contains(event.target)) {
    closeModalRecipe();
  }
});

function openModalRecipe() {
  if (modal) {
    modal.classList.remove('is-hidden');
    backdrop.classList.remove('is-hidden');
    document.addEventListener('keydown', onEscKeyPress);

    modal.addEventListener('click', event => {
      event.stopPropagation();
    });

    backdrop.removeEventListener('click', closeModalRecipe);
    backdrop.addEventListener('click', closeModalRecipe);
  }
}

function closeModalRecipe() {
  if (modal) {
    const recipeVideoIframe = document.querySelector('.recipe-iframe-video');
    recipeVideoIframe.src = '';
    modal.classList.add('is-hidden');
    document.removeEventListener('keydown', onEscKeyPress);
    backdrop.removeEventListener('click', closeModalRecipe);
    backdrop.classList.add('is-hidden');
  }
}

function onEscKeyPress(event) {
  if (event.key === 'Escape') {
    closeModalRecipe();
  }
}

backdrop.addEventListener('click', event => {
  if (event.target === backdrop) {
    closeModalRecipe();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const recipesContainer = document.querySelector('.pictures-gallery');
  const popularList = document.querySelector('.popular-recipes');

  recipesContainer.addEventListener('click', async event => {
    const seeRecipeBtn = event.target.closest('.good-recipes');
    if (!seeRecipeBtn) return;

    const recipeId = seeRecipeBtn.dataset.id;
    try {
      const fetchedRecipe = await fetchRecipe(recipeId);
      if (fetchedRecipe) {
        recipe = fetchedRecipe;
        updateFavoriteButtonStatus(recipe);
        openModalRecipe();
      }
    } catch (error) {
      console.log(error);
    }
  });

  popularList.addEventListener('click', async event => {
    const listItem = event.target.closest('.article-poprecipes');
    if (!listItem) return;

    const recipeId = listItem.dataset.id;
    try {
      const fetchedRecipe = await fetchRecipe(recipeId);
      if (fetchedRecipe) {
        recipe = fetchedRecipe;
        updateFavoriteButtonStatus(recipe);
        openModalRecipe();
      }
    } catch (error) {
      console.log(error);
    }
  });
});

async function fetchRecipe(recipeId) {
  console.log(recipeId);
  const url = `https://tasty-treats-backend.p.goit.global/api/recipe/${recipeId}`;
  try {
    const response = await axios.get(url);
    const recipe = response.data;
    displayRecipeVideo(recipe);
    displayRecipeTitle(recipe);
    displayRecipeDescription(recipe);
    displayRecipeTimeCooking(recipe);
    displayRecipeRating(recipe);
    displayRecipeHashtags(recipe);
    displayRecipeIngredients(recipe);
    displayStarRating(recipe);
    return recipe;
  } catch (error) {
    console.log(error);
  }
}

function displayRecipeVideo(recipe) {
  const recipeVideoIframe = document.querySelector('.recipe-iframe-video');
  recipeVideoIframe.src = '';
  const youtubeLink = recipe.youtube;
  const videoId = getVideoIdFromLink(youtubeLink);
  recipeVideoIframe.src = `https://www.youtube.com/embed/${videoId}`;
}

function getVideoIdFromLink(link) {
  const regex =
    /(?:https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu\.be\/)([\w-]+)/i;
  const matches = link.match(regex);
  return matches && matches[1] ? matches[1] : '';
}

function displayRecipeTitle(recipe) {
  const recipeTitleEl = document.querySelector('.recipe-title');
  recipeTitleEl.textContent = recipe.title;
}

function displayRecipeDescription(recipe) {
  const recipeTitleEl = document.querySelector('.recipe-description');
  recipeTitleEl.textContent = recipe.instructions;
}

function displayRecipeTimeCooking(recipe) {
  const tmeCookingEl = document.querySelector('.recipe-cooking-time');
  tmeCookingEl.textContent = recipe.time;
}

function displayRecipeRating(recipe) {
  const recipeRatingEl = document.querySelector('.rating-recipe-value');
  recipeRatingEl.textContent = recipe.rating;
}

function displayRecipeHashtags(recipe) {
  const recipeHashtagsEl = document.querySelector('.recipe-hashtags-list');
  recipeHashtagsEl.innerHTML = recipe.tags
    .map(tag => `<li class="recipe-hashtags-item">#${tag}</li>`)
    .join('');
}

function displayRecipeIngredients(recipe) {
  const recipeIngredientsEl = document.querySelector('.recipe-components-list');
  recipeIngredientsEl.innerHTML = recipe.ingredients
    .map(
      ({ measure, name }) => `
    <li class="recipe-components-item">
      <p class="recipe-components-item_name">${name}</p>
      <p class="recipe-components-item_quantity">${measure}</p>
    </li>
  `
    )
    .join('');
}

function displayStarRating(recipe) {
  const ratingValue = parseFloat(recipe.rating);
  const starElements = document.querySelectorAll(
    '.modal-recipe-rating-star-icon'
  );

  for (let i = 0; i < starElements.length; i++) {
    if (i < ratingValue) {
      starElements[i].classList.add('active');
    } else {
      starElements[i].classList.remove('active');
    }
  }
}
// Додавання/видалення рецептів в localStorage

// Функція для отримання списку обраних рецептів з localStorage
function getFavoriteRecipes() {
  const favoriteRecipes =
    JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  return favoriteRecipes;
}
// Функція для збереження списку обраних рецептів з localStorage
function saveFavoriteRecipes(favoriteRecipes) {
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
}
//  Функція для видалення рецепту зі списку обраних рецептів в localStorage
function removeFromFavorites(recipe) {
  const favoriteRecipes = getFavoriteRecipes();
  const updatedFavorites = favoriteRecipes.filter(
    favoriteRecipe => favoriteRecipe._id !== recipe._id
  );
  saveFavoriteRecipes(updatedFavorites);
}

// Чіпляємося до кнопки "Add to favorite"
const addToFavoriteButton = document.querySelector('.btn-recipe-add-favorite');

// Функція перевірки перебування рецепта в localStorage
function isRecipeInFavorites(recipe) {
  const favoriteRecipes = getFavoriteRecipes();
  return favoriteRecipes.some(
    favoriteRecipe => favoriteRecipe._id === recipe._id
  );
}
// Функція для додавання/видалення обраного рецепту з масиву localStorage
function addToFavorites(recipe) {
  const favoriteRecipes = getFavoriteRecipes();
  const { _id, title, category, rating, preview, description } = recipe;

  const newRecipe = { _id, title, category, rating, preview, description };

  const isDuplicate = isRecipeInFavorites(recipe);
  if (!isDuplicate) {
    favoriteRecipes.push(newRecipe);
    addToFavoriteButton.textContent = 'Remove from favorite';
  } else {
    const updatedFavorites = favoriteRecipes.filter(
      favoriteRecipe => favoriteRecipe._id !== _id
    );
    saveFavoriteRecipes(updatedFavorites);
    addToFavoriteButton.textContent = 'Add to favorite';
  }
  saveFavoriteRecipes(favoriteRecipes);
}

//  Слухач події для кнопки "Add to favorite", який для додавання/видалення обраного рецепту з масиву localStorage
addToFavoriteButton.addEventListener('click', () => {
  const isFavorite = isRecipeInFavorites(recipe);
  if (isFavorite) {
    removeFromFavorites(recipe);
    addToFavoriteButton.textContent = 'Add to favorite';
  } else {
    addToFavorites(recipe);
    addToFavoriteButton.textContent = 'Remove from favorite';
  }
});
// Функція для оновлення тексту кнопки на "Add to favorite" або "Remove from favorite" в залежності від статусу
function updateFavoriteButtonStatus(recipe) {
  const isFavorite = isRecipeInFavorites(recipe);
  addToFavoriteButton.textContent = isFavorite
    ? 'Remove from favorite'
    : 'Add to favorite';
}
