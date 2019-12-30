/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function($) {    
    // add Drupal behaviour
    Drupal.behaviors.oembed_video_resize = {
        attach: function (context, settings) { 
            // if an oembed video wrapper is on the page
            if ($('.embeddedContent').size()) {
                filterPostProcess();
                // run the auto resize logic function
                autoResize(); 
                // run the function to apply CSS
                applyStyles();
                // bind the auto resize function to the window resizing event
                $(window).resize(function () { 
                    autoResize();
                });
            }
        }
    };
    
    // define auto resize logic function
    function autoResize() {    
        //$('.embeddedContent > img').replaceTag('<iframe>', true);
        
        // get values from data fields of embedded video attributes
        var parentDiv = $('.embeddedContent'), // wrapper div
            vidFrame = $('.embeddedContent > iframe'), // iframe
            aspectRatio = $('.embeddedContent-filterBypass > .embeddedContent-filterBypass4').text() || '16:9',//parentDiv.attr('data-aspectratio') || '16:9',
            // get max dimensions if defined, or use default
            maxWidth = $('.embeddedContent-filterBypass > .embeddedContent-filterBypass5').text() || aspectRatio !== '4:3'? '560' : '420',//parentDiv.attr('data-maxwidth') || aspectRatio !== '4:3'? '560' : '420',
            maxHeight = $('.embeddedContent-filterBypass > .embeddedContent-filterBypass6').text() || '315',//parentDiv.attr('data-maxheight') || '315',   
	    resizeType = $('.embeddedContent-filterBypass > .embeddedContent-filterBypass3').text() || 'noresize',//parentDiv.attr('data-resizetype') || 'noresize',
            parentWidth = parentDiv.width(), // get actual dimensions of wrapper div
            parentHeight = parentDiv.height(),
            vidWidth = vidFrame.width(), // get actual dimensions of iframe
            vidHeight = vidFrame.height(), 
            ratio = vidHeight/vidWidth, // initialize aspect ratio              
            newWidth = vidWidth, // declare new dimesnion variables 
            newHeight = vidHeight;
            
        // detect 16:9 or 4:3 aspect ratio & change ratio
        if (resizeType == 'noresize') {
            if (aspectRatio == '16:9')
                ratio = 0.5625;
            else if (aspectRatio == '4:3')
                ratio = 0.75;
        }
                            
        if (parentWidth > maxWidth) { // if wrapper div is currently wider than defined max width
            newWidth = maxWidth;        // max out video
            newHeight = newWidth*ratio; // set height according to width to keep aspect ratio
        } else {                      // wrapper div is shrinking
            newWidth = parentWidth;     // shrink video
            newHeight = newWidth*ratio; // set height according to width to keep aspect ratio
        }     

        if (newHeight > maxHeight) {  // height has been increased beyond max height
            newWidth -= newHeight-maxHeight; // shrink video to fit into max dimensions
            newHeight = newWidth*ratio; // set height according to width to keep aspect ratio
        }

        // set video dimesnions to new values
        vidFrame.attr('width', newWidth);
        vidFrame.attr('height', newHeight);
    }
    
    function filterPostProcess() {
      var iframe_url = $('.embeddedContent-filterBypass .embeddedContent-filterBypass0').map(function(){
                     return $.trim($(this).text());
                     }).get();
      
      for (var i = 0; i < iframe_url.length; i++) {
        var newiframe = $("<iframe>", {
          allowfullscreen: "true", 
          allowscriptaccess: "always", 
          title: "Embedded Video",
          scrolling: "no", 
          src: iframe_url[i]         
        });  
        newiframe.attr('width', '425');
        newiframe.attr('height', '349');
        //Adding the iframe to the correct element
        newiframe.prependTo($('.embeddedContent').eq(i));
      }    
    }
    
    function applyStyles() {
        if ($('.embeddedContent-filterBypass > .embeddedContent-filterBypass7').text() != 'none')
            $('.embeddedContent').css({
                'text-align': $('.embeddedContent-filterBypass > .embeddedContent-filterBypass7').text()
            });
        
        if ($('.embeddedContent-iconArea').size()) {
            if ($('.embeddedContent-iconArea > img').size()) {
                $('.embeddedContent-iconArea > img').css({
                    display: 'inline-block', 
                    margin: '1px', 
                    'vertical-align': 'middle', 
                    'max-height': '25px', 
                    'max-width': '25px'
                });
            }
            
            if ($('.embeddedContent-iconArea > a').size()) {
                $('.embeddedContent-iconArea > a > img').css({
                    display: 'inline-block', 
                    margin: '1px', 
                    'vertical-align': 'middle', 
                    'max-height': '25px', 
                    'max-width': '25px'
                });
                $('.embeddedContent-iconArea > a > span').css({
                    display: 'inline-block',         
                    margin: '1px', 
                    'vertical-align': 'middle'
                });
            }
        }
        
        $('.embeddedContent-filterBypass').css({
            display: 'none',
            width: '0',
            height: '0'
        });
    }
})(jQuery);