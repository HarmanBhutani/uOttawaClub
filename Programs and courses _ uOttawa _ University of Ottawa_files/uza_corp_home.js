(function($) {
	$(document).ready(function(){

    window.activeDetails = null;

    function openDetails(details) {
      //Close all details elements.
      if (window.activeDetails !== null) {
        $(window.activeDetails).removeAttr('open').removeClass('uojs--details--is-open');
      }
      window.activeDetails = details;
      //Open selected details element.
     //details.attr('open','open').addClass('uojs--details--is-open');
      
      //Animate the dropdown.
//      setTimeout(function() {
//        detailsContentHeight = details.children('.collapsible-content').outerHeight();
//        details.children('.collapsible-content').css('height',0).animate({height: detailsContentHeight}, 500);
//        setTimeout(function(){ 
//          details.children('.collapsible-content').removeAttr('style');
//        }, 750);
//      }, 1);
        
    }

    function closeDetails(details) {
      window.activeDetails = null;
      //details.removeAttr('open').removeClass('uojs--details--is-open');
    }

    function hoverOpenDetails() {
      
      var summary = $(this);
      var details = summary.parent('details');
      
      if (details.hasClass('uojs--stop-hover')) {
        details.removeClass('uojs--stop-hover');
      } else {
        $('details').removeClass('uojs--stop-hover');
        openDetails(details);
        details.attr('open','open').addClass('uojs--details--is-open');
      }
      
    }

    function doNothing() {
      //Does nothing!
    }

    function checkEverything() {

      $('main').removeAttr('style');        

      var scrollVisible = false;

      if ($(document).height() > $(window).height()) {
        scrollVisible = true;
      }

      if ( ($('body').width() > 720 && scrollVisible) || ($('body').width() > 735 && !scrollVisible) ) {
        gHeader = $('#global-header-wrapper').height();
        gNav = $('#global-navigation-wrapper').height();
        mainTop = ($(window).height() / 2) - gHeader - gNav - 10;
        $('main').css('padding-top', mainTop);

      }

      if ( ($('body').width() > 980 && scrollVisible) || ($('body').width() > 995 && !scrollVisible) ) {
        maxSummary = 0;

        $('summary').children('h2').css('height', '');

        $('summary').each(function() {
          if ($(this).children('h2').outerHeight() > maxSummary) {
            maxSummary = $(this).children('h2').outerHeight();
          } 
        });

        $('summary').children('h2').css('height', maxSummary);

        $('.cs-parent-wrapper').css('width','50%').css('float','left');

      } else {
        $('summary').children('h2').css('height', '');
        $('.cs-parent-wrapper').css('width','').css('float','none');
      }
    }
    
    //Open the meganav by default on responsive
    if ($('body').hasClass('uocorp-home')) {     

      //$('#uottawa-mobile-nav-toggle').removeClass('uojs--hidden-nav');
      //$('#global-navigation').removeClass('uojs--hidden-nav');

      $('.panel-separator').css('width', '0');
      $('.cs-parent-wrapper').parent('div').find('.collapsible-content').last().addClass('uojs--is-last');
      
      checkEverything();
      setTimeout(function () {checkEverything();}, 500);

      $( window ).resize(function() {
        checkEverything();
      });

      $('summary').hoverIntent({    
        sensitivity: 3, // number = sensitivity threshold (must be 1 or higher)    
        interval: 300,  // number = milliseconds for onMouseOver polling interval    
        over: hoverOpenDetails,
        out: doNothing,   
        timeout: 100 
      });
      
      $('summary').on('vclick touchend', function() {
        var summary = $(this);
        var details = summary.parent('details');
        
        if (isDetailsSupported) {
          if ($(details).attr('open') === 'open') {
            closeDetails(details);
            details.addClass('uojs--stop-hover');
          } else {
            openDetails(details);
          }
        } else {
          if (!details.hasClass('uojs--details--is-open')) {       
            closeDetails(details);
            details.addClass('uojs--stop-hover');
          } else {
            openDetails(details);
          }
        }

      });
    
    }

	});
})( jQuery );