import Notiflix from 'notiflix';
const openButtonHeroModal = document.querySelector('.btn-order');
const closeButtonModal = document.querySelector(
  '.order-now-modal-button-close-js'
);

const openHederBasketFavorite = document.querySelector('.section__button');
const openHederBasket = document.querySelector('.section__button1');
const backdrop = document.querySelector('.js-backdrop');
const formModalOrderNow = document.querySelector('.order-now-modal-form');

const body = document.body;

openHederBasket.addEventListener('click', onClickModalOpen);
closeButtonModal.addEventListener('click', onClickModalRemove);
backdrop.addEventListener('click', onClickBackdrop);
formModalOrderNow.addEventListener('submit', onSubmitForm);

if (openButtonHeroModal) {
  openButtonHeroModal.addEventListener('click', onClickModalOpen);
}
if (openHederBasketFavorite) {
  openHederBasketFavorite.addEventListener('click', onClickModalOpen);
}

function onClickModalOpen() {
  window.addEventListener('keydown', onEscKeyPress);
  body.classList.add('show-modal-order-now');
  body.style.overflow = 'hidden';
}
function onClickModalRemove() {
  window.removeEventListener('keydown', onEscKeyPress);
  body.classList.remove('show-modal-order-now');
  body.style.overflow = 'auto';
}
function onClickBackdrop(event) {
  if (event.currentTarget === event.target) {
    onClickModalRemove();
  }
}
function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onClickModalRemove();
  }
}
function onSubmitForm(event) {
  event.preventDefault();
  const formData = new FormData(formModalOrderNow);
  const inputNameValue = document.querySelector(
    'input[name="user_name"]'
  ).value;
  const inputPhoneValue = document.querySelector(
    'input[name="user_phone"]'
  ).value;
  const inputEmailValue = document.querySelector(
    'input[name="user_email"]'
  ).value;
  const textareaCommentValue = document.querySelector(
    'textarea[name="user_comment"]'
  ).value;
  const dataToSend = {
    user_name: inputNameValue,
    user_phone: inputPhoneValue,
    user_email: inputEmailValue,
    user_comment: textareaCommentValue,
  };
  const url = 'https://tasty-treats-backend.p.goit.global/api/orders';
  console.log(dataToSend);
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(dataToSend),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      // console.log('Відповідь від бекенду:', data);
      data = dataToSend;
      Notiflix.Report.success(
        'Your data flew to the server',
        'if you sent valid information, wait for our call',
        'OK',
        {
          width: '320px',
          svgSize: '60px',
          messageFontSize: '20px',
          backgroundColor: '#fff',
          success: {
            notiflixIconColor: '#9bb537',
            // svgColor: '#9bb537',
            titleColor: '#9bb537',
            messageColor: '#9bb537',
            buttonBackground: '#9bb537',
            buttonColor: '#fff',
            backOverlayColor: 'rgba(4, 66, 28, 0.6)',
          },
        }
      );
    })
    .catch(error => {
      console.error('Помилка при відправці даних на бекенд:', error);
      Notiflix.Report.warning(
        'THE MUSCOVITES BROKE IT ALL',
        'but the Muscovites cannot defeat the Ukrainians. We believe in Ukrainian defenders',
        'Ukraine will win. OK',
        {
          width: '320px',
          svgSize: '30px',
          messageFontSize: '16px',
          backgroundColor: '#e42525cd',
          warning: {
            svgColor: '#F6C218',
            titleColor: '#F6C218',
            messageColor: '#F6C218',
            buttonBackground: '#08aa31c2',
            buttonColor: '#F6C218',
            backOverlayColor: 'rgba(238,191,49,0.9)',
          },
        }
      );
    });
  onClickModalRemove();
  formModalOrderNow.reset();
}
