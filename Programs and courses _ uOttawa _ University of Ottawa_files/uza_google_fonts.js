(function ($) {
  WebFont.load({
    google: {
      families: ['Roboto:400,300,700,500']
    },
    timeout: 2000, // Set the timeout to two seconds
    classes: true,
    events: true,
    active: function() {
      if ($.fn.UOCalculateHeightAll) {
        $.fn.UOCalculateHeightAll();
      }
    },
  });
})(jQuery);
