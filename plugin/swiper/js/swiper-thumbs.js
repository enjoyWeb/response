(function($) {
    $.fn.swiperThumbs = function(options) {
        var opts = $.extend({}, $.fn.swiperThumbs.defaults, options);
        return this.each(function() {
            var $this = $(this),
                $swiperContent = $($this.find('.swiper-content')),
                $swiperNav = $($this.find('.swiper-nav')),
                $swiperLeft = $($this.find('.arrow-left')),
                $swiperRight = $($this.find('.arrow-right')),
                o = $.meta ? $.extend({}, opts, $this.data()) : opts,
                dir = o.direction,
                h = o.height,
                slides = o.navSlidesPerView,
                w;
            //if(o.direction == 'vertical') $this.addClass('dirVertical');
            if(dir == 'vertical') {
                w = $swiperContent.width() - $swiperNav.width();
                slides = 'auto';
            }
            //console.log(dir);
            var contentSwiper = $swiperContent.swiper({
                onSlideChangeStart: function() {
                    $.fn.swiperThumbs.updateNavPosition($swiperContent,$swiperNav,contentSwiper,navSwiper,dir);
                },
                onInit: function(swiper) {
                    swiper.swipeNext($swiperContent,$swiperNav,contentSwiper,navSwiper);
                }
            });
            var navSwiper = $swiperNav.swiper({
                visibilityFullFit: true,
                slidesPerView: slides,
                mode: dir,
                onSlideClick: function() {
                    contentSwiper.swipeTo(navSwiper.clickedSlideIndex);
                }
            });
            $.fn.swiperThumbs.setContentSize($this,$swiperNav,w,h);
            $swiperLeft.click(function() {
                contentSwiper.swipePrev();
                $.fn.swiperThumbs.updateNavPosition($swiperContent,$swiperNav,contentSwiper,navSwiper,dir);
            });
            $swiperRight.click(function() {
                contentSwiper.swipeNext();
                $.fn.swiperThumbs.updateNavPosition($swiperContent,$swiperNav,contentSwiper,navSwiper,dir);
            });
            $(window).resize(function() {
                $.fn.swiperThumbs.setContentSize($this,$swiperNav,w,h);
            });
        });
    };
    $.fn.swiperThumbs.updateNavPosition = function(c,n,cs,ns,dir) {
        var allActiveNav = n.find('.active-nav'),
            allSlide = n.find('.swiper-slide'),
            activeNav = $(allSlide).eq(cs.activeIndex);
        $(allActiveNav).removeClass('active-nav');
        $(activeNav).addClass('active-nav');
        if (!activeNav.hasClass('swiper-slide-visible')) {
            if (activeNav.index() > ns.activeIndex) {
                var thumbsPerNav = Math.floor(ns.width / activeNav.width()) - 1;
                ns.swipeTo(activeNav.index() - thumbsPerNav);
            } else {
                ns.swipeTo(activeNav.index());
            };
        };
    };
    $.fn.swiperThumbs.setContentSize = function(c,n,w,h) {
        c.css({ height: h});
    };
    $.fn.swiperThumbs.defaults = {
        direction: 'horizontal',
        navSlidesPerView: 'auto'
    };
})(jQuery);
