(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = global || self, factory(global.reactResponsive = {}, global.React));
})(this, (function (exports, react) { 'use strict';

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  var _excluded = ["children"];
  var keySwitcher = {
    maxWidth: function maxWidth(_maxWidth) {
      return "(max-width: " + _maxWidth + "px)";
    },
    minWidth: function minWidth(_minWidth) {
      return "(min-width: " + _minWidth + "px)";
    },
    minResolution: function minResolution(_minResolution) {
      return typeof _minResolution === "number" ? "(min-resolution: " + _minResolution + "dppx)" : "(min-resolution: " + _minResolution + ")";
    },
    maxResolution: function maxResolution(_maxResolution) {
      return typeof _maxResolution === "number" ? "(max-resolution: " + _maxResolution + "ddpx)" : "(max-resolution: " + _maxResolution + ")";
    },
    minHeight: function minHeight(_minHeight) {
      return "(min-height: " + _minHeight + "px)";
    },
    maxHeight: function maxHeight(_maxHeight) {
      return "(max-height: " + _maxHeight + "px)";
    },
    orientation: function orientation(_orientation) {
      return "(orientation: " + _orientation + ")";
    }
  };

  var MediaQuery = function MediaQuery(_ref) {
    var children = _ref.children,
        setting = _objectWithoutPropertiesLoose(_ref, _excluded);

    var getQuery = Object.entries(setting).map(function (_ref2) {
      var key = _ref2[0],
          value = _ref2[1];
      return keySwitcher[key](value);
    }).join(" and ");
    var matches = useMediaQuery({
      query: getQuery
    });
    return typeof children === 'function' ? children(matches) : matches ? children : null;
  };
  var useMediaQuery = function useMediaQuery(media) {
    var mql = window.matchMedia(media.query);

    var _useState = react.useState(mql.matches),
        value = _useState[0],
        setValue = _useState[1];

    var screenTest = function screenTest(e) {
      e.matches ? setValue(true) : setValue(false);
    };

    react.useEffect(function () {
      setValue(mql.matches);
      mql.addEventListener('change', screenTest);
      return function () {
        mql.removeEventListener('change', screenTest);
      };
    }, [media.query]);
    return value;
  };

  exports["default"] = MediaQuery;
  exports.useMediaQuery = useMediaQuery;

}));
//# sourceMappingURL=index.umd.js.map
