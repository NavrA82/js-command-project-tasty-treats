const openButtonHeroModal = document.querySelector('.button-order-now-hero-js');
const closeButtonModal = document.querySelector(
  '.order-now-modal-button-close-js'
);
const openHederBasket = document.querySelector('.section__button1');
const backdrop = document.querySelector('.js-backdrop');
const formModalOrderNow = document.querySelector('.order-now-modal-form');
const body = document.body;

if (openHederBasket) {
  openHederBasket.addEventListener('click', onClickModalOpen);
}
openButtonHeroModal.addEventListener('click', onClickModalOpen);

closeButtonModal.addEventListener('click', onClickModalRemove);

backdrop.addEventListener('click', onClickBackdrop);

formModalOrderNow.addEventListener('submit', onSubmitForm);

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
  onClickModalRemove();
  formModalOrderNow.reset();
}
