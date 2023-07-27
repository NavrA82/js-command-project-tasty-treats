const mobileMenu = document.querySelector('.header-menu-container');
const openMenuBtn = document.querySelector('.js-header-open-menu');
const closeMenuBtn = document.querySelector('.js-header-close-menu');

const toggleMenu = () => {
  const isMenuOpen =
    openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
  openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
  mobileMenu.classList.toggle('is-open');

  if (!isMenuOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
};

openMenuBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', toggleMenu);
window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
  if (!e.matches) return;
  mobileMenu.classList.remove('is-open');
  openMenuBtn.setAttribute('aria-expanded', false);
  document.body.style.overflow = 'auto';
});

// купить
// const modalController = ({ modal, btnOpen, btnClose, time = 300 }) => {
//   const buttonElems = document.querySelectorAll(btnOpen);
//   const modalElem = document.querySelector(modal);

//   modalElem.style.cssText = `
//     display: flex;
//     visibility: hidden;
//     opacity: 0;
//     transition: opacity ${time}ms ease-in-out;
//   `;

//   const closeModal = event => {
//     const target = event.target;

//     if (
//       target === modalElem ||
//       (btnClose && target.closest(btnClose)) ||
//       event.code === 'Escape'
//     ) {
//       modalElem.style.opacity = 0;

//       setTimeout(() => {
//         modalElem.style.visibility = 'hidden';
//       }, time);

//       window.removeEventListener('keydown', closeModal);
//     }
//   };

//   const openModal = () => {
//     modalElem.style.visibility = 'visible';
//     modalElem.style.opacity = 1;
//     window.addEventListener('keydown', closeModal);
//   };

//   buttonElems.forEach(btn => {
//     btn.addEventListener('click', openModal);
//   });

//   modalElem.addEventListener('click', closeModal);
// };

// modalController({
//   modal: '.modal1',
//   btnOpen: '.section__button1',
//   btnClose: '.modal__close',
// });
