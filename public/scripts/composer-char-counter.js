$(document).ready(function() {
 
  $('.tweet-input').keyup(function() {
    $('.counter').text(140 - $(this).val().length);
    $(this).val().length > 140 ? $('.counter').addClass('negative') : $('.counter').removeClass('negative');
  });

});