// Navigation background on scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('header');
    // conditional statement
    if (window.scrollY > 0) {
        navbar.classList.add('scroll-bar');

    } else {
        navbar.classList.remove('scroll-bar');
    }


}
);
