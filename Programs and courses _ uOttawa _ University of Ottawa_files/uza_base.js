
(function ($) {
  
  $(document).ready(function() {
    // Detect if touch screen. If so, we don't remove default focus in CSS.
    var isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;
    if (!isTouchDevice) {
      $('body').addClass('not-touch-screen');
    }
    // When a user tabs through the page, add a class to outline the currently
    // focused element.
    $('body').on('keyup', function(e) {
      if (e.which == 9) {
        $(':focus').addClass('uos--tab-focus-outline');
      }
    });
    // If the user tabs or clicks away, remove the tab focus class from the last
    // focused element.
    $(document).on('focusout', '*', function() {
      $(this).removeClass('uos--tab-focus-outline');
    });
  });

  $(window).load(function() {
    paddingBottom = $('#global-footer-wrapper').outerHeight() + $('#contact-footer-wrapper').outerHeight();
    $('#main-content-wrapper').css('padding-bottom', paddingBottom);
    $('#global-footer-wrapper').css('position', 'absolute').css('bottom', '0');
    $('#contact-footer-wrapper').css('position', 'absolute').css('bottom', $('#global-footer-wrapper').outerHeight());
  });
  
  
  $(window).resize(function() {
    paddingBottom = $('#global-footer-wrapper').outerHeight() + $('#contact-footer-wrapper').outerHeight();
    $('#main-content-wrapper').css('padding-bottom', paddingBottom);
    $('#contact-footer-wrapper').css('bottom', $('#global-footer-wrapper').outerHeight());
  });    

  /**
   * Hacked handler for the form redirection error.
   * 
   * This prevents the alert message from being displayed
   * 
   * @see misc/ajax.js
   */
  $(window).load(function() {
    
    if (Drupal.ajax !== undefined) {
    
      Drupal.ajax.prototype.error = function (response, uri) {
        // removed alert message
        // alert(Drupal.ajaxError(response, uri));
        // new error handling routines, see #729
        var message = Drupal.ajaxError(response, uri);
        //window.console && window.console.log(message);
        if (Drupal.settings.uza.ajax_errors === 1) {
          $("#drupal-status").html('<div class="messages error">' + message + '</div>');
        }
        // the rest of this is a copy/pasta
        // Remove the progress element.
        if (this.progress.element) {
          $(this.progress.element).remove();
        }
        if (this.progress.object) {
          this.progress.object.stopMonitoring();
        }
        // Undo hide.
        $(this.wrapper).show();
        // Re-enable the element.
        $(this.element).removeClass('progress-disabled').removeAttr('disabled');
        // Reattach behaviors, if they were detached in beforeSerialize().
        if (this.form) {
          var settings = response.settings || this.settings || Drupal.settings;
          Drupal.attachBehaviors(this.form, settings);
        }
      };
      
    }
    
  });

  
})(jQuery);