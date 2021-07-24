'use strict';

$(function() {
    // drawer
    $('body, html').addClass('drawer-close');

    $('.drawer').on('click', function() {
        if ($('.drawer').children('.hamburger-img').hasClass('batsu-img')) {
            $('body').removeClass('drawer-open');
            $('body, html').addClass('drawer-close');
        } else {
            $('body, html').removeClass('drawer-close');
            $('body').addClass('drawer-open');
        }
        $('html').toggleClass('drawer-fixed');
        $('.hamburger-img').toggleClass('batsu-img');
        $('.drawer-background').toggleClass('overlay');
        $('.header-nav').toggleClass('open');
    });

    $('.header-nav-item-link').on('click', function() {
        $('body').removeClass('drawer-open');
        $('body, html').addClass('drawer-close');
        $('html').toggleClass('drawer-fixed');
        $('.hamburger-img').toggleClass('batsu-img');
        $('.drawer-background').toggleClass('overlay');
        $('.header-nav').toggleClass('open');
    });

    // slick
    $('.results-slick').slick({
        dots: true,
        variableWidth: true,
        arrows: false,
        dotsClass: 'slide-dots',
        infinite: false,
    });

    $('.slide-dots li').first().addClass('is-active');

    $('.slide-dots li').on('click', function() {
        $('.slide-dots li').removeClass('is-active');
        if ($(this).hasClass('slick-active')) {
            $(this).addClass('is-active');
        }
        return false;
    });

    // スライド
    $('.qa-item').on('click', function() {
        $(this).children('.qa-body').slideToggle('.slide-open');
        $(this).children('.qa-header').children('.qa-accordion').toggleClass('is-close');
        if ($(this).children('.qa-header').children('.qa-accordion').hasClass('is-close')) {
            $(this).children('.qa-header').children('.qa-accordion').removeClass('is-open');
        } else {
            $(this).children('.qa-header').children('.qa-accordion').addClass('is-open');
        }
        return false;
    });

    // google form
    // contactの送信の挙動
    let $form = $('#js-form');
    $form.submit(function(e) { 
        $.ajax({ 
            url: $form.attr('action'), 
            data: $form.serialize(),
            type: "POST", 
            dataType: "xml", 
            statusCode: { 
                0: function() { 
                    //送信に成功したときの処理 
                    $form.slideUp();
                    $('#js-success').slideDown();
                }, 
                200: function() { 
                    //送信に失敗したときの処理 
                    $form.slideUp();
                    $('#js-error').slideDown();
                }
            } 
        });
        return false;
    }); 
    
    // フォームを全て記入したら送信できる処理
    let $submit = $('#js-submit');
    $('#js-form select, #js-form input, #js-form textarea').on('change', function() {
        if(
        $('#js-form select[name="entry.1563684706"]').val() !== "" &&
        $('#js-form input[type="text"]').val() !== "" &&
        $('#js-form input[type="email"]').val() !== "" &&
        ($('#js-form #male input[name="entry.1815157720"]').prop('checked') || $('#js-form #female input[name="entry.1815157720"]').prop('checked')) === true &&
        $('#js-form textarea[name="entry.1476164108"]').val() !== "" 
        ) {
            $submit.prop('disabled', false);
            $submit.addClass('-active'); 
        } else {
            $submit.prop('disabled', true);
            $submit.removeClass('-active');
        }
        return false;
    });

    // TOPへ戻るボタン
    $(function() {
        const totop = $('#totop');
        // ボタン非表示
        totop.hide();
        // 100px スクロールしたらボタン表示
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                totop.fadeIn(300);
            } else {
                totop.fadeOut(300);
            }
        });
    });

    // #から始まるURLがクリックされた時
    $('a[href^="#"]').on('click', function() {
        // 移動速度を指定（ミリ秒）
        let speed = 500;
        // hrefで指定されたidを取得
        let id = $(this).attr("href");
        // idの値が#のみだったらターゲットをhtmlタグにしてトップへ戻るようにする
        let target = $("#" == id ? "html" : id);
        // ページのトップを基準にターゲットの位置を取得
        let position = $(target).offset().top;
        // ターゲットの位置までspeedの速度で移動
        if (id === "#") {
            $("html, body").animate(
                {
                    scrollTop: position
                },
                speed
            );
        } else if ($(window).width() < 768) {
            $("html, body").delay(400).animate(
                {
                    scrollTop: position
                },
                speed
            );
        } else {
            $("html, body").animate(
                {
                    scrollTop: position
                },
                speed
            );
        }
        return false;
    });
});
