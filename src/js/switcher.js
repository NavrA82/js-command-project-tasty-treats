const menuContainer = document.querySelector('.header-menu-container');
const menuToggleBtn = document.querySelector('.menu-toggle');
const burgerSwitchInput = document.querySelector('.burger-switch-input');

// Обработчик клика на кнопку бургер-меню
menuToggleBtn.addEventListener('click', () => {
  menuContainer.classList.toggle('active');
});

// Обработчик изменения состояния переключателя (switch) для бургер-меню
burgerSwitchInput.addEventListener('change', event => {
  if (event.target.checked) {
    // Здесь можно добавить логику, которая выполняется при включении переключателя (switch)
    console.log('Переключатель включен');
  } else {
    // Здесь можно добавить логику, которая выполняется при выключении переключателя (switch)
    console.log('Переключатель выключен');
  }
});
