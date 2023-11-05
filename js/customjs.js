/*
Template: AItech - Artificial Neural Network AI HTML Template
Author: peacefulqode.com
Version: 1.0
Design and Developed by: PeacefulQode
*/

/*================================================
[  Table of contents  ]
==================================================

==> Page Loader
==> Search Button
==> Accordion
==> Sidebar Toggle
==> Sticky Header
==> Slick Slider
==> Swiper Slider
==> Owl Carousel
==> Back To Top
==> Isotope
==> Counter
==> WOW
==> Map


==================================================
[ End table content ]
================================================*/


(function (jQuery) {
    "use strict";
    jQuery(window).on('load', function (e) {


        /*==================================================
        [ Page Loader ]
        ==================================================*/
        jQuery("#pq-loading").fadeOut();
        jQuery("#pq-loading").delay(0).fadeOut("slow");

        var Scrollbar = window.Scrollbar;


        /*==================================================
        [ Search Button ]
        ==================================================*/
        jQuery('#pq-seacrh-btn').on('click', function () {
            jQuery('.pq-search-form').slideToggle();
            jQuery('.pq-search-form').toggleClass('pq-form-show');
            if (jQuery('.pq-search-form').hasClass("pq-form-show")) {
                jQuery(this).html('<i class="ti-close"></i>');
            } else {
                jQuery(this).html('<i class="ti-search"></i>');
            }
        });


        /*==================================================
        [ Accordion ]
        ==================================================*/
        jQuery('.pq-accordion-block .pq-accordion-box .pq-accordion-details').hide();
        jQuery('.pq-accordion-block .pq-accordion-box:first').addClass('pq-active').children().slideDown('slow');
        jQuery('.pq-accordion-block .pq-accordion-box').on("click", function () {
            if (jQuery(this).children('div.pq-accordion-details').is(':hidden')) {
                jQuery('.pq-accordion-block .pq-accordion-box').removeClass('pq-active').children('div.pq-accordion-details').slideUp('slow');
                jQuery(this).toggleClass('pq-active').children('div.pq-accordion-details').slideDown('slow');
            }
        });


        /*==================================================
        [ Sidebar Toggle ]
        ==================================================*/
        jQuery("#pq-toggle-btn").on('click', function () {
            jQuery('#pq-sidebar-menu-contain').toggleClass("active");
        });

        jQuery('.pq-toggle-btn').click(function () {
            jQuery('body').addClass('pq-siderbar-open');

        });

        jQuery('.pq-close').click(function () {
            jQuery('body').removeClass('pq-siderbar-open');
        });


        /*==================================================
        [ Sticky Header ]
        ==================================================*/
        var view_width = jQuery(window).width();
        if (!jQuery('header').hasClass('pq-header-default') && view_width >= 1023)
        {
            var height = jQuery('header').height();
            jQuery('.pq-breadcrumb').css('padding-top', height * 1.8);
        }
        if (jQuery('header').hasClass('pq-header-default'))
        {
            jQuery(window).scroll(function() {
                var scrollTop = jQuery(window).scrollTop();
                if (scrollTop > 300) {
                    jQuery('.pq-bottom-header').addClass('pq-header-sticky animated fadeInDown animate__faster');
                } else {
                    jQuery('.pq-bottom-header').removeClass('pq-header-sticky animated fadeInDown animate__faster');
                }
            });
        }
        if (jQuery('header').hasClass('pq-has-sticky')) {
            jQuery(window).scroll(function() {
                var scrollTop = jQuery(window).scrollTop();
                if (scrollTop > 300) {
                    jQuery('.pq-bottom-header').addClass('pq-header-sticky animated fadeInDown animate__faster');
                } else {
                    jQuery('.pq-bottom-header').removeClass('pq-header-sticky animated fadeInDown animate__faster');
                }
            });
        }

        /*==================================================
        [ Slick Slider ]
        ==================================================*/

        if (jQuery('.slick-slider-main').length) {
            var $slider = jQuery('.slick-slider-main').slick({
                slidesToShow: 1,
                infinite: false,
                arrows: true,
                autoplay: false,
                dots: false,
                lazyLoad: 'ondemand',
                autoplaySpeed: 3000,
                loop: true,
                asNavFor: '.slick-slider-thumb'
            });
            var $slider2 = jQuery('.slick-slider-thumb').slick({
                slidesToShow: 1,
                infinite: false,
                lazyLoad: 'ondemand',
                asNavFor: '.slick-slider-main',
                autoplay: false,
                dots: false,
                Default: '50px',
                arrows: false,
                centerMode: false,
                loop: true,
                focusOnSelect: true
            });
        }

        if (jQuery('.service-vertical-slider').length) {
            var $slider = jQuery('.service-vertical-slider')
            .slick({
                slidesToShow: 3,
                infinite: true,
                arrows: true,
                autoplay: true,
                draggable: true,
                dots: false,
                vertical: true,
                verticalScrolling: true,
                lazyLoad: 'ondemand',
                autoplaySpeed: 1000,
                focusOnSelect: true,
                loop: true
            });
        }

        /*==================================================
        [ Swiper Slider ]
        ==================================================*/

        if (jQuery('.swiper').length) {
            var swiper = new Swiper(".pq-swiper", {
                effect: "coverflow",
                centeredSlides: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                loop: true,
                slidesPerView: "2",
                coverflowEffect: {
                    rotate: 0,
                    stretch: 30,
                    depth: 100,
                    modifier: 5,
                    slideShadows: true
                },
                navigation: {
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next"
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: false
                }
            });
        }

        /*==================================================
        [ Owl Carousel ]
        ==================================================*/
        jQuery('.owl-carousel').each(function () {
            var app_slider = jQuery(this);
            var rtl = false;
            var prev = 'ion-ios-arrow-back';
            var next = 'ion-ios-arrow-forward';
            var prev_text = 'Prev';
            var next_text = 'Next';
            if (jQuery('body').hasClass('pq-is-rtl')) {
                rtl = true;
                prev = 'ion-ios-arrow-forward';
                next = 'ion-ios-arrow-back';
            }
            if (app_slider.data('prev_text') && app_slider.data('prev_text') != '') {
                prev_text = app_slider.data('prev_text');
            }
            if (app_slider.data('next_text') && app_slider.data('next_text') != '') {
                next_text = app_slider.data('next_text');
            }
            app_slider.owlCarousel({
                rtl: rtl,
                items: app_slider.data("desk_num"),
                loop: app_slider.data("loop"),
                margin: app_slider.data("margin"),
                nav: app_slider.data("nav"),
                dots: app_slider.data("dots"),
                loop: app_slider.data("loop"),
                autoplay: app_slider.data("autoplay"),
                autoplayHoverPause: true,
                autoplayTimeout: app_slider.data("autoplay-timeout"),
                navText: ["<i class='" + prev + "'></i>", "<i class='" + next + "'></i>"],
                responsiveClass: true,
                responsive: {
                    // breakpoint from 0 up
                    0: {
                        items: app_slider.data("mob_sm"),
                        // nav: true,
                        dots: false
                    },
                    // breakpoint from 480 up
                    480: {
                        items: app_slider.data("mob_num"),
                        // nav: true,
                        dots: false
                    },
                    // breakpoint from 786 up
                    786: {
                        items: app_slider.data("tab_num")
                    },
                    // breakpoint from 1023 up
                    1023: {
                        items: app_slider.data("lap_num")
                    },
                    1199: {
                        items: app_slider.data("desk_num")
                    }
                }
            });
        });

        /*==================================================
        [ Image Generator ]
        ==================================================*/
        jQuery("#pq-search-btn").click(function () {
            var keyword = jQuery("#pq-search-txt").val();
            jQuery.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
            {
                tags: keyword,
                format: "json"
            },
            function (data) {
                const rndInt = Math.floor(Math.random() * 20);
                var image_src1 = data.items[rndInt]['media']['m'].replace("_m", "_b");
                var image_src2 = data.items[rndInt + 1]['media']['m'].replace("_m", "_b");
                var image_src3 = data.items[rndInt + 2]['media']['m'].replace("_m", "_b");
                jQuery('.pq-generated-img').html('<div class="row"><div class="col-md-4"><img src=' + image_src1 + ' /></div><div class="col-md-4"><img src=' + image_src2 + ' /></div><div class="col-md-4"><img src=' + image_src3 + ' /></div></div>');
            });
        });

        /*==================================================
        [ Hover Active ]
        ==================================================*/
        jQuery(".pq-service-box.pq-style-2:nth-child(3)").addClass("active");
        jQuery(".pq-service-box.pq-style-2").hover(function () {
            jQuery(".pq-service-box.pq-style-2").removeClass("active");
            jQuery(this).addClass("active");
        });

    });

    /*==================================================
    [ Back To Top ]
    ==================================================*/
    jQuery('#back-to-top').fadeOut();
    jQuery(window).on("scroll", function () {
        if (jQuery(this).scrollTop() > 250) {
            jQuery('#back-to-top').fadeIn(1400);
            jQuery('#back-to-top').addClass("active");
        } else {
            jQuery('#back-to-top').fadeOut(400);
            jQuery('#back-to-top').removeClass("active");
        }
    });
    jQuery('#top').on('click', function () {
        jQuery('top').tooltip('hide');
        jQuery('body,html').animate({
            scrollTop: 0
        }, 100);
        return false;
    });

    /*==================================================
    [ Timeline ]
    ==================================================*/

    jQuery('.cntl').each(function () {
        jQuery(this).cntl({
            revealbefore: 300,
            anim_class: 'cntl-animate',
            onreveal: function (e) {
                console.log(e);
            }

        });
    });

    /*==================================================
    [ counter ]
    ==================================================*/
    jQuery('.timer').countTo();

    /*==================================================
    [ wow ]
    ==================================================*/

    new WOW().init();


    /*==================================================
    [ Magnific Popup ]
    ==================================================*/
    jQuery(document).ready(function () {
        jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        jQuery('.gallery').each(function () { // the containers for all your galleries
            jQuery(this).magnificPopup({
                delegate: 'a', // the selector for gallery item
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
        });
    });

})(jQuery);