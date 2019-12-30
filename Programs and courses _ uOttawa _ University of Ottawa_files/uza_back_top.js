(function ($) {

  $(document).ready(function() {
    if ( $('#main-content').height() < 1200 ) {
      $('.uoe--back-top').addClass('uojs--hidden');
    }
    
  });  
  
  $(document).ajaxStop(function() {
    if ( $('#main-content').height() < 1200 ) {
      $('.uoe--back-top').addClass('uojs--hidden');
    }
    else {
      $('.uoe--back-top').removeClass('uojs--hidden');
    }
  });

})(jQuery);



