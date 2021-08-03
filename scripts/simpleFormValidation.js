const form = document.getElementById('order-form');
const someToggles = () => {
    document.querySelector('.modal-form__checkout-content').style = 'display:none;' ;
    document.querySelectorAll('.modal-form__progress-line')[0].classList.toggle('inactive') ;
    document.querySelectorAll('.modal-form__progress-bar-step')[1].classList.toggle('inactive') ;
    document.querySelectorAll('.modal-form__number')[1].classList.toggle('inactive');
    document.querySelector('.confirmation').style = 'display: block; text-align:center;'
}
const formValidation = () => {
    const inputContainer = form.querySelectorAll('.modal-form__contact-item')
    let flagSpan = true;
    let flagList = true;
    inputContainer.forEach(item => {
        const valueSpan = item.querySelector('.modal-form__label-input ').innerHTML;
        const valueInput = item.querySelector('.modal-form__contact-input ')?.value;
        const spanError = item.querySelector('.modal-form__span-error')
        valueSpan.includes('*') && !valueInput || valueInput == 'select' ? (spanError.style = 'display:inline;', flagSpan = false) : spanError !== null ? (spanError.style = 'display:none;', flagSpan = true) : ''

    })
    document.querySelector('.order-box__list').childNodes.length < 1 ? flagList = false : flagList =true;
    flagList && flagSpan ? someToggles() : '';

}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    formValidation()
})
