(function($) {
  $(document).ready(function() {   
    
    $('#site-nav').removeClass('uojs--no-js');
    
    $('#site-nav > ul.menu > li.expanded').each(function() {

      var leftOffset = $(this).offset().left - $(this).parent('ul.menu').offset().left;
      
      if (leftOffset > ($('#site-nav').width()/2)) {
        $(this).addClass('uojs--open-left');
      }
      
    });

    $('#site-nav ul.menu li.expanded').hoverIntent({
      
      over: function() { 
        $(this).addClass('uojs--active');
      },
      out: function() {  
        $(this).removeClass('uojs--active');
      },
      timeout: 100
      
    });
    
    $('body').on('vclick', function(event) {    
      
      target = $(jQuery.makeArray(event.target));
            
      if (target.parents().is('#site-nav')) {
        //Clicked on the site-nav region
        if (target.hasClass('menu')) {
          //Clicked on an empty part of the site-nav region, we now close all
          //open site-nav dropdowns
          $('#site-nav ul.menu li.expanded').removeClass('uojs--active');
        } else {
          //Clicked on a site-nav item, we must now determine if this is a
          //expanded(dropdown) or regular item
          if (target.parent().hasClass('expanded')) {
            //This is an expanded(dropdown) item, we now check to see if it is
            //active
            if (!target.parent().hasClass('uojs--active')) {
              //The item is not active, we prevent the click default
              event.preventDefault();
              //We then close all dropdowns and reopen only the parent item
              //dropdowns
              $('#site-nav ul.menu li.expanded').removeClass('uojs--active');
              target.parents('li.expanded').addClass('uojs--active');
            } else {
              //The item is active, we allow the click event to navigate the
              //user to the selected page
            }
          } else {
            //This is a regular item, we allow the click event to navigate the
            //user to the selected page
          }
        }
      } else {
        //Did not click on the site-nav region, we now close all open site-nav
        //dropdowns
        $('#site-nav ul.menu li.expanded').removeClass('uojs--active');
      }

    });
    
  });
})(jQuery);