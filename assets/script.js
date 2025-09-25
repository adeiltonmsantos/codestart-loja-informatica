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

function updateCart(){
    const cart = document.querySelector('.itens-cart');
    cart.textContent = productsArray.length;
}

function addProductToCart(event){
    const productCard = event.target.closest('.card-new-product');
    const productName = productCard.querySelector('.info-product h3').textContent;
    const priceText = productCard.querySelector('.new-price').textContent;
    const productImg = productCard.querySelector(".img-product");
    const srcProduct = productImg.getAttribute("src");

    const price = parseFloat(priceText.replace('R$', ''));

    const quantityElement = productCard.querySelector('.number-quantity');
    let quantity = parseInt(quantityElement.textContent);

    const existingProductIndex = productsArray.findIndex(product => product.productName === productName);

    if(quantity > 0){
        if(existingProductIndex !== -1){
            productsArray[existingProductIndex].quantity = quantity;
        }else{
            productsArray.push(
                {
                    productName: productName,
                    price: price,
                    productImg: srcProduct,
                    quantity: quantity
                }
            );
        }
    }else{
        if(existingProductIndex !== -1){
            productsArray.splice(existingProductIndex, 1);
        }
    }

    localStorage.setItem('productsArray', JSON.stringify(productsArray))

    updateCart();
}

const increaseButtons = document.querySelectorAll('.increase-quantity');
const decreaseButtons = document.querySelectorAll('.decrease-quantity');
const addCartButtons = document.querySelectorAll('.confirm-add-cart');

increaseButtons.forEach(button => button.addEventListener('click', increaseQuantity));
decreaseButtons.forEach(button => button.addEventListener('click', decreaseQuantity));
addCartButtons.forEach(button => button.addEventListener('click', addProductToCart));

// Carrinho
const inputCep = document.querySelector('#cep');
const inputStreet = document.querySelector('#street');
const inputNumber = document.querySelector('#number');
const inputNeighborhood = document.querySelector('#neighborhood');
const inputCity = document.querySelector('#city');
const inputState = document.querySelector('#state');
const errorDiv = document.querySelector('#error-message');
const savedProductsArray = JSON.parse(localStorage.getItem('productsArray'));



function searchCep(){
    const typedCep = inputCep.value.trim().replace(/\D/g, '');
    url = `https://viacep.com.br/ws/${typedCep}/json/`;
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if(!data.erro){
                console.log(data);
                inputStreet.value = data.logradouro;
                inputNeighborhood.value = data.bairro;
                inputCity.value = data.localidade;
                inputState.value = data.uf;
                errorDiv.style.display = 'none';
            }
            else{
                errorDiv.textContent = "CEP não encontrado. Verifique se você digitou corretamente."
                errorDiv.style.display = 'block';
            }
        })
        .catch(error => {
            errorDiv.textContent = "CEP não encontrado. Verifique se você digitou corretamente."
            errorDiv.style.display = 'block';
        });
}

window.addEventListener("DOMContentLoaded", () => {
    const tBody = document.querySelector('info-products-order tbody');

    for(const product of savedProductsArray){
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.innerHTML = `
            <div class="product-cart">
                <img src="${product.productImg}" alt="${product.productName}">
                <p>${product.productName}</p>
                ${product.productName}
            </div>
        `;
        const priceCell = document.createElement('td');
        priceCell.textContent = `R$ ${product.price.toFixed(2)}`;
        
        const quantityCell = document.createElement('td');
        quantityCell.textContent = product.quantity;

        const subtotalCell = document.createElement('td');
        subtotalCell.textContent = `R$ ${(product.price * product.quantity).toFixed(2)}`;

        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(subtotalCell);

        tBody.appendChild(row);

    }
    
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