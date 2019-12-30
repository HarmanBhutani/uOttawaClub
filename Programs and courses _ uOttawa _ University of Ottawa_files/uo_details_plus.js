
(function($) {
  
  $(document).ready(function() {
    $('details').each(function() {
      new UOJS_DETAILS_PLUS($(this));
    });
  });
  
  $(document).ajaxComplete(function() {
    $('details').each(function() {
      if ( !$(this).hasClass('uojs--enabled') ) {
        new UOJS_DETAILS_PLUS($(this));
      }
    });
  });
  
  function UOJS_DETAILS_PLUS(container) {
    this.language = $('html').attr('lang');
    this.toggleText = {
      close: {
        en: 'Close',
        fr: 'Fermer'
      }
    };
    this.container = container;
    
    // Add flag indicating that this was initialized
    this.container.addClass('uojs--enabled');
    
    var button  =document.createElement('span');
    $(button).addClass('uol--dir--rtl');
    $(button).css('cursor','pointer');
    button.innerHTML = this.toggleText.close[this.language];
    
    var wrapper = document.createElement('div');
    $(wrapper).addClass('uol--clearfix');
    $(wrapper).append(button);
    
    var isContainer = false;
    this.container.children().each(function() {
      if ($(this).hasClass('collapsible-content')) {
        isContainer = true;
      }
    });
    
    if (isContainer) {
      this.container.children('.collapsible-content').append(wrapper);
    } else {
      this.container.append(wrapper).append('<hr>');
    }
    
    $(button).on('click', function() {
      this.toggle();
    }.bind(this));
  }
  
  UOJS_DETAILS_PLUS.prototype.toggle = function() {
    if (this.container.attr('open')) {
      this.container.removeAttr('open');
      
      if (!isDetailsSupported) {
        this.container.removeClass('uojs--details--is-open');
      }
    } else {
      this.container.attr('open', 'open');
      
      if (!isDetailsSupported) {
        this.container.addClass('uojs--details--is-open');
      }
    }
    equalizeHeights(this.container);
  };

  function equalizeHeights(ele) {
    if ($.fn.UOCalculateHeightAllWrapper) {
      $.fn.UOCalculateHeightAllWrapper(ele);
    }
  }

})(jQuery);
