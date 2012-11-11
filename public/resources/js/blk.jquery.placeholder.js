/*!
 * jQuery placeholder polyfill
 *
 * @author: Brandon Lee Kitajchuk
 * http://blkcreative.com
 *
 * Tested in IE6-9, Firefox, Safari, Chrome and Opera
 *
 * callback:	function () {},
 * polyClass:	"placeholder",
 * wrapClass:	"placeholder-wrap",
 * tagName:		"span"
 *
 */
(function ( $ ) {

var inp = document.createElement( "input" );

$.support.placeholder = "placeholder" in inp;

inp = null;

$.fn.extend({
	placeholder: function () {
		if ( $.support.placeholder ) {
			return false;
		}
		
		var settings = {
				callback:	function () {},
				polyClass:	"placeholder",
				wrapClass:	"placeholder-wrap",
				tagName:	"span"
			};
		
		if ( typeof arguments[0] === "function" ) {
			settings.callback = arguments[0];
		
		} else {
			$.extend( settings, arguments[0] );
		}
		
		return this.filter( "[placeholder]" ).each(function ( i ) {
			var $input = $( this ),
				$placeholder = $( "<" +  settings.tagName + " />", {
					"class":	settings.polyClass,
					id:			"ph-" + ( i + 1 ),
					text:		$input.attr( "placeholder" )
				}),
				$wrapper = $( "<" +  settings.tagName + " />", {
					"class":	settings.wrapClass
				});
			
			$input.wrap( $wrapper ).focus(function ( event ) {
				$placeholder.text( "" );
				
				settings.callback.apply( this, arguments );
				
			}).blur(function () {
				if ( this.value !== "" ) {
					$placeholder.text( "" );
					
				} else {
					$placeholder.text( $( this ).attr( "placeholder" ) );
				}
			});
			
			$placeholder.insertAfter( $input ).click(function ( event ) {
				$placeholder.text( "" );
				$input.focus();
			});
		});
	}
});

})( jQuery );
