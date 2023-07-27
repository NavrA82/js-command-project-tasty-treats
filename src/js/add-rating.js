import Notiflix from 'notiflix';

const ratingInputs = document.querySelectorAll(".star-rating__input");
const ratingValue = document.querySelector(".rating-value");
const modalBackdrop = document.querySelector(".modal-backdrop-add-rating")

let rating = 0;

ratingInputs.forEach((input) => {
  input.addEventListener("click", () => {
    rating = input.value;
    ratingValue.textContent = `${rating}.0`;
  });
});

// Send rating to backend

const ratingForm = document.querySelector('.rating-form');
const emailInput = document.querySelector('.rating-email');

ratingForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (rating === 0) {
    Notiflix.Notify.warning('Please select a rating.');
    // alert('Please select a rating.');
    return;
  }

  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Notiflix.Notify.warning('Please enter a valid email address.');
    // alert('Please enter a valid email address.');
    return;
  }

  sendRatingToBackend(rating, email);
});

const base_URL = 'https://tasty-treats-backend.p.goit.global/api';

function sendRatingToBackend(rating, email) {
  const dataToSend = {
    "rate": Number(rating),
    "email": email
  };

  fetch(`${base_URL}/recipes/.../rating`, { //добавити id
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),
  })
  .then((response) => {
    if (response.ok) {
      Notiflix.Notify.success('Rating added successfully!');
      modalBackdrop.classList.add('is-hidden')
      
      emailInput.value = "";
      ratingValue.textContent = `0.0`;
      const starInputs = document.querySelectorAll(".star-rating__input");
      starInputs.forEach((input) => (input.checked = false));

      // alert('Rating added successfully!');
    } else {
      Notiflix.Notify.failure('Error adding rating. Please try again.');
      // alert('Error adding rating. Please try again.');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

  // MODAL open-close

  (() => {
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close-rating]"),
    modal: document.querySelector("[data-modal-rating]"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
  }
})();