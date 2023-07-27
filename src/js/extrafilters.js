import axios from 'axios';
import { debounce } from 'lodash';
import Notiflix from 'notiflix';

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
};
const {
  formExtraFilters,
  inputExtraFiltersForm,
  searchResetBtnInputExtraFiltersForm,
  timeSelectorFiltersForm,
  areaSelectorFiltersForm,
  ingredientsSelectorFiltersForm,
  resetBtnTotalExtraFiltersForm,
} = refs;

//отримуємо інфо з API у розмітку
// //==================== 1 регіони ====================

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

//=================== управління ===================

function onFetchError() {
  Notiflix.Report.failure(
    '&#128532; Something went wrong!',
    'Try reloading the page!',
    'And try Again'
  );
}

resetBtnTotalExtraFiltersForm.addEventListener('click', () => {
  timeSelectorFiltersForm.value = 'all-time';
  areaSelectorFiltersForm.value = 'all-areas';
  ingredientsSelectorFiltersForm.value = 'all-ingredients';
});

searchResetBtnInputExtraFiltersForm.addEventListener('click', () => {
  inputExtraFiltersForm.value = '';
  searchResetBtnInputExtraFiltersForm.hidden = true;
});

searchResetBtnInputExtraFiltersForm.hidden = true;

formExtraFilters.addEventListener('click', event => {
  event.preventDefault();
});

// // Якщо користувач повністю очищує поле пошуку - запит виконується за рецептами попередньо обраної категорії
// // або рецептами, що належать до усіх категорій(в залежності від поточного вибору користувача у блоці з переліком категорій).
// // Також при реалізації пошуку слід виконувати санітизацію введеного рядка методом trim(), що вирішить проблему, коли в полі
// // введені тільки пробіли або якщо вони є на початку і в кінці введеного ключового слова"

inputExtraFiltersForm.addEventListener('input', debounce(onInputForm, 300));

function onInputForm(event) {
  query = String(event.target.value.trim());
  console.log(query);
  if (query !== '') {
    // console.log(query);
    // searchOnQuery(query);
    // document.querySelector('.all-recipes').insertAdjacentHTML(
    //   'beforeend',
    //   `
    // <li class="cards__item items-set}">qwertyukil </li>
    // `
    // );
    searchResetBtnInputExtraFiltersForm.hidden = false;
  } else {
    // Notiflix.Report.failure(
    //   '&#128532; We can`t !',
    //   'Try reloading the page!',
    //   'And try Again'
    // );
    searchResetBtnInputExtraFiltersForm.hidden = true;
  }
  300;
}
