/*
 * To celebrate Pride 2015 and the recent Supreme Court victory for same-sex
 * marriage, the uoWeb development team is proud to embed this easter egg into
 * our site that will add an explosion of colour to the meganav when the Konami
 * Code is entered into the site. 
 * 
 * The world has changed a lot since June 28, 1969, and we hope it continues to
 * change for the better.
 */

var HAPPY_PRIDE_UOTTAWA = {

  rainbowMeganav: function() {
    jQuery('body').addClass('uos--rainbow-meganav');
  }

};

var easter_egg = new Konami(HAPPY_PRIDE_UOTTAWA.rainbowMeganav);
