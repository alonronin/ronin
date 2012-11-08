$(function(){
    $('.contact-form form').on('submit', function(e){
        var self = this;

        e.preventDefault();

        var o = $(this).serializeObject();

        $.postJSON('/thank-you', o).done(function(o){
            $(self).replaceWith($('<div></div>').addClass((o.success ? null : 'fail')).text(o.message));
        })

    })
});