'use stirct';

(function ($) {

    /* Массив, который хранит значения предыдущих значений поля "Кол" для каждой карточки 
    товаров.
    Служит для того, чтобы корректно расчитывать значение сумарного количества товаров в корзине 
    и их цены при изменении количества товаров в карточке товара */
    var previousAmountsArray = new Array($('.product-box__btn').length).fill(0);

    $('.product-box__btn').click(function () {

        /* Получаем индекс текущей карточки товара */
        var $index = $(this).parents('.product-box__item').index();

        /* Получаем значение предыдущего значения поля "Кол", а затем текущего */
        var previousAmount = previousAmountsArray[$index];

        var $amount = parseInt($(this).parent().find('.qty__item').val());

        /* Изменилось ли количество товаров в данной карточке */
        if (($amount >= 0) && ($amount !== previousAmount)) {

            /* Получаем разницу количества товаров в данной карточке */
            var amountDifference = $amount - previousAmount;

            /* Получаем значение количества товаров в корзине */
            var $amountCurrent = parseInt($('.top-cart__goods').text());

            /* Изменяем значения товаров в корзине и меняем предыдущее значение
            поля "Кол" в массиве previousAmountsArray */
            $('.top-cart__goods').text($amountCurrent + amountDifference);
            previousAmountsArray[$index] = $amount;

            /* Рассчитываем новую сумарную цену товаров в корзине */
            var $priceCurrent = parseInt($('.top-cart__price').text());
            var $oneItemPrice = parseInt($(this).parent().find('.products-box__price').text());

            $price = $oneItemPrice * amountDifference;

            $('.top-cart__price').text($priceCurrent + $price);

        }
    });

    /* Фильтр по категориям */
    $('.select-box .select-control').change(function () {
        var $this = $(this);
        if ($this.val() === '0') {
            $('.product-box__item').removeClass('hide-by-category');
        } else {
            $('.product-box__item').addClass('hide-by-category');
            $('[data-item-type="' + $this.val() + '"]').removeClass('hide-by-category');
        }
    });

    /* Фильтр по ценам */
    $('.price-select-box .select-control').change(function () {
        var $this = $(this);
        var $product = $('.product-box__item');
        if ($this.val() === '0') {
            $product.removeClass('hide-by-price');
        } else {
            $product.addClass('hide-by-price');
            $product.each(function () {
                if (parseInt($(this).find('.products-box__price').text()) <= $this.val()) {
                    $(this).removeClass('hide-by-price');

                }
            });
        }
    });

    /* Офрмить заказ */
    $('.btn-check').click(function () {
        $('.modal').removeClass('hidden');
        $('.locked-bg').removeClass('hidden');

        $('.locked-bg').click(function () {
            $('.modal').addClass('hidden');
            $('.locked-bg').addClass('hidden');
        });
    });


    /* Валидация форм */
    $('.modal__button').click(function (event) {

        var isValid = true;

        $('.modal__input').each(function () {

            var $this = $(this);

            if ($this.attr('type') === 'email') {
                var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (!$this.val().match(mailformat)) {
                    isValid = false;
                }
            } else {
                var value = $this.val();
                if (value === '') {
                    isValid = false;
                } else {
                    var matches = 0;
                    for (var i = 0; i < value.length; i++) {
                        if (value[i] === ' ') {
                            matches++;
                        }
                    }
                    isValid = (value.length === matches) ? false : true;
                }
            }
        });

        if (!isValid) {
            alert('ОШИБКА! Одно или несколько полей формы заполнены некорректно или пусты');
            event.preventDefault();
        } else {
            alert('Ваще чётенько!');
        }
    });
})(jQuery);