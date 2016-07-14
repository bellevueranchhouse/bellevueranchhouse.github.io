$('[data-toggle="tooltip"]').tooltip();
$('[data-toggle="popover"]').popover();
function showHeight() {
  var $height = $(window ).height() / 3.2;
  $('.wrapper-hero .centralise').css('margin-top', $height);
}

$( window ).resize(function(){
  showHeight();
});

$(document).ready(function(){
  /* Bootstrap UI Elements*/
  showHeight();
  /* Parallax Backgrounds */
  $('.wrapper[data-type="background"]').each(function(){
    var $bgobj = $(this); // assigning the object
    $(window).scroll(function() {
      var yPos = -($(window).scrollTop() / $bgobj.data('speed')); 
      var coords = '100%' + yPos + 'px';
      // Move the background
      $bgobj.css({ backgroundPosition: coords });
    });
  });
});

$(function() {
  //caches a jQuery object containing the header element
  var header = $(".navbar");
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 100) {
      header.addClass("scroll");
    } else {
      header.removeClass("scroll");
    }
  });
});