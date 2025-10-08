document.addEventListener("DOMContentLoaded", () => {
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

    function updateCart(quantityProducts){
        const cart = document.querySelector('.itens-cart');
        cart.textContent = quantityProducts;
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

        updateCart(productsArray ? productsArray.length : 0);
    }

    const increaseButtons = document.querySelectorAll('.increase-quantity');
    const decreaseButtons = document.querySelectorAll('.decrease-quantity');
    const addCartButtons = document.querySelectorAll('.confirm-add-cart');

    increaseButtons.forEach(button => button.addEventListener('click', increaseQuantity));
    decreaseButtons.forEach(button => button.addEventListener('click', decreaseQuantity));
    addCartButtons.forEach(button => button.addEventListener('click', addProductToCart));

    const neighborhoodShipment = [
        {
            neighborhood: 'Centro',
            shipment: 150
        },
        {
            neighborhood: 'Farol',
            shipment: 100
        },
        {
            neighborhood: 'Gruta',
            shipment: 90
        }
    ];
    const foneNumber = '5582996252537'

    let dataCartIsEmpty = true;

    // Carrinho
    const inputCep = document.querySelector('#cep');
    const inputStreet = document.querySelector('#street');
    const inputCity = document.querySelector('#city');
    const inputState = document.querySelector('#state');
    const inputNeighborhood = document.querySelector('#neighborhood');
    const inputNumber = document.querySelector('#number');
    const errorDiv = document.querySelector('#error-message');
    const savedProductsArray = JSON.parse(localStorage.getItem('productsArray'));
    const totalOrder = savedProductsArray ?
        savedProductsArray.reduce((accumulator, currentProduct) => {
            return accumulator + (currentProduct.price * currentProduct.quantity)
        }, 0) : 0;

    updateCart(savedProductsArray ? savedProductsArray.length : 0);
    
    const subtotal = document.querySelector('#subtotal-value');
    const shipmentInput = document.querySelector('#shipment-value');
    const totalOrderField = document.querySelector('#total-order-value');
    if(shipmentInput){
        const shipmentValue = shipmentInput.textContent;
        totalOrderField.textContent = Number(totalOrder) * Number(shipmentValue);
    }
    


    if(savedProductsArray){
        const totalOrder = savedProductsArray.reduce(
            (subtotal, currentProduct) => {
                return subtotal + (currentProduct.price * currentProduct.quantity)
            }, 0);
    }
    
    const btnReserveOrder = document.querySelector("#reserveOrder")

    function searchCep(){

        const typedCep = inputCep.value.trim().replace(/\D/g, '');
        url = `https://viacep.com.br/ws/${typedCep}/json/`;
        fetch(url)
        .then(response => {
                return response.json();
            })
            .then(data => {
                if(!data.erro){
                    inputStreet.value = data.logradouro;
                    if(data.bairro){
                        inputNeighborhood.value = data.bairro;
                        let changeEvent = new Event('change', {bubbles: true});
                        inputNeighborhood.dispatchEvent(changeEvent);
                    }
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

    const btnSearchCep = document.querySelector('.search-cep img');
    if(btnSearchCep)
        btnSearchCep.addEventListener('click', searchCep);
    
    const tBody = document.querySelector('.info-products-order tbody');
    
    if(savedProductsArray){
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

            if(tBody)
                tBody.appendChild(row);

        }
    }
    
    
    function clearCart(){
        localStorage.removeItem('productsArray');
        inputCep.value = '';
        inputStreet.value = '';
        inputCity.value = '';
        inputState.value
        inputNeighborhood.value = '';
        inputNumber.value = '';
        dataCartIsEmpty = true;
        location.reload();
    }

    const btnResetCart = document.querySelector('#clearCart');
    if(btnResetCart)
        btnResetCart.addEventListener('click', clearCart);


    function finishOrder(){
        const fullName = document.querySelector('#fullname').value;
        const rg = document.querySelector('#rg').value;
        const cpf = document.querySelector('#cpf').value;
    
        const cep = inputCep.value;
        const street = inputStreet.value;
        const city = inputCity.value;
        const state = inputState.value;
        const neighborhood = inputNeighborhood.value;
        const number = inputNumber.value;
    
        let formattedText = `
            Olá. Gostaria de fazer um pedido.
            Meus dados são:
            Nome: ${fullName}
            RG: ${rg}
            CPF: ${cpf}
            CEP: ${cep}
            Endereço: Rua ${street}, n.º ${number}, Bairro: ${neighborhood}, ${city}, ${state}
            Os produtos que escolhi são:
        `;
    
        savedProductsArray.forEach(product => {
            formattedText += `
                Nome do produto: ${product.productName}
                Preço: R$ ${product.price}
                Quantidade: ${product.quantity}
            `
        });
    
        formattedText += `Total do pedido: R$ ${parseFloat(totalOrder)}`;
    
        // Encoding text because of special characters
        const encodedText = encodeURIComponent(formattedText);
    
        // Sendind message to WhatsApp
        url = `https://web.whatsapp.com/send?phone=${foneNumber}&text=${encodedText}`;
        window.open(url, '_blank');
    
    }
    
    if(btnReserveOrder)
        btnReserveOrder.addEventListener('click', finishOrder);

    function updateInfosOrder(discount){
        if(subtotal){
            subtotal.textContent = Number(totalOrder - discount).toFixed(2);
        }

        if(shipmentInput && totalOrderField && savedProductsArray.length > 0 && inputNeighborhood.value != ""){
            const foundNeighborhood = neighborhoodShipment.find(info => {info.neighborhood === inputNeighborhood.value});
            const shipmentValue = foundNeighborhood ? foundNeighborhood.shipment : 150;
            shipmentInput.textContent = Number(shipmentValue).toFixed(2);
            totalOrderField.textContent = Number(totalOrder + shipmentValue).toFixed(2);
        }
    }

    if(inputNeighborhood){
        inputNeighborhood.addEventListener('change', function(){
            dataCartIsEmpty = false;
            updateInfosOrder(0);
            updateButtonSendOrder();
        })
    }

    const avaliableCuppons = [
        {
            value: 'FREE10',
            discount: 10
        },
        {
            value: 'FREE20',
            discount: 20
        },
        {
            value: 'FREE30',
            discount: 30
        }
    ]

    function addCuppon(){
        const inputCuppon = document.querySelector('#discount');
        const validCuppon = avaliableCuppons.find(cuppon => cuppon.value === inputCuppon.value);
        const textCuppon = document.querySelector('.cuppon-added span');
        const errorCuppon = document.querySelector('.cuppon-error');

        errorCuppon.style.display = 'none';

        if(validCuppon){
            textCuppon.textContent = validCuppon.value;
            updateInfosOrder(validCuppon.discount)
        }else{
            errorCuppon.style.display = 'block';
            updateInfosOrder(0);
        }
    }

    const btnAddCuppon = document.querySelector('#btnAddCuppon');
    if(btnAddCuppon)
        document.querySelector("#btnAddCuppon").addEventListener('click', addCuppon);

    function updateButtonSendOrder(){
        const input = document.querySelector("#reserveOrder");
        console.log(dataCartIsEmpty);
        if(input && !dataCartIsEmpty){
            input.classList.remove("disabled-send-order");
        }else{
            input.classList.add("disabled-send-order");
        }
    }

})