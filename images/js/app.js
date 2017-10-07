// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license

;(function() {
    var lastTime = 0,
        vendors = ['ms', 'moz', 'webkit', 'o'],
        x;
    for(x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
            || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {

        window.requestAnimationFrame = function (callback) {
            var currTime   = new Date().getTime(),
                timeToCall = Math.max(0, 16 - (currTime - lastTime))
                , id       = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {

        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
}());

/**
 * Возвращает функцию, которая не будет срабатывать, пока продолжает вызываться.
 * Она сработает только один раз через N миллисекунд после последнего вызова.
 * Если ей передан аргумент `immediate`, то она будет вызвана один раз сразу после
 * первого запуска.
 */
function debounce(func, wait, immediate) {

    var timeout;

    return function() {
        var context = this,
            args = arguments,
            later = function() {

                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            },
            callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) { func.apply(context, args); }
    };
}

// Test via a getter in the options object to see if the passive property is accessed
var supportsPassive = false,
    supportsPassiveOpts;

try {
    supportsPassiveOpts = Object.defineProperty({}, 'passive', {
        get: function() {
            supportsPassive = true;
        }
    });
    window.addEventListener('est', null, supportsPassiveOpts);
} catch (e) {}

// Use our detect's results. passive applied if supported, capture will be false either way.
//elem.addEventListener('touchstart', fn, supportsPassive ? { passive: true } : false);

$(function() {

    'use strict';

    /**
     * определение существования элемента на странице
     */
    $.exists = function(selector) {
        return ($(selector).length > 0);
    };

    $(window).on('load', function() {
        setTimeout(function() {            
            $('.no-scroll').removeClass('no-scroll')
            $('.preloader').addClass('preloader--hide');
        }, 2000);
    });

    'use strict';

    

    // Возвращает функцию, которая не будет срабатывать, пока продолжает вызываться.

    // Она сработает только один раз через N миллисекунд после последнего вызова.

    // Если ей передан аргумент `immediate`, то она будет вызвана один раз сразу после

    // первого запуска.

    function debounce(func, wait, immediate) {

    

        var timeout;

    

        return function() {

            var context = this, args = arguments;

            var later = function() {

                timeout = null;

                if (!immediate) func.apply(context, args);

            };

    

            var callNow = immediate && !timeout;

    

            clearTimeout(timeout);

            timeout = setTimeout(later, wait);

    

            if (callNow) func.apply(context, args);

        };

    };

    

    /**

     * определение версии IE 10 или 11

     *

     * @returns {Number} 10, 11, или 0 если это не IE

     */

    function GetIEVersion() {

    	var sAgent = window.navigator.userAgent;

    	var Idx = sAgent.indexOf("MSIE");

    

    	// If IE, return version number.

    	if (Idx > 0)

    		return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

    

    	// If IE 11 then look for Updated user agent string.

    	else if (!!navigator.userAgent.match(/Trident\/7\./)) {

    		return 11;

    	}

    

    	else {

    		return 0; //It is not IE

    	}

    }

    

    

    $(document).ready(function() {

    

    	var IsMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    

    	/*!

    	 * Headroom .mobile-header

    	 */

    	var mobileHeader = document.querySelector('.mobile-header');

    	var headroom  = new Headroom(mobileHeader, {

    		offset : 30,

    		onUnpin : function() {

    			close_toolbar_button_dropdowns()

    		}

    	});

    	headroom.init();

    

    	// внутренние классы

    	var mobile_classes = {

    		opened : 'is-opened',

    		closed : 'is-closed'

    	};

    

    	var target_toolbar_buttons = $('.me-cart-trigger, .me-search-trigger, .me-user-trigger, .me-contacts-trigger');

    

    	// выпадалки

    	var toolbar_button_dropdowns = $('.toolbar-button-dropdown');

    

    	/**

    	 * закрываем все выпадалки

    	 */

    	function close_toolbar_button_dropdowns() {

    		toolbar_button_dropdowns

    			.removeClass(mobile_classes.opened);

    		target_toolbar_buttons

    			.removeClass(mobile_classes.opened);

    	}

    

    	/**

    	 * предотвращаем всплытие кликов на документе от .toolbar-button-dropdown

    	 */

    

    	toolbar_button_dropdowns.on('click', function(event) {

    		event.stopPropagation();

    	});

    

    

    	/**

    	 * кнопки у которых есть выпадалки

    	 */

    	target_toolbar_buttons.on('click', function(event) {

    

    		event.stopPropagation();

    		event.preventDefault();

    

    		var $self = $(this);

    

    		if ($self.hasClass(mobile_classes.opened)) {

    

    			$self.removeClass(mobile_classes.opened);

    			close_toolbar_button_dropdowns();

    

    		} else {

    

    			close_toolbar_button_dropdowns();

    

    			if ($self.hasClass('me-search-trigger')) {

    				$('.mobile-search-form__input').focus();

    			}

    

    			$self.addClass(mobile_classes.opened);

    

    		}

    	});

    

    	/**

    	 * нажатие на ESC

    	 */

    	$(document).on('keydown', function(event) {

    

    		if (event.keyCode === 27) {

    			close_toolbar_button_dropdowns();

    		}

    

    	});

    

    	/*!

    	 * клик по документу

    	 */

    	$(document).on('click', function(event) {

    

    		close_toolbar_button_dropdowns();

    	});

    

    	/*!

    	 * Боковое меню

    	 */

    	var hamburger         = $('.me-nav-trigger');

    	var asideNav          = $('.aside-nav-mobile');

    	var asideNavContent   = $('.aside-nav-mobile__content');

    	var asideNavOverlay   = $('<div class="aside-nav-mobile__overlay"></div>');

    	var svgArr            = '<span class="title-ico"><svg fill="#fff" height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg"		                             ><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/><path d="M0-.75h24v24H0z" fill                                ="none"/></svg><span>';

    

    	$('.aside-nav-mobile__scroller').on('click', function(event) {

    		event.stopPropagation();

    	});

    

    	var asideBlock = function(class_name, title) {

    		var title = typeof title == 'undefined' ? '' : '<div class="aside-nav-mobile-item__title">' + title + ' '+ svgArr +'</div>';

    		var block = $('<div class="aside-nav-mobile-item aside-nav-mobile__cats ' + class_name + '">' + title + '</div>');

    		return block;

    	};

    

    	var asideList = function($list) {

    

    		var style = '';

    

    		if ($list.find('.active').length) {

    			style = 'style="display:block;"';

    		}

    

    		return $('<div class="aside-nav-mobile-item__list" ' + style + '/>')

    					.append($list.clone());

    	};

    

    	// Меню

    

    	var mainMenuBlock = new asideBlock('app-nav');

    	var asideMainMenu = new asideList($('.aside-nav__menu'));

    	mainMenuBlock.append(asideMainMenu);

    	asideNavContent.append(mainMenuBlock);

    	asideNav.append(asideNavOverlay);

    	$('.app-nav .aside-nav__menu').removeClass('aside-nav__menu')

    

    	function showAsideMenu() {

    

    	    var self = hamburger;

    

    	    if (self.hasClass('opened')) {

    	        self.removeClass('opened');

    	        asideNav.removeClass('animated');

    	        setTimeout(function() {

    	            asideNav.removeClass('opened');

    	        }, 200);

    

    	    } else {

    	        self.addClass('opened');

    	        asideNav.addClass('opened');

    	        asideNav.addClass('animated');

    

    	        $(document.body).trigger("sticky_kit:recalc");

    	    }

    

    	}

    

    	asideNav.on('click', function() {

    	    showAsideMenu();

    	});

    

    	hamburger.on('click', function() {

    	    showAsideMenu();

    	});

    

    	$('.aside-nav-mobile-item__title').on('click', function() {

    		$(this).toggleClass('clicked');

    		$(this).closest('.aside-nav-mobile-item').find('.aside-nav-mobile-item__list').slideToggle(500, function() {

    			$(document.body).trigger("sticky_kit:recalc");

    		});

    	});

    

    	$('.app-nav .has-child > a').each(function(index, el) {

    		$(el).append('<span class="toggled-elem"><svg fill="#fff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"></path><path d="M0-.75h24v24H0z" fill="none"></path></svg></span>')

    	});

    

    	/*

    	 * раскрывающееся боковое меню

    	 */

    	$('.aside-nav-mobile .toggled-elem').click(function(event) {

    

    		var $self = $(this);

    

    		if ($self.closest('li').hasClass('has-child')) {

    

    			event.preventDefault();

    			event.stopPropagation();

    

    			$self.closest('li').toggleClass('opened');

    		}

    

    	});

    });

    
    $('.has-child').hover(function() {

    		$(this).addClass('hovered');

    		var topPos = $(this).position().top + 17;

    

    		$(this).find('.menu-popup__inner').css({

    			transform: 'translate3d(0px,' + topPos + 'px,0px)'

    		});

    }, function() {

    	

    });

    
    $('.main-contacts .owl-carousel').owlCarousel({

    	items:1,

    	nav:true,

    	loop:true,

    	onInitialized: function(event) {

    		$(event.target).find('.owl-nav div').append('<div class="svg-icon svg-icon_search-arr-slider"><svg class="svg-icon__link"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arr-slider"></use></svg></div>');

    	},

    	smartSpeed:2000,

    	animateIn: "fadeIn",

    	animateOut: "fadeOut",

    	autoplay:true,

    	autoplayTimeout:7000,

    	dotsContainer:'.main-contacts .custom-dots',

    	navContainerClass:'owl-nav nav-custom'

    });

    
    var optionsTabCarousel = {

    	items:1,

    	onInitialized: function(event){

    

    		$(event.target).find('.main-slider-list__thumbs-item-elem').append('<div class="main-slider-list__thumbs-item-extra nav-wrapper"><div class="nav-custom"><div class="owl-prev"><div class="svg-icon svg-icon_search-arr-slider"><svg class="svg-icon__link"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arr-slider"></use></svg></div></div><div class="owl-next"><div class="svg-icon svg-icon_search-arr-slider"><svg class="svg-icon__link"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arr-slider"></use></svg></div></div></div></div>');

    

    		$('.main-slider-list .nav-custom .owl-prev').on('click', function() {

    			$(event.target).trigger('prev.owl.carousel');

    		});

    

    		$('.main-slider-list .nav-custom .owl-next').on('click', function() {

    			$(event.target).trigger('next.owl.carousel');

    		});

    

    		$('.main-slider-list .nav-custom .owl-next').trigger('next.owl.carousel');

    

    	}

    }

    

    $('.main-slider-list__thumbs-item:first-child .owl-carousel').owlCarousel(optionsTabCarousel);

    

    $('.main-slider-list a[role="tab"]').on('shown.bs.tab', function () {

    

    	var thisText = $(this).text();

    

    	$('.main-slider-list__title').text(thisText);

    	

    	$('.tab-pane.active .owl-carousel').owlCarousel(optionsTabCarousel);

    

    

    }).on('hidden.bs.tab', function () {

    

    	$('.tab-pane:not(.active) .owl-carousel').trigger('destroy.owl.carousel');

    

    	$('.tab-pane:not(.active) .owl-carousel').find('.nav-wrapper').remove();

    });

    
    $('.main-slider .owl-carousel').owlCarousel({

    	items:1,

    	nav:true,

    	loop:true,

    	mouseDrag:false,

    	onInitialized: function(event) {

    		$(event.target).find('.owl-nav div').append('<div class="svg-icon svg-icon_search-arr-slider"><svg class="svg-icon__link"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arr-slider"></use></svg></div>');

    	},

    	smartSpeed:2000,

    	animateIn: "bounceInLeft",

    	animateOut: "bounceOutRight",

    	autoplay:false,

    	autoplayTimeout:7000,

    	dotsContainer:'.main-slider .custom-dots',

    	navContainerClass:'owl-nav nav-custom'

    });

    
    

    
    ;(function($) {

    

        'use strict';

    

        var page          = $('html, body'),

            pageScroller  = $('.m-page-scroller'),

            pageYOffset   = 0,

            inMemory      = false,

            inMemoryClass = 'is-memorized',

            enabledOffset = 60;

    

        function resetPageScroller() {

    

            setTimeout(function() {

    

                if (window.pageYOffset > enabledOffset) {

                    pageScroller.addClass('is-visible');

                } else if (!pageScroller.hasClass(inMemoryClass)) {

                    pageScroller.removeClass('is-visible');

                }

    

            }, 150);

    

            if (!inMemory) {

    

                pageYOffset = 0;

                pageScroller.removeClass(inMemoryClass);

            }

    

            inMemory = false;

        }

    

        if (pageScroller.length > 0) {

    

            window.addEventListener('scroll', resetPageScroller, false);

    

            pageScroller.on('click', function(event) {

    

                event.preventDefault();

    

                window.removeEventListener('scroll', resetPageScroller);

    

                if (window.pageYOffset > 0 && pageYOffset === 0) {

    

                    inMemory = true;

                    pageYOffset = window.pageYOffset;

    

                    pageScroller.addClass(inMemoryClass);

    

                    page.stop().animate({ scrollTop : 0 }, 500, 'swing', function() {

                        window.addEventListener('scroll', resetPageScroller, false);

                    });

    

                } else {

    

                    pageScroller.removeClass(inMemoryClass);

    

                    page.stop().animate({ scrollTop : pageYOffset }, 500, 'swing', function() {

    

                        pageYOffset = 0;

                        window.addEventListener('scroll', resetPageScroller, false);

                    });

    

                }

            });

        }

    

    })(jQuery);

    

    
});
