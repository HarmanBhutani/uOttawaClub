
var isDetailsSupported = (function(doc) {
  var el = doc.createElement('details'),
      fake,
      root,
      diff;
  if (!('open' in el)) {
    return false;
  }
  root = doc.body || (function() {
    var de = doc.documentElement;
    fake = true;
    return de.insertBefore(doc.createElement('body'), de.firstElementChild || de.firstChild);
  }());
  el.innerHTML = '<summary>a</summary>b';
  el.style.display = 'block';
  root.appendChild(el);
  diff = el.offsetHeight;
  el.open = true;
  diff = diff != el.offsetHeight;
  root.removeChild(el);
  if (fake) {
    root.parentNode.removeChild(root);
  }
  return diff;
}(document));

(function ($) {

  $(document).ready(function() {
    
    $(window).on('hashchange', function() {
      var hash = location.hash.replace('#', ''); 
    
      if ( $('#' + hash).prop("tagName") === 'DETAILS' ) {
        detailsTrigger($('#' + hash),'open');
      } else {
        detailsTrigger($('#' + hash).parents('details'),'open');
      }
      
      //Timeout to make sure page is set to proper location
      setTimeout(function() {
        if (hash !== '') {
          location.hash = "#" + hash;
        }
      },'100');
    });
    
    var hash = location.hash.replace('#', ''); 
    
    if ( $('#' + hash).prop("tagName") === 'DETAILS' ) {
      detailsTrigger($('#' + hash),'open');
    } else {
      detailsTrigger($('#' + hash).parents('details'),'open');
    }

    //Timeout to make sure page is set to proper location
    setTimeout(function() {
      if (hash !== '') {
        location.hash = "#" + hash;
      }
    },'100');
    
    if (!isDetailsSupported) {
      document.documentElement.className += ' uojs--no-details';

      equalizeHeights();

      $('summary').attr('tabindex', '0');
      
      $('body').on('keypress','summary',function (event) {
        summary = $(this);
        details = summary.parent();
        
        if (event.which == 13 || event.which == 32) {
          detailsTrigger(details,'toggle');
        }
      });
      
      $('body').on('click','summary',function (){
        summary = $(this);
        details = summary.parent();

        detailsTrigger(details,'toggle');
      });
      
    }

    function detailsTrigger(details,state) {
      if (details.attr('open')) {
        if (state === 'toggle') {
          details.removeAttr('open');
          details.removeClass('uojs--details--is-open');
        }
      } else {
        details.attr('open', 'open');
        details.addClass('uojs--details--is-open');
      }
      equalizeHeights(details);
    }

    function equalizeHeights(ele) {
      if ($.fn.UOCalculateHeightAllWrapper) {
        $.fn.UOCalculateHeightAllWrapper(ele);
      }
    }

  });
  
  $( document ).ajaxComplete(function() {
    $('summary').attr('tabindex', '0');
  });
  
})(jQuery);
