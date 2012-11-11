/*
    scrll -- animated scroll to an element
    version 0.3, by etai@empeeric.com

    like scrollTo, but smaller.

    usage example:
        $.scrll('#about', 500, callback);
 */

(function($) {
    $.scrll = function(selector, speed, cb) {
        if (!cb && $.isFunction(speed)) {
            cb = speed;
            speed = $.scrll.speed;
        }

        $('html, body').animate({
            scrollTop: $(selector).offset().top
        }, speed, cb);
    };

    $.scrll.speed = 1000;
})(jQuery);