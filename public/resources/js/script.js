$(function(){
    $('nav#main-navigation ul a[href="' + decodeURI(location.pathname) + '"]').parent('li').addClass('active');
});