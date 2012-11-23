var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36541417-1']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

$.fn.glow = function() {
    this.addClass('glow')
        .delay(1500)
        .queue(function(n) {
            $(this).removeClass('glow');
            n();
        });
};

$(function() {
    $("input[type=text], textarea").placeholder();

    $('.contact-form').addClass('glowable');
    $('a[href="#contact"]').click(function(e) {
        e.preventDefault();
        $.scrll('.contact-form', function() {
            $('.contact-form').glow();
        });
    });

    $('.contact-form form').on('submit', function(e) {
        e.preventDefault();

        var self = this;
        $(self).find(':submit').prop({disabled: true});

        var o = $(self).serializeObject(),
            post = false;

        $.postJSON('/thank-you', o).done(function(o){
            $(self).replaceWith($('<div />').addClass((o.success ? null : 'fail')).text(o.message));
        });
    })
});