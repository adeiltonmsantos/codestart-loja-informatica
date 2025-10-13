document.addEventListener("DOMContentLoaded", function(){
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const menu = document.querySelector('.menu');

    mobileMenuIcon.addEventListener('click', function(){
        menu.classList.toggle('mobile-menu-open');
    });

// Products Filter
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

// Testimonials slider
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

    function scrollToSection(sectionId){
        const section = document.querySelector(sectionId);

        if(section){
            let scrollOffSet = 0;

            scrollOffSet = section.offsetTop - (window.innerHeight - section.clientHeight) / 2;

            window.scrollTo({
                top: scrollOffSet,
                behavior: 'smooth'
            });
        }
    }

    const links = document.querySelectorAll("nav a");

    links.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const sectionId = link.getAttribute("href");
            scrollToSection(sectionId);
        });
    });

    // Contact of site
    const form = document.querySelector('#contact form');
    const sucessMessage = document.querySelector('#sucess-message');
    const errorMessage = document.querySelector('#error-message')
    const loading = document.querySelector('#loading');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.querySelector('#name').value;
        const subject = document.querySelector('#subject').value;
        const email = document.querySelector('#email').value;
        const cellfone = document.querySelector('#cellphone').value;
        const message = document.querySelector('#message').value;

        // EmailJS parameters
        const SERVICE_ID = "service_xlmj3qu";
        const TEMPLATE_ID = "template_mohzmh6";
        const PUBLIC_KEY = "-j6Q3glibCsWMaqlL";

        // Initializing EmailJS with public key
        (function () {
            emailjs.init({
                publicKey: PUBLIC_KEY,
            });
        }
        )();

        form.style.display = 'none';
        sucessMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        loading.style.display = 'block';

        const data ={
            name: name,
            email: email,
            subject: subject,
            message: `
                Nome: ${name}\n
                E-mail: ${email}\n
                Celular: ${cellfone}\n
                Assunto: ${subject}\n
                Mensagem: ${message}\n
            `
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, data)
            .then(function (response) {
                loading.style.display = 'none';
                sucessMessage.style.display = 'block';
            }, function (error) {
                loading.style.display = 'none';
                errorMessage.style.display = 'block';
                console.error('Erro na resposta da API')
            }).catch(function (error) {
                loading.style.display = 'none';
                errorMessage.style.display = 'block';
                console.error(`Erro na resposta da API: ${error}`);
            });

        

    });

    // E-mail form data
    // service_xlmj3qu
    // Template id: template_mohzmh6
    // Public key:  -j6Q3glibCsWMaqlL


})


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