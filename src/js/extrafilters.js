import axios from 'axios';
import { debounce } from 'lodash';
import Notiflix from 'notiflix';

// import { renderCardsList } from './home_categories-api';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

const refs = {
  formExtraFilters: document.querySelector('.extra-filters-form'),
  inputExtraFiltersForm: document.querySelector('.extra-filters-form-input'),
  searchResetBtnInputExtraFiltersForm: document.querySelector(
    '[data-search-reset]'
  ),
  timeSelectorFiltersForm: document.querySelector('#time'),
  areaSelectorFiltersForm: document.querySelector('#area'),
  ingredientsSelectorFiltersForm: document.querySelector('#ingredients'),
  resetBtnTotalExtraFiltersForm: document.querySelector(
    '.extra-filters-reset-btn'
  ),
  allCategoriesGallery: document.querySelector('.pictures-gallery'),
};

let limitCount = 0;
if (document.documentElement.clientWidth < 768) {
  limitCount = 6;
} else if (
  document.documentElement.clientWidth > 768 &&
  document.documentElement.clientWidth < 1280
) {
  limitCount = 8;
} else if (document.documentElement.clientWidth > 1280) {
  limitCount = 9;
}

const {
  formExtraFilters,
  inputExtraFiltersForm,
  searchResetBtnInputExtraFiltersForm,
  timeSelectorFiltersForm,
  areaSelectorFiltersForm,
  ingredientsSelectorFiltersForm,
  resetBtnTotalExtraFiltersForm,
  allCategoriesGallery,
} = refs;

//================================================================
//                  управління
//================================================================

resetBtnTotalExtraFiltersForm.addEventListener('click', () => {
  timeSelectorFiltersForm.value = '';
  areaSelectorFiltersForm.value = '';
  ingredientsSelectorFiltersForm.value = '';
});

searchResetBtnInputExtraFiltersForm.addEventListener('click', () => {
  inputExtraFiltersForm.value = '';
  searchResetBtnInputExtraFiltersForm.hidden = true;
});

searchResetBtnInputExtraFiltersForm.hidden = true;

export function onFetchError() {
  Notiflix.Report.failure(
    '&#128532; Something went wrong!',
    'Try reloading the page!',
    'And try Again'
  );
}

//================================================================
//                  отримуємо інфо з API у розмітку
//================================================================

// async function getOptions(api) {
//   const response = await axios.get(`${BASE_URL}/${api}`);
//   return response.data;
// }

// async function markUpOptionsArr(api) {
//   const data = await getOptions(api);
//   return data.reduce((markUp, currentName) => {
//     return markUp + `<option>${currentName.name}</option>`;
//   }, '');
// }

// async function addOptions(api, input) {
//   const data = await markUpOptionsArr(api);

//   input.insertAdjacentHTML('beforeend', data);
// }

// addOptions('areas', areaSelectorFiltersForm);
// addOptions('ingredients', ingredientsSelectorFiltersForm);

const fetchAreas = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/areas`);
    return response.data;
  } catch (error) {
    onFetchError();
  }
};

fetchAreas()
  .then(data => {
    data.forEach(el => {
      const optionsElement = document.createElement('option');
      optionsElement.value = el.id;
      optionsElement.textContent = el.name;
      areaSelectorFiltersForm.appendChild(optionsElement);
    });
  })
  .catch(error => {
    onFetchError(error);
  });

//====================== 2 інгрідієнти ====================

const fetchIngredients = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/ingredients`);
    return response.data;
  } catch (error) {
    onFetchError(error);
  }
};

fetchIngredients()
  .then(data => {
    data.forEach(el => {
      const optionsElement = document.createElement('option');
      optionsElement.value = el.id;
      optionsElement.textContent = el.name;
      ingredientsSelectorFiltersForm.appendChild(optionsElement);
    });
  })
  .catch(error => {
    onFetchError(error);
  });

//================================================================
//                 запит
//================================================================

formExtraFilters.addEventListener('click', event => {
  event.preventDefault();
});

// // Якщо користувач повністю очищує поле пошуку - запит виконується за рецептами попередньо обраної категорії
// // або рецептами, що належать до усіх категорій(в залежності від поточного вибору користувача у блоці з переліком категорій).
// // Також при реалізації пошуку слід виконувати санітизацію введеного рядка методом trim(), що вирішить проблему, коли в полі
// // введені тільки пробіли або якщо вони є на початку і в кінці введеного ключового слова"

// async function searchRecipe(event) {
//   const query = String(inputExtraFiltersForm.value.trim());
//   console.log(!query);
//   if (!query) {
//     Notiflix.Report.failure('Please,input the valid query');
//     inputExtraFiltersForm.value = '';
//     searchResetBtnInputExtraFiltersForm.hidden = true;
//     //функція Вячеслава по останній обраній категорії
//   }
//   if (query !== '') {
//     searchResetBtnInputExtraFiltersForm.hidden = false;
//     getData();
//     // функція Вячеслава показати рецепти з урахуванням веденого тайтлу
//     // await showRecipes(`${BASE_URL}/recipes`, {
//     //   limit: limitCount,
//     //   title: query.value,
//     // });
//     //функція Вячеслава про пагінацію з урахуванням веденого тайтлу
//     //   await showPagination(`${BASE_URL}/recipes`, {
//     //     limit: limitCount,
//     //     title: query.value,
//     //   });
//     return;
//   }
//   // console.log(value);
// }

inputExtraFiltersForm.addEventListener(
  'input',
  debounce(handleSearchInput, 300)
);

async function getRecipes() {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/`);
    return response.data;
  } catch (error) {
    // onFetchError();
    console.log(error);
  }
}

// getRecipes()
//      .then(data => {
//        // console.log(data.results);
//        let response = data.results;
//        response.map(el => console.log(el.tags));
//      })
//      .catch(error => {
//        // onFetchError(error);
//        console.log(error);
//      });

// Функція для виведення рецептів зі співпадаючим ключовим у консоль

// Функція обробки події onInput з використанням Debounce
async function handleSearchInput(event) {
  const keyword = event.target.value.trim();

  const recipe = await getRecipes();

  // if (keyword === '') {
  //   // const results = await getRecipesByCategory(category); - функція Вячеслава по виклику усіх категорії або певної категорії
  //   // showMatchingRecipes(recipes, keyword);
  // } else {

  //   // showMatchingRecipes(recipes, keyword);

  // }

  // getRecipes()
  //   .then(data => {
  //     // console.log(data.results);
  //     let response = data.results;
  //     response.map(el => console.log(el.tags));
  //   })
  //   .catch(error => {
  //     // onFetchError(error);
  //     console.log(error);
  //   });
}
