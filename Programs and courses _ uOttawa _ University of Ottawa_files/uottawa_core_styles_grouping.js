/**
 * @file
 * JavaScript for uOttawa Core Styles DCL Grouping.
 */

(function ($) {

  var UO_CS_HE_CLASS_PREFIX = 'js-ucs-hg--';
  var UO_CS_INNER_HE_CLASS_PREFIX = 'js-ucs-ihg--';
  var UO_CS_INNER_HE_CLASS_DCL_ITEMS_PREFIX = UO_CS_INNER_HE_CLASS_PREFIX + 'dcl-items--';
  var UO_CS_INNER_HE_CLASS_DCL_ITEMS_BY_ROW_PREFIX = UO_CS_INNER_HE_CLASS_PREFIX + 'dcl-items-by-row--';

  /**
   * Equalize the height of all selected elements.
   * @todo: replace "$(this)" with just "this" everywhere in this plug-in?
   */
  $.fn.UOEqualHeightify = function() {
    var highest = 0; // Keep track of the greatest height.
    $(this).each(function() { // For each element.
        var oldEqHeight = $(this).outerHeight(false); // Get the equalized height.
        $(this).css('height', ''); // Remove the target element's height CSS property.
        var realHeight = $(this).outerHeight(false); // Get the real height.
        $(this).css('height', oldEqHeight); // Restore the old height.
        if (realHeight > highest) { // Compare heights.
          highest = realHeight;
        }
    });
    $(this).css('height', highest); // Set new height.
    return this;
  };

  /**
   * Equalize the height of all selected elements in the same row.
   * @todo: replace "$(this)" with just "this" everywhere in this plug-in?
   */
  $.fn.UOEqualHeightifyByRow = function() {
    if ($(this).length == 0) {
      return this;
    }
    var unprocessed_elements = this;
    $(this).each(function() { // For each element.
      if ($(unprocessed_elements).length == 0) {
        return false;
      }
      var that = this;
      var row_elements = $();
      $(unprocessed_elements).each(function() { // For each unprocessed element.
        if ($(that).offset().top === $(this).offset().top) {
          row_elements = row_elements.add(this);
        }
      });
      if ($(row_elements).length > 0) {
        $(row_elements).UOEqualHeightify(); // Equalize heights of this complete row.
        unprocessed_elements = $(unprocessed_elements).not(row_elements);
      }
    });
    return this;
  };

  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, scope) {
      'use strict';
      var i, len;
      for (i = 0, len = this.length; i < len; ++i) {
        if (i in this) {
          fn.call(scope, this[i], i, this);
        }
      }
    };
  }

  function getGroups(class_prefix) {
    var groups = [];
    if ((typeof class_prefix === 'string') && (class_prefix.length > 0)) {
      var entities = $('*[class*=' + class_prefix + ']');
      entities.each(function() {
        var classes = this.className.split(' ');
        classes.forEach(function(c) {
          if (c.match('^' + class_prefix)) {
            if (groups.indexOf(c) == -1) {
              groups.push(c);
            }
          }
        });
      });
    }
    return groups;
  }

  /**
   * Return true if ("a" contains "b"), i.e. if one or more "b" containers are
   * contained inside an "a" container. If ("b" contains "a") also then output
   * a message to list all cyclic inconsistencies simultaneously (the
   * topological sort will only stop and report the first one).
   */
  function edgeCreate(a, b) {
    if ($('.' + a).find($('.' + b)).length > 0) {
      if ($('.' + b).find($('.' + a)).length > 0) {
        safeConsoleLog("edgeCreate: Height equalization (HE) is not possible since a page element of HE group " + a + " both contains and is contained by elements of HE group " + b + ".");
      }
      return true; // Create a directed edge from a to b, the topological sort will detect any cycles later.
    }
  }

  /**
   * Display console messages only if logged in and the console exists (for IE).
   */
  function safeConsoleLog(message) {
    if ($("body").hasClass("logged-in") && (typeof(console) !== "undefined" && console.log)) { // Don't break IE.
      console.log(message);
    }
  }

  /**
   * Create the directed graph. If the directed edge from a to b exists
   * then this signifies that ("a" contains "b") and (NOT "b" contains "a")
   * (see the edgeCreate() function).
   */
  function createGraph(array) {
    var edges = [];
    var i, j;
    for (i = 0; i < array.length; i++) {
      for (j = i; j < array.length; j++) {
        if (edgeCreate(array[i], array[j])) {
          edges.push([array[i], array[j]])
        }
        if (edgeCreate(array[j], array[i])) {
          edges.push([array[j], array[i]])
        }
      }
    }
    return edges;
  }

  /**
   * Remove all height styling (called for mobile displays or graceful degradation).
   */
  function removeHeightStyling(array) {
    $("*[class*='" + UO_CS_HE_CLASS_PREFIX + "']").css('height', '');
    $("*[class*='" + UO_CS_INNER_HE_CLASS_PREFIX + "']").css('height', '');
  }

  /**
   * Wrapper to equalize by either
   *   (1) specifying an element ele as arg to scroll to ele
   *   (2) specifying null as arg if no element to scroll to
   * Usage example from slideshow:
   *   UCS_SLIDESHOW.prototype.equalizeHeights = function(ele) {
   *     if ($.fn.UOCalculateHeightAllWrapper) {
   *       $.fn.UOCalculateHeightAllWrapper(ele);
   *     }
   *   }
   */
  $.fn.UOCalculateHeightAllWrapper = function(element) {
    if ((typeof element !== 'undefined') && element && $(element).length) {
      $(element).UOCalculateHeightAll(true); // Case (1).
    }
    else {
      $.fn.UOCalculateHeightAll(); // Case (2).
    }
  };

  /**
   * Equalize the heights of the members of all container groups in the
   * correct group order. Note that all groups are height equalized even if the
   * group has only one container because this function also sets the initial
   * height to the container content height.
   * If scrollToFirstSelectedElement is True, then the first selected
   * element will be scrolled to.
   * @todo: replace "$(this)" with just "this" everywhere in this plug-in?
   */
  $.fn.UOCalculateHeightAll = function(scrollToFirstSelectedElement) {

    if (window.innerWidth <= 720) {
      removeHeightStyling(); // Remove height equalization.
      return this;
    }

    if (typeof scrollToFirstSelectedElement === 'undefined') {
      scrollToFirstSelectedElement = false;
    }

    var docHeight = $(document).height();
    var winScrollX = $(window).scrollLeft();
    var winScrollY = $(window).scrollTop();

    // Get all groups of DCL item containers that are not height equalized by row.
    var groupsDclItemsNotByRow = getGroups(UO_CS_INNER_HE_CLASS_DCL_ITEMS_PREFIX);

    // Get all groups of DCL item containers that are height equalized by row.
    var groupsDclItemsByRow = getGroups(UO_CS_INNER_HE_CLASS_DCL_ITEMS_BY_ROW_PREFIX);

    // Get all height equalization groups.
    var groupsAll = getGroups(UO_CS_HE_CLASS_PREFIX).concat(groupsDclItemsNotByRow).concat(groupsDclItemsByRow);

    // Order groups from inner to outer so that the height equalization
    // will be performed in the correct order.
    var edges = createGraph(groupsAll); // A directed graph.
    var groupsAllSorted;
    try {
      groupsAllSorted = tsort(edges); // Topological sort fails if the directed graph is not acyclic.
    }
    catch (e) {
      safeConsoleLog("UOCalculateHeightAll: Height equalization (HE) is not possible since a page element of one HE group both contains and is contained by elements of the same or another HE group (" + e.message + ").");
      groupsAll = groupsAllSorted = []; // Do not perform any height equalization.
      removeHeightStyling(); // Graceful degradation.
    }
    groupsAllSorted = groupsAllSorted.reverse();

    // Add missing containers that were not in the directed graph; disjointed
    // inconsistent container pairs and disjointed containers are not added to
    // the directed graph. These are added to the end of the array and therefore
    // height equalized last.
    groupsAll.forEach(function(c) {
      if (groupsAllSorted.indexOf(c) == -1) {
        groupsAllSorted.push(c);
      }
    });

    // Equalize.
    groupsAllSorted.forEach(function(group) {
      if (groupsDclItemsByRow.indexOf(group) == -1) {
        $('.' + group).UOEqualHeightify();
      }
      else {
        $('.' + group).UOEqualHeightifyByRow();
      }
    });

    if (scrollToFirstSelectedElement && $(this).length) {
      $('html, body').animate({
        scrollTop: $(this).offset().top - 100
      }, 250);
    }
    else if (docHeight == $(document).height()) {
      // Restore the vertical scroll if the document height has not changed.
      window.scrollTo(winScrollX, winScrollY);
    }

    return this;
  };

  // Document ready event.
  $(document).ready(function() {

    // (1) Initial height equalization.
    $.fn.UOCalculateHeightAll();

    // (2) HTML details tag expand/contract event.
    $("details").bind("click", function() {
      setTimeout(function() {
        $(this).UOCalculateHeightAll(true);
      }, 0);
    });

    // (3) Browser window resize event with resize end detection.
    var rtime;
    $(window).bind("resize", function() {
      clearTimeout(rtime);
      rtime = setTimeout(function() {
        $.fn.UOCalculateHeightAll();
      }, 200);
    });

    // (4) The slide show change event is handled in by the
    // "next" method in ucs_slideshow.js which calls the
    // UOCalculateHeightAllWrapper() jQuery plugin defined above to
    // perform height equalization.

    // (5) The details tag polyfill uz_polyfill_details.js code and
    // the uo_details_plus.js code call the UOCalculateHeightAllWrapper()
    // jQuery plugin defined above to perform height
    // equalization.

    // (6) The Google Font loader js in uza_google_fonts.js calls
    // the UOCalculateHeightAll() jQuery plugin defined above to perform
    // height equalization synchronously when the external fonts have loaded.

  });

  // AJAX complete event.
  $(document).ajaxComplete(function() {
    // (7) Just resize all container groups.
    $.fn.UOCalculateHeightAll();
  });

  $(window).load(function() {

    // (8) All images are loaded event.
    $.fn.UOCalculateHeightAll();

    // (9) Twitter widgets loaded event.
    if (typeof twttr !== 'undefined') {
      twttr.ready(
        function (twttr) {
          twttr.events.bind(
            'loaded',
            function (event) {
              $.fn.UOCalculateHeightAll();
            }
          );
        }
      );
    }

    if ($('body').hasClass('live')) {
      // (10) Misc. for production sites only.
      $.each([400, 800], function() {
        setTimeout(function() {
          $.fn.UOCalculateHeightAll();
        }, this);
      });
    }

  });

  /**
   * General topological sort.
   *
   * @author SHIN Suzuki (shinout310@gmail.com)
   * @param Array<Array> edges : list of edges. each edge forms Array<ID,ID> e.g. [12 , 3]
   *
   * @returns Array : topological sorted list of IDs
   *
   * Copyright 2012 Shin Suzuki<shinout310@gmail.com>
   *
   *  Licensed under the Apache License, Version 2.0 (the "License");
   *  you may not use this file except in compliance with the License.
   *  You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   *  Unless required by applicable law or agreed to in writing, software
   *  distributed under the License is distributed on an "AS IS" BASIS,
   *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   *  See the License for the specific language governing permissions and
   *  limitations under the License.
   */
  function tsort(edges) {
    var nodes   = {}, // Hash: stringified id of the node => { id: id, afters: lisf of ids }.
        sorted  = [], // Sorted list of IDs ( returned value ).
        visited = {}; // Hash: id of already visited node => true.

    var Node = function(id) {
      this.id = id;
      this.afters = [];
    };

    // 1. Build data structures.
    edges.forEach(function(v) {
      var from = v[0], to = v[1];
      if (!nodes[from]) {
        nodes[from] = new Node(from);
      }
      if (!nodes[to]) {
        nodes[to] = new Node(to);
      }
      nodes[from].afters.push(to);
    });

    // 2. Topological sort.
    Object.keys(nodes).forEach(function visit(idstr, ancestors) {
      var node = nodes[idstr],
          id   = node.id;

      // If already exists, do nothing.
      if (visited[idstr]) {
        return;
      }

      if (!Array.isArray(ancestors)) {
        ancestors = [];
      }

      ancestors.push(id);

      visited[idstr] = true;

      node.afters.forEach(function(afterID) {
        if (ancestors.indexOf(afterID) >= 0) { // If already in ancestors, a closed chain exists.
          throw new Error('closed chain : ' + afterID + ' is in ' + id);
        }

        visit(afterID.toString(), ancestors.map(function(v) {
          return v;
        })); // Recursive call.
      });

      sorted.unshift(id);
    });

    return sorted;
  }

})(jQuery);
