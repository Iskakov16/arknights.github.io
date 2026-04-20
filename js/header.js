const header = document.querySelector('header')
header.addEventListener('mouseenter', () => {
    header.classList.add('headerHover')
})
header.addEventListener('mouseleave', () => {
    header.classList.remove('headerHover')
})
