(function($) {
    $.fn.serializeObject = function () {
        var arr = this.serializeArray(),
            o = {};

        $.each(arr, function () {
            var value = this.value != null ? this.value : '';

            if (o[this.name] != null) {
                if (!o[this.name].push)
                    o[this.name] = [o[this.name]];
                o[this.name].push(value);
            } else {
                o[this.name] = value;
            }
        });

        return o;
    };
})(jQuery);