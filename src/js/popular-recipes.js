import axios from 'axios';

const popularRecipes = document.querySelector('.popular-recipes');

async function fetchArticles() {
  const url = `https://tasty-treats-backend.p.goit.global/api/recipes/popular`;

  try {
    const data = await axios.get(url);

    const popRecipes = data.data;

    // return popRecipes;

    let markup = '';

    popRecipes.forEach(recipe => {
      markup += `<div class="article-poprecipes">
        <img
          src="${recipe.preview}"
          alt="${recipe.title}"
        />
        <div class="article-poprecipes-content">
          <div class="article-poprecipes-title">${recipe.title}</div>
          <div class="article-poprecipes-text">${recipe.description}</div>
        </div>
      </div>`;
    });

    popularRecipes.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    console.log(error.message);
  }
}

fetchArticles();

// function loadPopularRecipes(popRecipes) {
//   let markup = '';

//   popRecipes.forEach(recipe => {
//     markup += `<div class="article">
//     <img
//       src="${recipe.preview}"
//       alt="${recipe.title}"
//     />
//     <div class="article-content">
//       <div class="article-title">${recipe.title}</div>
//       <div class="article-text">${recipe.description}</div>
//     </div>
//   </div>`;
//   });

//   popularRecipes.insertAdjacentHTML('beforeend', markup);
// }

// loadPopularRecipes(popRecipes);
