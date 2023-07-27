const openButtonHeroModal = document.querySelector('btn-order');
const closeButtonModal = document.querySelector('order-now-modal__close-btn');
const closeButtonModal = document.querySelector('order-now-modal__close-btn');

openButtonHeroModal.addEventListener('click', onClickModalOpen);

closeButtonModal.addEventListener('click', onClickModalRemove);

backdropEl.addEventListener('click', onBackdropClick);

modalOrderNowForm.addEventListener('submit', onSubmitForm);

function onClickModalOpen() {
  window.addEventListener('keydown', onEscKeyPress);
  document.body.classList.add('show-modal-order-now');
}

function onClickModalRemove() {
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.remove('show-modal-order-now');
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onModalRemove();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onModalRemove();
  }
}

function onSubmitForm(e) {
  e.preventDefault();

  const formData = extractFormData(refs.modalOrderNowForm);
  console.log(formData);

  refs.modalOrderNowForm.reset();
}

function extractFormData(form) {
  const formData = {};
  const inputsEl = form.elements;

  formData.name = inputsEl.name.value;
  formData.phone = inputsEl.phone.value;
  formData.email = inputsEl.email.value;
  formData.comment = inputsEl.comment.value;

  return formData;
}
