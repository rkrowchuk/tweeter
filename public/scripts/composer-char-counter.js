$(document).ready(function() {
 
  $('.tweet-input').keyup(function() {
    $('.counter').text(140 - $(this).val().length);
    if ($(this).val().length > 140) {
      $('.counter').addClass('negative');
    }
    if ($(this).val().length < 140) {
      $('.counter').removeClass('negative');
    }
  });

});