import { dishes } from './pizzas.js';

(function (state) {
    const initApp = () => {
        const initialState = {
            list: []
        };
        state = initialState;
    }

    const incremenet = (id) => {
        
        const cartList = state.list.some(item => id.dataset.id === item.name)
            ? state.list.map(item => id.dataset.id === item.name ? ({ ...item, count: item.count + 1 }) : item)
            : [...state.list, { name: dishes[id.dataset.id].name, price: dishes[id.dataset.id].price, count: 1}]
        state.list = cartList;
        cartListRender(cartList);
        

    }

    const decrement = (id) => {
        const cartList = state.list.some(item => id.dataset.id === item.name && item.count > 1)
            ? state.list.map(item => id.dataset.id === item.name ? ({ ...item, count: item.count - 1}) : item)
            : state.list.filter(item => id.dataset.id !== item.name)
        state.list = cartList;
        cartListRender(cartList);

    }

    const totalPrice = () => {
        let totalPrice = 0;
        state.list.forEach(item => {
            totalPrice += item.count * item.price
        })
        const tipValue = document.querySelector('.btn--tip-active').innerHTML.slice(0,-1)
        document.querySelector('.text--tip'). innerHTML = `$${((tipValue/100) * totalPrice).toFixed(2)}`;
        document.querySelector('.text-total').innerHTML = `$${(totalPrice + ((tipValue/100) * totalPrice)).toFixed(2)}`
        
        
        
    }

    const clearList = () => {
        const cartList = document.querySelector('.order-box__list');

        while (cartList.firstChild) {
            cartList.removeChild(cartList.firstChild);
        }

    }


    const indicatorValue = (id) => {
    let indicator  = 0;
     state.list.forEach ( item => id.dataset.id === item.name && (indicator = item.count));
     document.querySelectorAll('.btn-order__value-indicator').forEach(item => id.dataset.id === item.dataset.id &&(item.innerHTML = indicator))
     document.querySelectorAll('.btn-order__value-indicator').forEach(item => +item.innerHTML < 1 ? item.style = 'opacity: 0': item.style = 'opacity:1')
     
    }
    const cartListRender = (list) => {
        clearList();
        const cartList = document.querySelector('.order-box__list');

        list.forEach(pizza => {
            let itemPizza = document.createElement('li');
            itemPizza.classList.add('order-box__list-item');
            itemPizza.innerHTML = `<div class="list-item__name-box"><span class="list-item__number">${pizza.count}</span> x <span
                            class="list-item__name">${pizza.name}</span></div>
    
                    <div class="list-item__price-value">
                         <span class="price-value__price">$${(pizza.price * pizza.count).toFixed(2)}</span>
                          <div class="price-value__increment-decrement">
                              <button data-id="${pizza.name}" class="btn btn--increment">+</button>
                             <button data-id="${pizza.name}" class="btn btn--decrement">-</button>
                         </div>
                     </div>`;

            cartList.appendChild(itemPizza)

        })

    }

    const clickHandler = (id) => {
        id.classList.contains('btn--increment') && incremenet(id) || id.classList.contains('btn--decrement') && decrement(id);
        
        totalPrice();

    }
    
    const modalAddToCart = (x , y) => {
        
           const cartList =  state.list.some(item => x.dataset.id === item.name)
            ? state.list.map(item => x.dataset.id === item.name ? ({ ...item, count: item.count + y }) : item)
            : [...state.list, { name: dishes[x.dataset.id].name, price: dishes[x.dataset.id].price, count: y}]
            state.list = cartList
            cartListRender(cartList)
            indicatorValue(x);
            modalCloser()
    }
    const modalHandler = (x) => {
        const modalCount = document.querySelector('.modal__count')
        x.classList.contains('modal__decrement') && (+modalCount.value >= 1) && (modalCount.value = +modalCount.value - 1 );
        x.classList.contains('modal__increment') && (modalCount.value = +modalCount.value + 1 );
        x.classList.contains('modal_btn-to-cart') && modalAddToCart(x, +modalCount.value);
                    
        document.querySelector('.modal__pizza-price').innerHTML = `$${(+modalCount.value * dishes[modalCount.dataset.id].price).toFixed(2)}`;
        

     
    }
    const modalCloser = () => {
        document.querySelector('.modal').style = 'height:0; opacity:0 ;';
        document.body.style = 'overflow: auto;'
    }

    const modalOppener = (id) => {

        const modalPizzaOrder = document.querySelector('.modal__pizza-order');
        document.body.style = "overflow: hidden;"
        document.querySelector('.modal').style = "height: 100%; opacity:1;"

        modalPizzaOrder.innerHTML = `
        <span class="modal__close">X</span>
        <div class="modal__product">
            <div class="modal__img-box">
                <img class="modal__img" src="${dishes[id.dataset.id].img}" alt="${dishes[id.dataset.id].name}">
            </div>
            <div class="modal__description">
                <h2 class="modal__pizza-name">${dishes[id.dataset.id].name}</h2>
                <span class="modal_pizza-ingridienets">${dishes[id.dataset.id]?.details}</span>
            </div>
            <div class="modal__btn-panel">
                <div class="modal__count-box">
                    <button class="modal__decrement btn-modal">-</button>
                    <input data-id="${dishes[id.dataset.id].name}" type="number" value="1" min="0" class="modal__count">
                    <button class="modal__increment btn-modal">+</button>
                </div>
                <span class="modal__pizza-price">$${(dishes[id.dataset.id].price).toFixed(2)}</span>
                <button data-id="${dishes[id.dataset.id].name}" class="modal_btn-to-cart btn-order btn-modal">Add to cart</button>
            </div>
        </div>`;

    }

    const openModalForm =()=>{
        document.querySelector('.modal-form').style = 'height: 100vh; opacity: 1; overflow:scroll;';
        document.body.style = 'overflow:hidden;'
    }
    const closeModalForm =()=>{
        document.querySelector('.modal-form').style = 'height: 0; opacity: 0; overflow:hidden;'
        document.body.style = 'overflow:auto;'
    }
    initApp();

    document.querySelector('.content').addEventListener('click', function (e) {
        
        clickHandler(e.target);
        indicatorValue(e.target);
        e.target.classList.contains('btn-modal') && modalHandler(e.target)
        e.target.classList.contains('modal__close') && modalCloser();
        e.target.classList.contains('list-product__img') && modalOppener(e.target);
        e.target.classList.contains('modal-cross') && closeModalForm();
        e.target.classList.contains('order-box__btn') && openModalForm();

        state.list.length <= 0 
            ? (document.querySelector('.order-box__empty').style = 'display: flex;', document.querySelector('.order-box__display-style').style = 'display:none;')
            : (document.querySelector('.order-box__empty').style = 'display: none;', document.querySelector('.order-box__display-style').style = 'display:block;')
            
       
    });

    
    
})(document.state);