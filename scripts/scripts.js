(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _common = require('./modules/common');

var _common2 = _interopRequireDefault(_common);

var _gallery = require('./modules/gallery');

var _gallery2 = _interopRequireDefault(_gallery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var availableModules = { Common: _common2.default, Gallery: _gallery2.default };

window.modules = {};

$(function () {
  var htmlModules = $('[data-module]');

  // Loading htmlModules if they are in availableModules
  htmlModules.each(function (key, value) {
    var mod = $(value).data('module');

    if (Object.prototype.hasOwnProperty.call(availableModules, mod)) {
      window.modules[mod] = new availableModules[mod]();
    } else {
      console.log('The module "' + mod + '" does not exists.');
    }
  });
});

$.fn.serializeObject = function () {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function () {
    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

$.fn.existsWithValue = function () {
  return this.length && this.val().length;
};

},{"./modules/common":2,"./modules/gallery":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _menu = require('./menu');

var _menu2 = _interopRequireDefault(_menu);

var _smoothscroll = require('./smoothscroll');

var _smoothscroll2 = _interopRequireDefault(_smoothscroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Common = function () {
  function Common() {
    _classCallCheck(this, Common);

    console.log('>>> Common constructor');

    // Instance imports
    new _menu2.default();
    new _smoothscroll2.default();

    // Call methods
    this.fixedI10();
    this.disableZoomGesture();
    this.parallax();
    this.initAos();
  }

  _createClass(Common, [{
    key: 'fixedI10',
    value: function fixedI10() {
      if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement('style');
        msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'));
        document.querySelector('head').appendChild(msViewportStyle);
      }
    }
  }, {
    key: 'disableZoomGesture',
    value: function disableZoomGesture() {
      document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
      });
    }
  }, {
    key: 'parallax',
    value: function parallax() {
      // let rellax = {};
      if ($(".js-parallax")[0]) {
        new Rellax('.js-parallax');
      }

      if ($(".js-parallax-horizontal")[0]) {
        new Rellax('.js-parallax-horizontal', {
          horizontal: true
        });
      }
    }
  }, {
    key: 'initAos',
    value: function initAos() {
      AOS.init({
        once: true,
        disable: function disable() {
          var maxWidth = 992;
          return window.innerWidth < maxWidth;
        }
      });
    }
  }]);

  return Common;
}();

exports.default = Common;

},{"./menu":4,"./smoothscroll":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Gallery = function Gallery() {
  _classCallCheck(this, Gallery);

  console.log('>>> Gallery constructor');

  $('.js-gallery').lightGallery({
    selector: '.-photo .figure',
    thumbnail: false,
    share: false,
    download: false,
    zoom: false
  });
};

exports.default = Gallery;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Menu = function () {
  function Menu() {
    _classCallCheck(this, Menu);

    console.log('>>> Menu constructor');

    var menuToggle = $('.js-toggle-menu');
    var menu = $('.menu');

    this.openMenu(menuToggle, menu);
    this.closeOutside(menuToggle, menu);
  }

  _createClass(Menu, [{
    key: 'openMenu',
    value: function openMenu(menuToggle, menu) {
      var that = this;

      menuToggle.on('click', function (e) {
        e.preventDefault();

        // Toggle overlay
        if (!menuToggle.hasClass('-active')) {
          that.toggleOverlay(false);
          that.toggleMenu(menuToggle, menu, false);
        } else {
          that.toggleOverlay(true);
          that.toggleMenu(menuToggle, menu, true);
        }
      });
    }
  }, {
    key: 'closeMenu',
    value: function closeMenu(menuToggle, menu) {
      var that = this;

      // Toggle overlay
      that.toggleOverlay(true);

      // Toggle menu
      that.toggleMenu(menuToggle, menu, true);
    }
  }, {
    key: 'toggleOverlay',
    value: function toggleOverlay(isVisible) {
      var body = $('body');

      if (isVisible) {
        body.removeClass('-overlay');
      } else {
        body.addClass('-overlay');
      }
    }
  }, {
    key: 'toggleMenu',
    value: function toggleMenu(menuToggle, menu, isVisible) {
      if (isVisible) {
        menuToggle.removeClass('-active');
        menu.removeClass('-show');
      } else {
        menuToggle.addClass('-active');
        menu.addClass('-show');
      }
    }
  }, {
    key: 'closeOutside',
    value: function closeOutside(menuToggle, menu) {
      var that = this;

      // Escape key
      $(document).on('keydown', function (e) {
        if (e.keyCode === 27) that.closeMenu(menuToggle, menu);
      });

      // Escape click outside
      window.addEventListener('click', function (e) {
        var container = $('.-overlay');
        if (container.is(e.target)) {
          that.closeMenu(menuToggle, menu);
        }
      });

      // Escape on resize
      $(window).resize(function () {
        if ($(window).outerWidth() >= 992) {
          that.closeMenu(menuToggle, menu);
        }
      });
    }
  }]);

  return Menu;
}();

exports.default = Menu;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SmoothScroll = function () {
  function SmoothScroll() {
    _classCallCheck(this, SmoothScroll);

    console.log('>>> New SmoothScroll');

    // Call methods
    this.init();
  }

  _createClass(SmoothScroll, [{
    key: 'init',
    value: function init() {
      $('.smoothscroll').on('click', function (e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('body').removeClass('-overlay');
        $('.menu').removeClass('-show');
        $('.js-toggle-menu').removeClass('-active');

        $('html, body').stop().animate({
          'scrollTop': $target.offset().top - 70
        }, 1600, 'swing', function () {
          // window.location.hash = target;
        });
      });
    }
  }]);

  return SmoothScroll;
}();

exports.default = SmoothScroll;

},{}]},{},[1])