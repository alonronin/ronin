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
    $('a[href="/#contact"]').click(function(e) {
        e.preventDefault();
        $.scrll('.contact-form', function() {
            $('.contact-form').glow();
        });
    });

    $('.contact-form form').on('submit', function(e) {
        e.preventDefault();

        var self = this;
        var o = $(self).serializeObject(),
            post = false;

        $(self).find(':input').prop({disabled: true});
        $(self).find('span.sent-btn').remove();

        $.postJSON('/thank-you', o).done(function(o){
            $(self).replaceWith($('<div />').addClass((o.success ? null : 'fail')).text(o.message));
        });
    })
});