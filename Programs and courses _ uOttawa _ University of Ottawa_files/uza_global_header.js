/* These variables store the original search settings
 * because they can be different depending if uottawa_gsa
 * is being used or not.
 */
var uza_original_search_action = '';
var uza_original_search_param = '';

(function ($) {

  $(document).ready(function() {

    if ($('#global-navigation').html().replace(/ /g, '').replace(/\n/, '') !== '') {
      $('#uottawa-mobile-toggles').append('<div id="uottawa-mobile-nav-toggle" tabindex="0"></div>');
    }

    $('#uoe--global-search-toggle, #uottawa-global-header, #uottawa-global-search').addClass('uojs--hidden-search');
    $('#uottawa-mobile-nav-toggle, #global-navigation').addClass('uojs--hidden-nav');

    /**************************************************************************/
    /* Global search                                                          */
    /**************************************************************************/

    uza_original_search_action = $('form#global-search-form').attr('action');
    uza_original_search_param = $('input#uottawa-global-search-box-input').attr('name');

    $('#uottawa-global-search').removeClass('uojs--no-js');
    $('#uottawa-global-search-box span').removeClass('noscript');

    if ($('#uottawa-global-search-box input').val()) {
      $('#uottawa-global-search-box span').addClass('label-focus');
    }

    $('#uottawa-global-search-box input').focus(function() {
      $('#uottawa-global-search-box span').addClass('label-focus');
      $('#uottawa-global-search').addClass('uojs--selected');
    });
    
    $('#uottawa-global-search-options').removeClass('uojs--no-js');
    $('#uottawa-global-search-options input:radio').change(function() {
      switch ($(this).attr('value')) {
        case 'uoSites':
          $('form#global-search-form')
              .attr('method', 'get')
              .attr('action', uza_original_search_action)
              .removeAttr('onsubmit');
          $('input#uottawa-global-search-box-input')
              .attr('name', uza_original_search_param);
          $('input#search_language')
              .removeAttr('name');
          $('input#stype')
              .removeAttr('name');
          $('input#loc')
              .removeAttr('name');
          $('input#whr')
              .removeAttr('name');
          $('input#institution_header')
              .removeAttr('name');
          $('input#vid_header')
              .removeAttr('name');
          $('input#group_header')
              .removeAttr('name');
          $('input#mode_header')
              .removeAttr('name');
          $('input#onCampus_header')
              .removeAttr('name');
          $('input#displayMode_header')
              .removeAttr('name');
          $('input#search_scope_header')
              .removeAttr('name');
          $('input#fn_header')
              .removeAttr('name');
          $('input#prefLang_header')
              .removeAttr('name');
          $('input#gnPrimoQuery')
              .removeAttr('name');
          break;
        case 'uoLib':
          $('form#global-search-form')
              .attr('method', 'get')
              .attr('target', '_self')
              .attr('enctype', 'application/x-www-form-urlencoded; charset=utf-8')
              .attr('onsubmit', 'gnSearchPrimo()')
              .attr('role', 'search')
              .attr('action', '//ocul-uo.primo.exlibrisgroup.com/discovery/search');
          $('input#uottawa-global-search-box-input')
              .attr('name', 'vl(freeText0)');
          $('input#search_language')
              .removeAttr('name');
          $('input#stype')
              .removeAttr('name');
          $('input#loc')
              .removeAttr('name');
          $('input#whr')
              .removeAttr('name');      
          $('input#institution_header')
              .attr('name', 'institution');
          $('input#vid_header')
              .attr('name', 'vid');
          $('input#group_header')
              .attr('name', 'group');
          $('input#mode_header')
              .attr('name', 'mode');
          $('input#onCampus_header')
              .attr('name', 'onCampus');
          $('input#displayMode_header')
              .attr('name', 'displayMode');
          $('input#search_scope_header')
              .attr('name', 'search_scope');
          $('input#fn_header')
              .attr('name', 'fn');
          $('input#prefLang_header')
              .attr('name', 'prefLang');
          $('input#gnPrimoQuery')
              .attr('name', 'query');
          break;
        case 'uoEmplDir':
          var language = $('input#search_language').attr('value').toLowerCase();
          var employee_url = (language == 'fr') ? '//www.uottawa.ca/fr/repertoire-directory/recherche-search' : '//www.uottawa.ca/en/repertoire-directory/recherche-search';
          $('form#global-search-form')
              .attr('method', 'get')
              .attr('action', employee_url)
              .removeAttr('onsubmit');
          $('input#uottawa-global-search-box-input')
              .attr('name', 'skey');
          $('input#search_language')
              .removeAttr('name');
          $('input#stype')
              .removeAttr('name');
          $('input#loc')
              .removeAttr('name');
          $('input#whr')
              .removeAttr('name');
          $('input#institution_header')
              .removeAttr('name');
          $('input#vid_header')
              .removeAttr('name');
          $('input#group_header')
              .removeAttr('name');
          $('input#mode_header')
              .removeAttr('name');
          $('input#onCampus_header')
              .removeAttr('name');
          $('input#displayMode_header')
              .removeAttr('name');
          $('input#search_scope_header')
              .removeAttr('name');
          $('input#fn_header')
              .removeAttr('name');
          $('input#prefLang_header')
              .removeAttr('name');
          $('input#gnPrimoQuery')
              .removeAttr('name');
          break;
      }
    });             

    // On click handler.
    $('#uoe--global-search-toggle').on('click', function(e) {
      e.stopPropagation();
      toggleGlobalSearch();
    });

    // On enter handler.
    $('#uoe--global-search-toggle').keydown(function(e) {
      e.stopPropagation();
      if (e.which == 13) {
        e.preventDefault();
        toggleGlobalSearch();
      }
    });

    // Hide the global search when a user clicks elsewhere on the page.
    $('body').on('click', function(e) {
      if ($(window).width() <= 1045) {
        $target = $(e.target);
        if (!$target.closest('#global-search-wrapper, #uoe--global-search-toggle').length
          && $('#uottawa-global-search').is(':visible')) {
          hideGlobalSearch('');
        }
      }
    });

    // Toggle the global search.
    function toggleGlobalSearch() {
      if ($('#uottawa-global-header').hasClass('uojs--hidden-search')) {
        $('#uoe--global-search-toggle').removeClass('uojs--hidden-search');
        $('#uottawa-global-header').removeClass('uojs--hidden-search');
        $('#uottawa-global-search').removeClass('uojs--hidden-search');
        $('#uottawa-mobile-nav-toggle').addClass('uojs--hidden-nav');
        $('#global-navigation').addClass('uojs--hidden-nav');
        $('#uoe--global-search-toggle').addClass('uos--active');
        cleanupActive('#uoe--global-search-toggle');
        $('.uos--mask').remove();

        gSearchHeight = $('#global-search-wrapper').height();
        $('#global-search-wrapper').css('height',0).animate({height: gSearchHeight}, 300, function() {
          $('#global-search-wrapper').removeAttr('style');
          // Add mask over rest of content on mobile.
          if ($(window).width() <= 1045) {
            $('body').append('<div class="uos--mask"></div>');
            $('.uos--mask').css({'height': 0});
            setSearchMask();
          }
        });
      }
      else {
        hideGlobalSearch('');
      }
    }

    // Set the overlay mask necessary for the search .
    function setSearchMask() {
      var globalSearch = $('#global-search-wrapper');
      var globalSearchBottom = globalSearch.offset().top + globalSearch.height();
      var documentHeight = $(document).height();
      $('.uos--mask').css({
        'top': globalSearchBottom + 'px',
        'height': (documentHeight - globalSearchBottom) + 'px'
      });
    }

    // Perform all tasks necessary to hiding the global search.
    function hideGlobalSearch(cleanupException) {
      // Hide search box
      $('#uoe--global-search-toggle').addClass('uojs--hidden-search');
      $('#uottawa-global-header').addClass('uojs--hidden-search');
      $('#uottawa-global-search').addClass('uojs--hidden-search');
      cleanupActive(cleanupException);
      // Remove mask over rest of content
      $('.uos--mask').remove();
    }

    var language = $('html').attr('lang');

    // Reroute the submission to a friendly URL depending on the option selected.
    $('#global-search-form').on('submit', function(e) {
      // Reroute user to uoSearch (Solr) results page.
      if ($('#edit-custom-search-paths-uosites').is(':checked') && $('#global-search-form input[name=solr]').length) {
        e.preventDefault();
        e.stopPropagation();
        var uosites_url = $('#global-search-form').attr('action') + $('#global-search-form input[name=solr]').val();
        window.location = uosites_url;
      }
      // Reroute user to Employee Directory (Solr) results page.
      if ($('#edit-custom-search-paths-uoempldir').is(':checked')) {
        e.preventDefault();
        e.stopPropagation();
        var uoempl_url = $('#global-search-form').attr('action') + '/' + $('#global-search-form input[name=skey]').val();
        window.location = uoempl_url;
      }
    });

    /**************************************************************************/
    /* Mobile navigation (hamburger menu)                                     */
    /**************************************************************************/

    // On click handler.
    $('#uottawa-mobile-nav-toggle').on('click', function(e) {
      e.stopPropagation();
      toggleMobileMeganav();
    });

    // On enter handler.
    $('#uottawa-mobile-nav-toggle').keydown(function(e) {
      e.stopPropagation();
      if (e.which == 13) {
        e.preventDefault();
        toggleMobileMeganav();
      }
    });

    // Hide the mobile meganav when a user clicks elsewhere on the page.
    $('body').on('click', function(e) {
      if ($(window).width() <= 1045) {
        $target = $(e.target);
        if (!$target.closest('#global-navigation, #uottawa-mobile-nav-toggle').length
          && $('#global-navigation').is(':visible')) {
          hideMobileMeganav('');
        }
      }
    });

    // Toggle the mobile meganav.
    function toggleMobileMeganav() {
      if ($('#uottawa-mobile-nav-toggle').hasClass('uojs--hidden-nav')) {
        $('#uottawa-mobile-nav-toggle').addClass('uos--active');
        $('#uottawa-mobile-nav-toggle').removeClass('uojs--hidden-nav');
        $('#global-navigation').removeClass('uojs--hidden-nav');
        $('#uoe--global-search-toggle').addClass('uojs--hidden-search');
        $('#uottawa-global-header').addClass('uojs--hidden-search');
        $('#uottawa-global-search').addClass('uojs--hidden-search');
        cleanupActive('#uottawa-mobile-nav-toggle');
        $('.uos--mask').remove();

        var gNavHeight = $('#global-navigation').height();
        $('#global-navigation').css('height',0).animate({height: gNavHeight}, 500, function() {
          $('body').append('<div class="uos--mask"></div>');
          $('.uos--mask').css({'height': 0});
          setMobileMeganavMask();
        });
      }
      else {
        hideMobileMeganav('');
      }
    }

    // Set the mobile meganav mask.
    function setMobileMeganavMask() {
      $('#global-navigation').removeAttr('style');
      var globalNav = $('#global-navigation-wrapper');
      var globalNavBottom = globalNav.offset().top + globalNav.height();
      var documentHeight = $(document).height();
      $('.uos--mask').css({
        'top' : globalNavBottom + 'px',
        'height' : (documentHeight - globalNavBottom) + 'px'
      });
    }

    // Perform all tasks necessary to hiding the mobile meganav.
    function hideMobileMeganav(cleanupException) {
      // Hide the meganav
      $('#uottawa-mobile-nav-toggle').addClass('uojs--hidden-nav');
      $('#global-navigation').addClass('uojs--hidden-nav');
      cleanupActive(cleanupException);
      // Remove mask over content
      $('.uos--mask').remove();
    }

    /**************************************************************************/
    /* Language list                                                          */
    /**************************************************************************/

    // Toggle the language list when a user clicks the "Language" button.
    $('.uoe--language-switcher .uoe--switch').on('click', function(e) {
      e.stopPropagation();
      toggleLanguageList()
    });

    // Toggle the language list when a user presses enter on the "Language" button.
    $('.uoe--language-switcher .uoe--switch').keydown(function(e) {
      if (e.which == 13) {
        e.preventDefault();
        toggleLanguageList()
      }
    });

    // Hide the language list when a user clicks elsewhere on the page
    $('body').on('click', function(e) {
      $target = $(e.target);
      if(!$target.closest('.uoe--language-list, .uoe--language-switcher').length
        && $('.uoe--language-list').is(':visible')) {
        if (!$target.closest('.uos--active').length) {
          cleanupActive('');
          // Remove mask over content
          $('.uos--mask').remove();
        }
      }
    });

    // Toggle the mobile meganav.
    function toggleLanguageList() {
      if ($('.uoe--language-switcher').hasClass('uos--active')) {
        cleanupActive();
        $('.uos--mask').remove();
      }
      else {
        cleanupActive('.uoe--language-switcher');
        hideGlobalSearch('.uoe--language-switcher');
        hideMobileMeganav('.uoe--language-switcher');
        $('.uoe--language-switcher').toggleClass('uos--active');
        if ($(window).width() <= 1045) {
          $('body').append('<div class="uos--mask"></div>');
          $('.uos--mask').css({'height': 0});
          setLanguageMask();
        }
      }
    }

    // Set the mobile language toggle mask.
    function setLanguageMask() {
      var languageList = $('.uoe--language-list');
      var languageListBottom = languageList.offset().top + languageList.height();
      var documentHeight = $(document).height();
      $('.uos--mask').css({
        'top' : languageListBottom + 'px',
        'height' : (documentHeight - languageListBottom) + 'px'
      });
    }

    // Resize the language, search and mobile meganav masks as needed.
    $(window).resize(function() {
      if ($('.uos--mask').is(':visible')) {
        if ($('#uottawa-global-search').is(':visible')) {
          setSearchMask();
        }
        else if ($(window).width() <= 1045) {
          if ($('#global-navigation').is(':visible')) {
            setMobileMeganavMask();
          }
          else if ($('.uoe--language-list').is(':visible')) {
            setLanguageMask();
          }
        }
        else {
          $('.uos--mask').remove();
        }
      }
    });

    /**************************************************************************/
    /* Login list                                                             */
    /**************************************************************************/

    // Toggle the login list when a user clicks the "Login" button.
    $('.uoe--login-link .uoe--switch').on('click', function(e) {
      e.stopPropagation();
      hideGlobalSearch('.uoe--login-link');
      cleanupActive('.uoe--login-link');
      $('.uoe--login-link').toggleClass('uos--active');
    });

    // Toggle the login list when a user presses enter on the "Login" button.
    $('.uoe--login-link .uoe--switch').keydown(function(e) {
      if (e.which == 13) {
        e.preventDefault();
        hideGlobalSearch('.uoe--login-link');
        cleanupActive('.uoe--login-link');
        $('.uoe--login-link').toggleClass('uos--active');
      }
    });

    // Hide the login list when a user clicks elsewhere on the page
    $('body').on('click', function(e) {
      $target = $(e.target);
      if(!$target.closest('.uoe--login-list, .uoe--login-link').length
        && $('.uoe--login-list').is(':visible')) {
        if (!$target.closest('.uos--active').length) {
          cleanupActive('');
        }
      }
    });

    // Remove the active class from all other elements
    function cleanupActive(exception) {
      var i;
      var list = [
        '#uottawa-mobile-nav-toggle',
        '#uoe--global-search-toggle',
        '.uoe--login-link',
        '.uoe--language-switcher'
      ];
      for (i = 0; i < list.length; ++i) {
        if (exception == '') {
          $(list[i]).removeClass('uos--active');
        }
        else if (list[i] !== exception) {
          $(list[i]).removeClass('uos--active');
        }
      }
    }

  });

})(jQuery);
