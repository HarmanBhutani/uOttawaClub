var uOSupportsCSS = (function() {
  var div  = document.createElement('div'),
      vendors = ['Ms', 'Moz', 'Webkit'],
      len = vendors.length;
  
  return function(prop) {
    if ( prop in div.style ) return true;
    
    var tmpLen = len;
    
    prop = prop.replace(/^[a-z]/,function(char) {
      return char.toUpperCase();
    });
    
    while (tmpLen--) {
      if ( vendors[tmpLen] + prop in div.style ) {
        return true;
      }
    };
    
    return false;
  };
})();

if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP && oThis
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}