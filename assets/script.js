document.addEventListener("DOMContentLoaded", function(){
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const menu = document.querySelector('.menu');

    mobileMenuIcon.addEventListener('click', function(){
        menu.classList.toggle('mobile-menu-open');
    });
})

// Products Filter
document.addEventListener("DOMContentLoaded", function(){
    const sections = document.querySelectorAll(".products-code-start");

    sections.forEach((section) => {
        const menu = section.querySelector(".prodcut-filter-brands ul");
        const menuItens = section.querySelectorAll(".prodcut-filter-brands ul li");
        const productCards = section.querySelectorAll(".card-new-product");

        const state = {
            activeBrand: "todos",
            activeType: "todos"
        }

        function updateCards(){
            productCards.forEach(card =>{
                const brand = card.getAttribute("data-brand");
                const type = card.getAttribute("data-products-type");

                if((state.activeBrand === "todos" || state.activeBrand === brand) && (state.activeType === "todos" || state.activeType === type)){
                    card.style.display = "block";
                }else{
                    card.style.display = "none";
                }
            })
        }

        menuItens.forEach((item) => {
            item.addEventListener("click", () => {
                menuItens.forEach((menuItem) => {
                    menuItem.classList.remove("product-brand-active");
                })

                item.classList.add("product-brand-active");

                state.activeBrand = item.getAttribute("data-brand");
                state.activeType = item.getAttribute("data-products-type");

                updateCards();
            })
        })

        updateCards();
    
    })
})

// Testimonials slider
window.addEventListener("DOMContentLoaded", () => {
    const testimonials = document.querySelectorAll('.testimonial');
    const controls = document.querySelectorAll('.controls-testimonial span');
    const firstTestimonial = testimonials[0];
    const firstControl = controls[0];
    firstControl.classList.add("active-testimomial");
    
    testimonials.forEach(testimonial => testimonial.style.display = 'none');
    firstTestimonial.style.display = 'block';
    
    controls.forEach(control => {
        control.addEventListener("click", () => {
            const targetSlide = control.getAttribute('data-slide');
            controls.forEach(c => c.className = "");
            control.classList.add('active-testimonial');
            testimonials.forEach(testimonial => testimonial.style.display = 'none');

            const testimonialActive = document.querySelector(`.testimonial[data-slide="${targetSlide}"]`);

            testimonialActive.style.display = 'block';
        });
    });
})

// Cart handling
const productsArray = [];

function increaseQuantity(event){
    const quantityElement = event.target.parentElement.querySelector('.number-quantity');
    const quantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = quantity + 1;    
}

function decreaseQuantity(event){
    const quantityElement = event.target.parentElement.querySelector('.number-quantity');
    const quantity = parseInt(quantityElement.textContent);
    if(quantity > 0){
        quantityElement.textContent = quantity - 1;
    }
}

const increaseButtons = document.querySelectorAll('.increase-quantity');
const decreaseButtons = document.querySelectorAll('.decrease-quantity')

increaseButtons.forEach(button => button.addEventListener('click', increaseQuantity));
decreaseButtons.forEach(button => button.addEventListener('click', decreaseQuantity));



// Sponsors slider
// window.addEventListener("DOMContentLoaded", () => {
//     const slider = document.querySelector(".slider-sponsors");
//     const images = slider.querySelectorAll("img");
    
//     images.forEach(image => {
//         const clone = image.cloneNode(true);
//         slider.appendChild(clone);
//     });

//     const totalWidth = images.length * (images[0].offsetWidth + 20);

//     slider.style.width = `${totalWidth}px`;
    
//     let currentPosition = 0;

//     const moveSlider = () => {
//         currentPosition -= 1;
//         if(currentPosition <= -totalWidth/2){
//             currentPosition = 0;
//         }

//         slider.style.transform = `translateX(${currentPosition}px)`;
//         requestAnimationFrame(moveSlider);
//     };

//     requestAnimationFrame(moveSlider);
// })