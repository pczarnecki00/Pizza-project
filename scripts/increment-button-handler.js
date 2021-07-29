import { dishes } from './pizzas.js';
const orderBtn = document.querySelectorAll('.increment-handle');
const products = document.querySelectorAll('.orders__list-product');

const decrement = (el) => {
    dishes.forEach(dish => 
        dish.name == el.dataset.id && (dish.value = dish.value -1, console.log(dish.value))
    )
}

const incremenet = (el) => {
     
}

const orderHandler = (el) => {
    let pizzaItem = document.createElement('li');
    pizzaItem.classList.add('order-box__list-item')
    // pizzaItem.setAttribute('data-id', el.dataset.id)
    // dish.name == el.dataset.id ? ((variable = dish),(dish.value +=1)) : ''
    dishes.forEach(dish => {
        dish.name == el.dataset.id && (pizzaItem.innerHTML = `<div class="list-item__name-box"><span class="list-item__number">${dish.value = dish.value + 1}</span> x <span
                        class="list-item__name">${dish.name}</span></div>
    
                <div class="list-item__price-value">
                    <span class="price-value__price">$${(dish.price * dish.value).toFixed(2)}</span>
                     <div class="price-value__increment-decrement">
                         <button data-id="${el.dataset.id}" class="btn btn--increment">+</button>
                         <button data-id="${el.dataset.id}" class="btn btn--decrement">-</button>
                     </div>
                 </div>`
        , el.querySelector('.btn-order__value-indicator').innerHTML = dish.value, pizzaItem.querySelector('.btn--decrement').addEventListener('click', function(){decrement(this)}))
        document.querySelector('.order-box__list').appendChild(pizzaItem);
        document.querySelectorAll('.btn-order__value-indicator').forEach(element => !element.innerHTML  ? (element.style = "opacity: 0") : (element.style = "opacity: 1"))
        
    })
    
}



orderBtn.forEach(element => {
    element.addEventListener('click', function (event) {
        orderHandler(event.target)
    })
});
