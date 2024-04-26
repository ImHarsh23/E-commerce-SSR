let cart = document.querySelector("#cart-container");
let quantity = document.querySelectorAll(".quantity");


function updateCart(data){
    cart.innerHTML = "";
    data.forEach((item)=>{
        cart.innerHTML +=
            `<div class="cart-item-container">
            <div>
                <img src="${item.id.imageurl}" alt="">
            </div>

            <div>
                <div>
                    <h1> ${item.id.name} </h1>
                    <p>${item.id.description}</p>
                    <div class="cart-button-area">
                        <p>Quantity :</p>
                        <a href="/shop/cart/decrement/${item.id._id}"> <button class="decrement"> - </button></a>
                        <div class="quantity">${item.qty}</div>
                        <a href="/shop/cart/increment/${item.id._id}"><button class="increment"> + </button></a>
                        <div style="display: none;">${item.id._id}</div>
                    </div>
                </div>
            </div>
        </div>`
    })

    console.log(data);

    let totalPrice = 0;
    data.forEach((element)=>{
        totalPrice += element.qty * element.id.price;
    })

    cart.innerHTML+= `<div class="center subtotal">
                        <h1>Subtotal: ₹${totalPrice}</h1>
                    </div>`;
}



cart.addEventListener("click", async (e)=>{
    e.preventDefault();
    let item = e.target;
    if(item.classList.contains('increment')){
        let id = e.target.parentElement.parentElement.lastElementChild.textContent;
        axios.get(`/shop/cart/increment/${id}`).then(({data})=>{
            updateCart(data);
        })
    }


    if(item.classList.contains('decrement')){
        let id = e.target.parentElement.parentElement.lastElementChild.textContent;
        axios.get(`/shop/cart/decrement/${id}`).then(({data})=>{
            data.forEach(element => {
                updateCart(data);
            });
        })
    }
})