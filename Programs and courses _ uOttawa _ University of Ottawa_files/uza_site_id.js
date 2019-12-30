(function($) {
  
  $(document).ready(function() {
  
    var breadcrumbCount = $('.uoe--breadcrumb').length;
    
    // Mega Breadcrumb Builder
    // Iterates through each uoe--breadcrumb element on a page to generate the mega breadcrumb. 
    
    function buildMegaBreadcrumb() {
      
      var tripleDotTitle = Drupal.t('View complete breadcrumb');
      var closePanel = Drupal.t('Close this panel');
      var megaBreadcrumb = '<div class="uoe--mega-breadcrumb">';
      var shortBreadcrumb = '<a href="#" title="'+tripleDotTitle+'" class="uoe--icon-tripledot">'+tripleDotTitle+'</a>';
      
      $('.uoe--breadcrumb').each(function(index) {
        var url = $(this).attr('href');
        var title = $(this).html();
        if (url) {
          megaBreadcrumb += '<ul><li><a class="crumb" href="'+url+'">'+title+'</a>';
        } else {
          megaBreadcrumb += '<ul><li><span class="crumb uoe--active">'+title+'</span>';
        }
        if (breadcrumbCount - index == 2) {
          if (url) {
            shortBreadcrumb += ' / <a class="uoe--breadcrumb" href="' + url + '">' + title + '</a>';
          }
          else {
            shortBreadcrumb += ' / <div class="uoe--breadcrumb">' + title + '</div>';
          }
        }
        if (breadcrumbCount - index == 1) {
          shortBreadcrumb += ' / <div class="uoe--breadcrumb">' + title + '</div>';
        }
      });

      $('.uoe--breadcrumb').each(function() {
        megaBreadcrumb += '</li></ul>';
      });

      megaBreadcrumb += '<a href="#" tabindex="0" title="'+closePanel+'" class="uoe--close uos--icon-close-white">'+closePanel+'</a></div>';

      $('#site-breadcrumbs').html(shortBreadcrumb+megaBreadcrumb);
    };
    
    
    // If there are more then 2 breadcrumbs generate run the builder function.
    
    if (breadcrumbCount > 2) {
      buildMegaBreadcrumb();
    }
    
    $('.uoe--icon-tripledot').click(function() {
      $('.uoe--mega-breadcrumb').fadeToggle();
    });
    $('.uoe--mega-breadcrumb .uoe--close').click(function() {
      $('.uoe--mega-breadcrumb').fadeOut();
      $('.uoe--icon-tripledot').focus();
    });
    
    mouseInMegaBreadcrumb = false;
    $('.uoe--mega-breadcrumb, .uoe--icon-tripledot').mouseenter(function() {
      mouseInMegaBreadcrumb = true;
    });
    $('.uoe--mega-breadcrumb, .uoe--icon-tripledot').mouseleave(function() {
     mouseInMegaBreadcrumb = false;
    });
    
    $('body').click(function() {
      if(!mouseInMegaBreadcrumb) {
        $('.uoe--mega-breadcrumb').fadeOut();
      }
    });
    
  });

})(jQuery);