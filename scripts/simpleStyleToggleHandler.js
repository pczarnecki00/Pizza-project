const restaurantHours = document.querySelector('.restaurant-info__restaurant-status');
const deliveryType = document.querySelector('.delivery__delivery-select');
const tipBtn = document.querySelectorAll('.btn--tip')
const radioStyle = document.querySelectorAll('.modal-form__radio')


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

document.querySelector('.order-comment').addEventListener('click', function(){
    document.querySelector('.modal-form__textarea').classList.toggle('modal-form__textarea--active')
})

radioStyle.forEach(item => item.addEventListener('click', function(){
    radioStyle.forEach(item => item.checked ? item.parentElement.style = 'border-color: #000' : item.parentElement.style = 'border: 2px solid rgba(0, 0, 0, 0.096);')
    document.querySelector('.radio-delivery').checked ? document.querySelector('.modal-form__adress').style = 'display:flex' : document.querySelector('.modal-form__adress').style = 'display: none;'
}))

document.querySelector('.new-acc').addEventListener('click', function() {
    document.querySelector('.new-acc').checked ? document.querySelector('.modal-form__new-acc').style = 'display: block;' : document.querySelector('.modal-form__new-acc').style = 'display: none;';
})

document.querySelector('.hamburger').addEventListener('click', function(){
    document.querySelector('.navigation-bar__list').classList.toggle('hamburger-open')
})



