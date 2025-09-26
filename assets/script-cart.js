window.addEventListener("DOMContentLoaded", () => {
    // Cart handling
    const productsArray = [];
    const foneNumber = '5582996252537'

    // Carrinho
    const inputCep = document.querySelector('#cep');
    const inputStreet = document.querySelector('#street');
    const inputNumber = document.querySelector('#number');
    const inputNeighborhood = document.querySelector('#neighborhood');
    const inputCity = document.querySelector('#city');
    const inputState = document.querySelector('#state');
    const errorDiv = document.querySelector('#error-message');
    const savedProductsArray = JSON.parse(localStorage.getItem('productsArray'));
    const totalOrder = savedProductsArray.reduce(
        (subtotal, currentProduct) => {
            return subtotal + (currentProduct.price * currentProduct.quantity)
        }, 0);
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
    
        const tBody = document.querySelector('.info-products-order tbody');
        
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
        
        function clearCart(){
            localStorage.removeItem('productsArray');
            inputCep.value = '';
            inputStreet.value = '';
            inputCity.value = '';
            inputState.value
            inputNeighborhood.value = '';
            inputNumber.value = '';
            location.reload();
        }

        const btnResetCart = document.querySelector('#clearCart');
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
        
        btnReserveOrder.addEventListener('click', finishOrder);

})