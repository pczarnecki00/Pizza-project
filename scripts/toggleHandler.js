import { dishes } from './pizzas.js';
const restaurantHours = document.querySelector('.restaurant-info__restaurant-status');
const deliveryType = document.querySelector('.delivery__delivery-select');
const tipBtn = document.querySelectorAll('.btn--tip')
const valueIndicator = document.querySelectorAll('.btn-order__value-indicator');


restaurantHours.addEventListener('click', function() {
    console.log(`clicked`);
    document.querySelector('.restaurant-info__open-hours').classList.toggle('open-hours--active')
})

deliveryType.addEventListener('click', function(event){
    event.target.value == 'delivery' ? document.querySelector('.delivery__adress').style = "display: auto;" : document.querySelector('.delivery__adress').style = "display: none;"
})

tipBtn.forEach(item => item.addEventListener('click', function (event) {
    for ( let btn of tipBtn ) {
        btn.classList.contains('btn--tip-active') && btn.classList.remove('btn--tip-active');
    }
    event.target.classList.add('btn--tip-active')
}))

