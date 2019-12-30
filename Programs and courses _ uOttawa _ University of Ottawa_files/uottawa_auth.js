/**
 * @file
 * Toolbar responsive fix
 */
(function ($) {
  var drupalMenu = $('#toolbar').height();
  $('body.toolbar').css('padding-top', drupalMenu);
  $(window).resize(function() {
    var drupalMenu = $('#toolbar').height();
    $('body.toolbar').css('padding-top', drupalMenu);
  });
})(jQuery);
