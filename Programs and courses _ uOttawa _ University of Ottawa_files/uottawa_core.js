/*
 * This is essential to use the media browser with AJAX.
 */
(function($) {
  
  $(document).ajaxComplete(function() {
    if (Drupal.settings.media !== undefined) {
      if (typeof Drupal.settings.media.browserUrl === 'object') {
        Drupal.settings.media.browserUrl = Drupal.settings.media.browserUrl[0];
      }
      if (typeof Drupal.settings.media.styleSelectorUrl === 'object') {
        Drupal.settings.media.styleSelectorUrl = Drupal.settings.media.styleSelectorUrl[0];
      }
    }
  });  
})(jQuery);
