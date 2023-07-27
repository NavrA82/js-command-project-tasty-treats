const openButtonHeroModal = document.querySelector('.button-order-now-hero-js');
const closeButtonModal = document.querySelector(
  '.order-now-modal-button-close-js'
);
const backdrop = document.querySelector('.js-backdrop');
// const formModalOrderNow = document.querySelector('.order-now-modal-form');

openButtonHeroModal.addEventListener('click', onClickModalOpen);

closeButtonModal.addEventListener('click', onClickModalRemove);

backdrop.addEventListener('click', onClickBackdrop);

// formModalOrderNow.addEventListener('submit', onSubmitForm);

function onClickModalOpen() {
  window.addEventListener('keydown', onEscKeyPress);
  document.body.classList.add('show-modal-order-now');
}

function onClickModalRemove() {
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.remove('show-modal-order-now');
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
