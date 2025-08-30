document.addEventListener("DOMContentLoaded", function(){
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const menu = document.querySelector('.menu');

    mobileMenuIcon.addEventListener('click', function(){
        menu.classList.toggle('mobile-menu-open');
    });

})