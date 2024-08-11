const burger = document.querySelector('.bx.bx-menu');
const menu = document.querySelector('.wrapmenu ul');
const bxX = document.querySelector('.bx.bx-x');

burger.addEventListener('click', () => {
    menu.classList.add('show');
    burger.classList.add('hide');
    bxX.classList.add('show');
});

bxX.addEventListener('click', () => {
    menu.classList.remove('show');
    burger.classList.remove('hide');
    bxX.classList.remove('show');
});