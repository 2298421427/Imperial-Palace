var $win = $(window),
    $body = $('body'),
    ua = navigator.userAgent.toLowerCase();


$.fn.smoothLink2 = function() {

    this.each(function() {
        var idx = this.href.indexOf('#');
        if (idx >= 0) {
            $(this).click(function() {
                var id = this.href.slice(idx);
                if (id != '#') {

                    // 固定ヘッダーの高さを取得
                    var fixedHeader = $('#head').outerHeight(true);
                    var mt = window.innerWidth > 767 ? fixedHeader : 0;
                    $('html, body').animate({
                        scrollTop: $(id).offset().top - mt
                    }, 1200, 'easeOutExpo');
                }
                return false;
            });
        }
    });

    return this;
};

// ロード時

$win.on('load', function() {

    // URL（ハッシュ）を取得
    var hash = location.hash;

    // URLにハッシュがあるとき
    if (hash) {
        // ハッシュIDのオフセットトップを取得
        var hashOffset = $(hash).offset().top;

        // 固定ヘッダーの高さを取得
        var fixedHeader = $('#head').outerHeight(true);

        // そこから固定ヘッダーの高さを引いた値を取得
        var st = hashOffset - fixedHeader;

        // カテゴリナビを取得
        var $cnav = $('.season-anchor-wrap');

        if ($cnav.length > 0) {

            // カテゴリナビの高さを取得
            var cnavH = $('.season-anchor-wrap').outerHeight(true);

            // カテゴリナビの高さを引いた値を取得
            st = st - cnavH;

        }

        // その値をウィンドウのスクロールトップに設定
        $('html,body').animate({
            scrollTop: st
        }, 1);
    }


});



function initPage() {

    // objectFitImages（external js : /common/js/lib/ofi.min.js）
    objectFitImages('img.img-ofi-cover, img.img-ofi-contain');

    // position sticky（external js : /common/js/lib/sticky-state.min.js）
    // function detectSticky() {
    //   const div = document.createElement('div');
    //   div.style.position = 'sticky';
    //   return div.style.position.indexOf('sticky') !== -1;
    // }
    // if (!detectSticky()) new StickyState(document.querySelectorAll('.sticky'));

    // pagetop
    var $pt = $('#pagetop');
    $pt.hide();
    $pt.find('a').on('click', function() {
        $('html, body').scrollTop(377).stop().animate({
            scrollTop: 0
        }, 890, 'easeOutExpo');
        return false;
    });
    $win.on('load scroll', function() {
        if ($win.scrollTop() > 100) $pt.fadeIn();
        else $pt.fadeOut();
    });

    // Tel link
    if ((ua.indexOf('windows') > 0 && ua.indexOf('phone') > 0) ||
        (ua.indexOf('iphone') > 0) ||
        (ua.indexOf('ipod') > 0) ||
        (ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0) ||
        (ua.indexOf('firefox') > 0 && ua.indexOf('mobile') > 0) ||
        (ua.indexOf('blackberry') > 0)) {

        // 画像
        $('.tel-link img').each(function() {
            var alt = $(this).attr('alt');
            $(this).wrap($('<a>').attr('href', 'tel:' + alt.replace(/-/g, '')));
        });
    }

    // smoothLink
    $('.smooth a').smoothLink2();

    // navigation
    $('#gnav > li').navigation();

    // inview
    inView('.inview').on('enter', function(el) {
        setTimeout(function() {
            $(el).animate({
                opacity: 1
            }, 800);
        }, 300);
    });

}


function setGnav() {

    // グローバルナビ
    //MENUボタン
    var $menuBtn = $('#js-panel-btn');
    var $menuWrap = $('#gnav-wrap');

    $win.breakPoint({
        smartPhoneWidth: 767,
        tabletWidth: 0,
        pcMediumWidth: 0,

        onSmartPhoneEnter: function() {

            $('#gnav-wrap').css('display', 'none');

            $menuBtn.on('click.sp', function() {
                $menuBtn.toggleClass('close');

                if ($menuBtn.hasClass('close')) {

                    $menuWrap.show().addClass('show');
                    $body.addClass('gnav-open');
                    $('#wrapper').css({
                        position: 'fixed',
                        opacity: 0
                    });

                } else {

                    $menuWrap.hide().removeClass('show');
                    $body.removeClass('gnav-open');
                    $('#wrapper').css({
                        position: 'inherit',
                        opacity: 1
                    });

                }
                return false;
            });

            // グローバルナビのアコーディオン
            $('.has-gnav-child').on('click', function() {
                return false;
            });

            $('.gnav-parent').on('click', function() {
                if ($(this).hasClass('close')) {
                    $(this).removeClass('close');
                    $(this).parents().children('.gnav-child-wrap').slideUp();
                } else {
                    $(this).addClass('close');
                    $(this).parents().children('.gnav-child-wrap').slideDown();
                }
            });

        },
        onPcEnter: function() {

            // SPレイアウトからPCレイアウトに戻したとき
            // 設定をリセットする
            $('#gnav-wrap').css('display', 'block');
            $('#wrapper').css({
                position: 'inherit',
                opacity: 1
            });

            // グローバルナビのハンバーガーメニューをクリック
            $menuBtn.on('click.pc', function() {
                $menuBtn.toggleClass('close');

                if ($menuBtn.hasClass('close')) {
                    $menuWrap.show().addClass('show');
                    $('body').addClass('gnav-open');
                } else {
                    $menuWrap.hide().removeClass('show');
                    $('body').removeClass('gnav-open');
                }
                return false;
            });

            // PCモード時の処理を書く
            $('#gnav').on({
                'mouseenter': function() {
                    $(this).delay(500).queue(function() {
                        $(this).addClass('gnav-hover').dequeue();
                    });
                },
                'mouseleave': function() {
                    $(this).removeClass('gnav-hover');
                }
            });

            // 下層ヘッダーのリサイズ
            $win.on('load scroll', function() {
                var winTop = $win.scrollTop();

                if (winTop >= 1) {
                    $body.addClass('nav-fixed');
                } else {
                    $body.removeClass('nav-fixed');
                }
            });

        },
        onSmartPhoneLeave: function() {
            $menuBtn.off('click.sp');
            $('.has-gnav-child').off('click');
            $('.gnav-parent').off('click');
        },
        onPcLeave: function() {
            $menuBtn.off('click.pc');
            $menuWrap.hide().removeClass('show');
            $('body').removeClass('gnav-open');
        }
    });

}


// ページ初期設定
initPage();

// グローバルナビ設定
setGnav();