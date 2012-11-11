$(function() {
	//JS Code Secific to Home Page Goes Here
	
	//$('div#banner .slides').jcarousel();

    $('#banner .slides').cycle({
		slideExpr: ' .slide',
		cleartypeNoBg: ' true' ,
		fx: 'scrollHorz',
		next: '#banner .next-btn',
   	    prev: '#banner .previous-btn',
		timeout: 0,
		pager: '.controls',
		pagerAnchorBuilder: function(idx, slide) {
            var myClass = (idx==0) ? ' class="active"' : '';
            return '<a href="#" '+myClass+'></a>';
        }
    });

    $('.tabs').tabs();
    $('#scrollable').scrollable()
});
