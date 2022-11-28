'use strict';

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

var $win = $(window);

// メインビジュアルのスライダー設定
function setTopMainSlider() {
    $('.js-main-slider').on('init', function() {
        $(this).addClass('on');
    }).slick({
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 5000,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        lazyLoad: 'ondemand',
        pauseOnFocus: false,
        pauseOnHover: false
    });
}

// 真如堂の四季スライダー設定
function setTopGallerySlider() {
    var _$$slick;

    var index = $('.main-gallery-set').index($('.gallery-current'));

    $('.js-gallery-slider').slick((_$$slick = {
        autoplay: false,
        speed: 400,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.main-gallery-thumb',
        initialSlide: index
    }, _defineProperty(_$$slick, 'infinite', false), _defineProperty(_$$slick, 'responsive', [{
        breakpoint: 768,
        settings: 'unslick'
    }]), _$$slick)).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('.main-gallery-set.-anim').removeClass('-anim');
        $('.main-gallery-set').eq(nextSlide).addClass('-anim');
    });

    // サムネイル
    $('.main-gallery-thumb').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.js-gallery-slider',
        focusOnSelect: true,
        initialSlide: index,
        infinite: false,

        responsive: [{
            breakpoint: 768,
            settings: 'unslick'
        }]
    });

    inView('.main-gallery').on('enter', function(el) {
        $('.gallery-current').addClass('-anim');
    });
}

function setTopGnav() {
    $win.breakPoint({
        smartPhoneWidth: 767,
        tabletWidth: 0,
        pcMediumWidth: 0,

        onSmartPhoneEnter: function onSmartPhoneEnter() {},
        onPcEnter: function onPcEnter() {

            // グローバルナビの固定
            var $mvH = $('.main-visual').outerHeight();
            var $gNav = $('#head');

            $win.on('load.gnavFadeIn scroll.gnavFadeIn', function() {

                if ($win.scrollTop() > $mvH) {
                    $gNav.addClass('fadein');
                } else {
                    $gNav.removeClass('fadein');
                }
            });
        },
        onSmartPhoneLeave: function onSmartPhoneLeave() {},
        onPcLeave: function onPcLeave() {
            $win.off('load.gnavFadeIn scroll.gnavFadeIn');
        }
    });
}

// メインビジュアルのスライダー
setTopMainSlider();

// グローバルナビの固定
setTopGnav();

// 真如堂の四季スライダー
setTopGallerySlider();
