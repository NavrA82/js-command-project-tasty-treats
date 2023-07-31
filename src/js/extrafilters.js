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

// const recipes = document.querySelector('.nav-scroller__item');
// console.log(recipes);
//================================================================
//                  управління
//================================================================

resetBtnTotalExtraFiltersForm.addEventListener('click', () => {
  timeSelectorFiltersForm.value = '';
  areaSelectorFiltersForm.value = '';
  ingredientsSelectorFiltersForm.value = '';
  allCategoriesGallery.innerHTML = '';
});

searchResetBtnInputExtraFiltersForm.addEventListener('click', () => {
  inputExtraFiltersForm.value = '';
  searchResetBtnInputExtraFiltersForm.hidden = true;
  allCategoriesGallery.innerHTML = '';
});

searchResetBtnInputExtraFiltersForm.hidden = true;

export function onFetchError(error) {
  console.log(error);
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
//     return markUp + `<option class="option">${currentName.name}</option>`;
//   }, '');
// }

// async function addOptions(api, input) {
//   const data = await markUpOptionsArr(api);

//   input.insertAdjacentHTML('beforeend', data);
// }

// addOptions('areas', areaSelectorFiltersForm);
// addOptions('ingredients', ingredientsSelectorFiltersForm);

//================================================================
//                 запит
//================================================================

formExtraFilters.addEventListener('click', event => {
  event.preventDefault();
});

inputExtraFiltersForm.addEventListener(
  'input',
  debounce(handleSearchInput, 300)
);

const recipes1 = [];

async function getRecipesByKeyword(keyword = '', category, ingredients, area) {
  try {
    const response = await axios.get(`${BASE_URL}/recipes`, {
      params: {
        tags: keyword,
        category: category,
        area: area,
        ingredients: ingredients,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    onFetchError();
  }
}

getRecipesByKeyword().then(data => {
  let response = data.results;
  // console.log(response);
  response.map(resipe => {
    recipes1.push(resipe);
    // console.log(recipes1);
    return recipes1;
  });
});

function getOptions(keyWord, recipes) {
  return recipes.filter(recipe => {
    // console.log();

    const equal = recipe.tags;

    // Определить совпадает ли то что мы вбили в input
    // тегам внутри массива

    const regex = new RegExp(keyWord, 'gi');
    return equal
      .map(el => el)
      .join(' ')
      .match(regex);
  });
}

function handleSearchInput() {
  const options = getOptions(this.value, recipes1);
  const html = options
    .map(recipe => {
      const regex = new RegExp(this.value, 'gi');
      const stationName = recipe.tags.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `<li><span>${stationName}</span></li>`;
    })
    .slice(0, 10)
    .join('');
  allCategoriesGallery.innerHTML = html;
}

// async function handleSearchInput(event) {
//   searchValue = event.target.value.trim();
//   // console.log(searchValue);
//   filteredSearch();
// }

// //функция фильтрации товаров

// function filteredSearch() {
//   const rgx = new RegExp(searchValue);
//   let filteredCardsData = cards.filter(card => {
//     if (rgx.test(card.tags)) {
//       return true;
//     }
//     return false;
//   });
//   allCategoriesGallery.innerHTML = generateMarkup(filteredCardsData).join('');
// }

// async function getRecipesByKeyword(keyword = '', category, ingredients, area) {
//   try {
//     const response = await axios.get(`${BASE_URL}/recipes`, {
//       params: {
//         tags: keyword,
//         category: category,
//         area: area,
//         ingredients: ingredients,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     // onFetchError();
//   }
// }