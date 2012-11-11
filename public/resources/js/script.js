$(function(){
    $( "input[type=text], textarea" ).placeholder();

    $('.contact-form form').on('submit', function(e){
        var self = this;
        $(self).find(':submit').prop({disabled: true});

        e.preventDefault();

        var o = $(self).serializeObject(),
            post = false;

        $.postJSON('/thank-you', o).done(function(o){
            $(self).replaceWith($('<div></div>').addClass((o.success ? null : 'fail')).text(o.message));
        });
    })
});