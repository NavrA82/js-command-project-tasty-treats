import axios from 'axios';
import Notiflix from 'notiflix';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

let pictures = [];
let favorites = [];

let loadPage = 1;
let perPage = 0;
let sort = '';

const gallery = document.querySelector('.photos .pictures-gallery');
const allCategories = document.querySelector('.all-categories');

function setLimitDownloadValue() {
  if (window.innerWidth < 768) {
    perPage = 6;
  } else if (window.innerWidth < 1280) {
    perPage = 8;
  } else {
    perPage = 9;
  }
}
setLimitDownloadValue();

function renderCardsList(foods) {
  const markup = foods.results
    .map(result => {
      const roundedRating = result.rating.toFixed(1);

      const stars = Array.from({ length: 5 }, (_, index) => {
        return index < Math.floor(roundedRating)
          ? '<span class="fa fa-star checked"></span>'
          : '<span class="fa fa-star star_color"></span>';
      }).join('');

      return `<li>
      <div class="photo-card">
        <div class="photo-card-wrap-descr">
          <h2 class="card-title">${result.title}</h2>
          <p class="recipe-description">${result.description}</p>
          <div class="photo-card-wrap-stars-button">
            <div class="photo-card-wrap-rating-stars">
              <p class="recipe_rating">${roundedRating}</p>
              <div class="all-stars">${stars}</div>
            </div>
            <button type="button" class="good-recipes">See recipe</button>
          </div>
        </div>
        <img class="picture" src=${result.preview} alt=${result.tags[0]} loading="lazy" />
        <label class="label-check">
          <input class="modal-check" type="checkbox" data-id="${result._id}" /> <!-- Add data-id="${result._id}" -->
          <svg
              class="label-check-icon-heart"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 20"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.9944 3.70783C9.16163 1.5652 6.10542 0.988839 3.80912 2.95085C1.51282 4.91285 1.18954 8.19323 2.99283 10.5137C4.49215 12.443 9.02961 16.5121 10.5167 17.8291C10.6831 17.9764 10.7663 18.0501 10.8633 18.0791C10.948 18.1043 11.0407 18.1043 11.1254 18.0791C11.2224 18.0501 11.3056 17.9764 11.472 17.8291C12.9591 16.5121 17.4966 12.443 18.9959 10.5137C20.7992 8.19323 20.5154 4.89221 18.1796 2.95085C15.8439 1.00948 12.8271 1.5652 10.9944 3.70783Z"
                stroke="#F8F8F8"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          <i class="fa fa-heart"></i>
        </label>
      </div>
    </li>`;
    })
    .join('');

  gallery.innerHTML = markup;
}

function handleFavoriteToggle(evt) {
  const targetCheckbox = evt.target;
  if (targetCheckbox.classList.contains('modal-check')) {
    const pictureId = targetCheckbox.getAttribute('data-id');
    const cardElement = targetCheckbox.closest('.photo-card');

    if (targetCheckbox.checked) {
      cardElement.classList.add('change-color');
      favorites.push(pictureId);
    } else {
      cardElement.classList.remove('change-color');
      const index = favorites.indexOf(pictureId);
      if (index !== -1) {
        favorites.splice(index, 1);
      }
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
function handleFavoriteToggle(evt) {
  const targetCheckbox = evt.target;
  const isHeartIcon = targetCheckbox.classList.contains(
    'label-check-icon-heart'
  );

  if (isHeartIcon || targetCheckbox.classList.contains('modal-check')) {
    const pictureId = targetCheckbox.getAttribute('data-id');
    const cardElement = targetCheckbox.closest('.photo-card');

    if (isHeartIcon) {
      const checkbox = cardElement.querySelector('.modal-check');
      checkbox.checked = !checkbox.checked;
    }

    if (targetCheckbox.checked) {
      cardElement.classList.add('change-color');
      favorites.push(pictureId);
    } else {
      cardElement.classList.remove('change-color');
      const index = favorites.indexOf(pictureId);
      if (index !== -1) {
        favorites.splice(index, 1);
      }
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
gallery.addEventListener('click', handleFavoriteToggle);

function fetchDataAndRender() {
  const base_url = 'https://tasty-treats-backend.p.goit.global/api/recipes';
  axios
    .get(base_url, {
      params: { category: sort, page: loadPage, limit: perPage },
    })
    .then(response => {
      if (response.data.totalPages === 0) {
        gallery.innerHTML = '';
        Notiflix.Report.warning(
          'Warning',
          'Sorry, there are no images matching your search query. Please try again',
          'Warning'
        );
      } else {
        pictures = [response.data];
      }
      renderCardsList(response.data);
    })
    .catch(error => {
      console.log(error);
      Notiflix.Report.failure(
        'Error',
        'Failed to fetch data. Please try again later.',
        'OK'
      );
    });
}

function loadFavoritesFromLocalStorage() {
  const favoritesData = localStorage.getItem('favorites');
  if (favoritesData) {
    favorites = JSON.parse(favoritesData);
    const checkboxes = document.querySelectorAll('.modal-check');
    checkboxes.forEach(checkbox => {
      const pictureId = checkbox.getAttribute('data-id');
      if (favorites.includes(pictureId)) {
        checkbox.checked = true;
        checkbox.closest('.photo-card').classList.add('change-color');
      }
    });
  }
}

const category_url =
  'https://tasty-treats-backend.p.goit.global/api/categories';
axios.get(category_url).then(response => {
  const recipes = document.querySelector('.nav-scroller');
  const recipes_markup = response.data
    .map(
      category => `<a class="nav-scroller__item" href="#">${category.name}</a>`
    )
    .join('');
  recipes.innerHTML = recipes_markup;

  recipes.addEventListener('click', evt => {
    for (const item of response.data) {
      if (item.name === evt.target.innerText) {
        sort = evt.target.innerText;
        loadPage = 1;
        pictures = [];
        fetchDataAndRender();
      }
    }
  });
});

allCategories.addEventListener('click', () => {
  sort = '';
  loadPage = 1;
  pictures = [];
  fetchDataAndRender();
});

fetchDataAndRender();
loadFavoritesFromLocalStorage();

// import axios from 'axios';

// import Notiflix from 'notiflix';

// import Pagination from 'tui-pagination';

// import 'tui-pagination/dist/tui-pagination.css';

// let url;

// let searchParam;

// let pictures = [];

// let favorites = [];

// let loadPage;

// let pageNumber;

// loadPage = 1;

// let region;

// let constituent;

// let period;

// let sort;

// let perPage = 0;

// const recipes = document.querySelector('.nav-scroller');

// const gallery = document.querySelector('.photos .pictures-gallery');
// //const things = document.querySelector(".photos");
// const allCategories = document.querySelector('.all-categories');

// const plugCover = document.querySelector('.plug');

// const chapter = document.querySelector('.section-elements');

// // stop = perPage;

// function setLimitDownloadValue() {
//   if (window.innerWidth < 768) {
//     perPage = 6;
//   } else if (window.innerWidth < 1280) {
//     perPage = 8;
//   } else {
//     perPage = 9;
//   }
// }
// setLimitDownloadValue();

// period = 0;

// region = '';

// constituent = '';

// sort = '';
// //const fetchObjects = async () => {
// // console.log(url);
// // const response = await axios.get(url,{params:{}});
// //  const results = await response;
// //  return results;
// //};

// //document.addEventListener("DOMContentLoaded",()=>{

// //});

// function renderCardsList(foods) {
//   //console.log(foods);
//   //localStorage.setItem("results",foods);

//   let markup = ``;

//   for (let i = 0; i < pictures[0].results.length; i += 1) {
//     let stars = `<div class="all-stars">`;
//     for (let j = 0; j < 5; j += 1) {
//       if (j < Math.floor(pictures[0].results[i].rating)) {
//         stars += `<span class="fa fa-star checked"></span>`;
//       } else {
//         stars += `<span class="fa fa-star star_color"></span>`;
//       }
//     }
//     stars += `</div>`;
//     markup +=
//       `<li><div class="photo-card"><img class="picture"  src=${pictures[0].results[i].preview} alt=${pictures[0].results[i].tags[0]} loading="lazy" />
// <h2 class="card-title">${pictures[0].results[i].title}</h2><p class="recipe-description">${pictures[0].results[i].description}</p><p class="recipe_rating">${pictures[0].results[i].rating}</p>` +
//       stars +
//       `<button type="button" class="good-recipes">See recipe</button><label id="brand" class="label-check">
// <input class="modal-check " type="checkbox" id="check-item" />
// <i class="fa fa-heart" ></i>
// </label></div></li>`;
//   } //};

//   const check = document.querySelector('.photos .pictures-gallery');
//   // const rating=document.querySelectorAll(".stars")
//   //for(const child in check.childNodes)
//   //{
//   check.addEventListener('click', evt => {
//     const modal = document.querySelectorAll('.modal-check');

//     const heart = document.querySelectorAll(
//       '.photo-card .label-check .fa-heart'
//     );
//     //console.log(heart);

//     for (let i = 0; i < pictures[0].results.length; i++) {
//       if (modal[i].checked) {
//         evt.target.classList.toggle('change-color');
//         console.log(i);
//         localStorage.setItem('favorites', JSON.stringify(pictures[i]));
//       } else {
//         for (let j = 0; j < favorites.length; j++) {
//           if (favorites[j] === pictures[i]) {
//             favorites.splice(j, 1);

//             localStorage.setItem('favorites', JSON.stringify(favorites));
//           }
//         }
//       }
//     }
//   });

//   //document.addEventListener("change",()=>{

//   //const ratings=document.querySelectorAll(".rating");
//   // console.log("hello");
//   // if (ratings.length>0){
//   //   initRatings();
//   // }

//   //});
//   //}
//   //rating.innerHTML=starMarkup;
//   //console.log(rating);
//   //const tags=document.createElement(markup);
//   // gallery.append(tags);
//   gallery.innerHTML = markup;
//   // console.log(tags);
//   //  const ratings=document.querySelectorAll(".rating");
//   // console.log(ratings);
//   // if (ratings.length>0){
//   //   initRatings();
//   // }
//   gallery.insertAdjacentHTML(
//     'beforeend',
//     `<section class="pagination-wrapper"><div id="tui-pagination-container" class="tui-pagination"></section></div>`
//   );

//   const container = document.getElementById('tui-pagination-container');

//   const options = {
//     totalItems: foods.totalPages,
//     itemsPerPage: 9,
//     visiblePages: 3,
//     page: loadPage,
//     centerAlign: false,
//     firstItemClassName: 'tui-first-child',
//     lastItemClassName: 'tui-last-child',
//     template: {
//       page: '<a href="#" class="tui-page-btn">{{page}}</a>',
//       currentPage:
//         '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
//       moveButton:
//         '<a href="#" class="tui-page-btn tui-{{type}}">' +
//         '<span class="tui-ico-{{type}}">{{type}}</span>' +
//         '</a>',
//       disabledMoveButton:
//         '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
//         '<span class="tui-ico-{{type}}">{{type}}</span>' +
//         '</span>',
//       moreButton:
//         '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
//         '<span class="tui-ico-ellip">...</span>' +
//         '</a>',
//     },
//   };
//   const pagination = new Pagination(container, options);
//   const instance = new Pagination(container, options);
//   instance.getCurrentPage();
//   instance.on('afterMove', event => {
//     loadPage = event.page;

//     if (loadPage * perPage >= foods.totalPages) {
//       perPage = foods.totalPages % ((loadPage - 1) * perPage);
//     }
//     if (loadPage > Number.parseInt(foods.totalPages % perPage) + 1) {
//       return;
//     }

//     axios
//       .get(base_url, {
//         params: { category: sort, page: loadPage, limit: perPage },
//       })
//       .then(response => {
//         pictures.splice(0, 1);

//         pictures.push(response.data);

//         renderCardsList(response.data);
//       });
//   });

//   // perPage = stop;
// }

// const base_url =
//   'https://tasty-treats-backend.p.goit.global/api/recipes?categories';

// axios
//   .get(base_url, { params: { category: sort, page: loadPage, limit: perPage } })
//   .then(response => {
//     if (response.data.totalPages === 0) {
//       galllery.innerHTML = ``;
//       // things.innerHTML=``;
//       //  gallery.innerHTML = `<div class="plug"><svg class="icon-plug"><use href="./images/sprite/icons.svg#icon-elements"></use></svg>
//       //  /<p class="plug-text">Sorry, there are no images matching your search query. Please try again</p></div>`;
//       //plugCover.classList.toggle(".is-hidden");

//       Notiflix.Report.warning(
//         'Warning',
//         'Sorry, there are no images matching your search query. Please try again',
//         'Warning'
//       );
//     } else {
//       pictures.push(response.data);
//     }

//     renderCardsList(response.data);
//   })
//   .catch(error => {
//     console.log(error);
//   });

// const category_url =
//   'https://tasty-treats-backend.p.goit.global/api/categories';

// //const fetchOategiries = async () => {
// // const response = await axios.get(URL);
// //  const results = await response;
// // return results;
// //};
// axios.get(category_url).then(response => {
//   const recipes_markup = response.data
//     .map(
//       category => `<a class="nav-scroller__item" href="#">${category.name}</a>`
//     )
//     .join('');
//   recipes.innerHTML = recipes_markup;

//   recipes.addEventListener('click', evt => {
//     for (const item of response.data) {
//       if (item.name === evt.target.innerText) {
//         sort = evt.target.innerText;

//         loadPage = 1;

//         pictures.splice(0, 1);

//         axios
//           .get(base_url, {
//             params: { category: sort, page: loadPage, limit: perPage },
//           })
//           .then(response => {
//             console.log(response);

//             if (response.data.totalPages === 0) {
//               gallery.innerHTML = ``;

//               //    gallery.innerHTML=`<div class="plug"><svg class="icon-plug"><use href="./images/sprite/icons.svg#icon-elements"></use></svg>
//               //    <p class="plug-text">Sorry, there are no images matching your search query. Please try again</p></div>`;
//               Notiflix.Report.failure(
//                 'Error',
//                 'Sorry, there are no images matching your search query. Please try again',
//                 function retry() {
//                   return;
//                 }
//               );
//             } else {
//               pictures.push(response.data);

//               renderCardsList(response.data);
//             }
//           })
//           .catch(error => {
//             console.log(error);
//           });
//       }
//     }
//   });
// });

// allCategories.addEventListener('click', () => {
//   loadPage = 1;

//   sort = '';
//   pictures.splice(0, 1);
//   axios
//     .get(base_url, {
//       params: { category: sort, page: loadPage, limit: perPage },
//     })
//     .then(response => {
//       if (response.data.totalPages === 0) {
//         gallery.innerHTML = ``;

//         //    gallery.innerHTML = `<div class="plug"><svg class="icon-plug"><use href="./images/sprite/icons.svg#icon-elements"></use></svg>
//         //   <p class="plug-text">Sorry, there are no images matching your search query. Please try again</p></div>`;

//         return;
//       } else {
//         pictures.push(response.data);
//       }

//       renderCardsList(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });

// function initRatings(){
//   let ratingActive, ratingValue;
//   for (let index=0; index<ratings.length; index++){
//       const rating=ratings[index];
//           initRating(rating);
//   }

//   function initRating(rating){
//       initRatingVars(rating);
//       setRatingActiveWidth();
//   }

//   function initRatingVars(rating){
//       ratingActive=rating.querySelectorAll('.rating_active')[0];
//       ratingValue=rating.querySelectorAll('.rating_value')[0];
//   }

//   function setRatingActiveWidth(index=ratingValue.innerHTML){
//       const ratingActiveWidth = index/0.05;
//       ratingActive.style.width=`${ratingActiveWidth}%`;
//   }
// }
