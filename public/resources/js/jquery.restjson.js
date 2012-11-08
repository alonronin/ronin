(function($) {
    // for JSON.stringify suuport for old browser use:
    // https://github.com/douglascrockford/JSON-js

    $.each( [ "post", "put", "delete" ], function( i, method ) {
        $[ method + 'JSON' ] = function( url, data, callback ) {
            if ( $.isFunction( data ) ) {
                callback = data;
                data = {};
            }

            return $.ajax({
                type: method,
                url: url,
                data: JSON.stringify(data),
                success: callback,
                dataType: 'json',
                processData: false,
                contentType: "application/json"
            });
        };
    });
})(jQuery);