const menuToggle = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// Hide mobile nav when resizing to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navList.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

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
