/**
 * @file
 * Handle everything pertaining to the uOttawa GDPR cookie banner.
 */

(function($) {
  $(window).load(function () {
    // NOTE: We can no longer set cookies client-side using JavaScript'sW
    // Document.cookie API due to restrictions in browsers like Safari.
    // @see https://webkit.org/blog/8613/intelligent-tracking-prevention-2-1/

    // Make an AJAX call to the file banner_gdpr_cookie.php, which then tells usage
    // if the user has the "uottawa-gdpr" cookie set (1 = TRUE, 0 = FALSE).
    $.ajax({
      type: 'POST',
      url: '/sites/all/themes/custom/uottawa_zen_assets/global_header/js/banner_gdpr_cookie.php',
      data: { action: 'get' },
      dataType: 'text',
      success: function (data) {
        if (data !== '1') {
          uottawa_gdpr_display_banner();
        }
      },
    });

    var uottawa_gdpr_content = '';

    // Set the GDPR banner at the top of the page.
    function uottawa_gdpr_setontop() {
      var window_top = $(window).scrollTop();
      var nav = $('#stick-gdpr-to-top');
      if (nav.length) {
        var top = $('#stick-gdpr-to-top').offset().top;
      }
      if (window_top > top) {
        $('.gdpr-banner-container').addClass('stick');
        $('#stick-gdpr-to-top').height($('.gdpr-banner-container').outerHeight());
      }
      else {
        $('.gdpr-banner-container').removeClass('stick');
        $('#stick-gdpr-to-top').height(0);
        $('#page-wrapper').before(uottawa_gdpr_content);

        // Hide the GDPR banner on click and set "uottawa-gdpr" cookie.
        $('#gdpr-hide').on('click', function () {
            $('.gdpr-banner-container').slideUp('slow', function () {
              $('#stick-gdpr-to-top').hide();
            });
            // Make an AJAX call to the file banner_gdpr_cookie.php to
            // set the cookie "uottawa-gdpr" to "1" (TRUE).
            $.ajax({
              type: 'POST',
              url: '/sites/all/themes/custom/uottawa_zen_assets/global_header/js/banner_gdpr_cookie.php',
              data: { action: 'set' },
              dataType: 'text',
              success: function (data) {
                // Do nothing.
              },
            });
        });
      }
    }

    // Render the GDPR banner.
    function uottawa_gdpr_display_banner() {
      var language = $('html').attr('lang');

      // Set the default text for all languages
      var gdprtext = "<p><span class=\"gdpr-heading\">Cookies and Language Preferences</span></p><p>Our website uses cookies to enhance your experience and save your preferences."
        + " By using our website, you consent to the usage of cookies. You may refuse to accept or delete cookies stored on your computer through the settings of your web browser."
        + " Read our <a href=\"https://www.uottawa.ca/aipo/privacy/website-privacy-statement\">Website Privacy Statement</a> to learn more about the information collected. "
        + "Our website displays the content in the default language of your browser. Learn how to <a href=\"https://it.uottawa.ca/how-change-language-your-browser\">"
        + " change the language of your browser</a>.</p>";
      var acceptbutton = "OK";

      // Change the text if the current language is French
      if (language == 'fr') {
        gdprtext = "<p><span class=\"gdpr-heading\">Témoins et paramètres linguistiques</span></p><p>Notre site Web utilise des témoins afin de rehausser votre expérience de"
          + " navigation, notamment en sauvegardant vos paramètres personnels. Lorsque vous utilisez notre site Web, vous consentez à l'enregistrement de témoins. Si vous ne "
          + "voulez pas que ces témoins soient mémorisés dans votre ordinateur, vous pouvez régler les paramètres de votre navigateur. Pour en savoir davantage sur l'"
          + "<a href=\"https://www.uottawa.ca/baipvp/protection-de-la-vie-privee/enonce-confidentialite-du-site-web\">énoncé de confidentialité du site Web</a>"
          + " en lien avec la sauvegarde de renseignements. Par défaut, notre site Web présente le contenu dans la langue configurée dans votre navigateur. "
          + " <a href=\"https://ti.uottawa.ca/comment-changer-langue-votre-fureteur\">Comment changer la langue de votre fureteur</a>.";
      }

      uottawa_gdpr_content = $('<div id="stick-gdpr-to-top"></div><div class="gdpr-banner-container"><div class="gdpr-text-wrapper"><div class="gdpr-alert-logo"></div><div class="gdpr-headline-text">' + gdprtext + '</div>'
        + '<div id="gdpr-hide">'
        + ' <a href="javascript:void(0);" class="gdpr-close">' + acceptbutton + '</a></div></div></div>');

      uottawa_gdpr_setontop();
    }

    $(window).scroll(uottawa_gdpr_setontop);
  });
})(jQuery);
