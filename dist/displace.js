'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');

function displace(Content, options) {
  if (!global.document) {
    return function (_React$Component) {
      _inherits(EmptyDisplace, _React$Component);

      function EmptyDisplace() {
        _classCallCheck(this, EmptyDisplace);

        return _possibleConstructorReturn(this, (EmptyDisplace.__proto__ || Object.getPrototypeOf(EmptyDisplace)).apply(this, arguments));
      }

      _createClass(EmptyDisplace, [{
        key: 'render',
        value: function render() {
          return false;
        }
      }]);

      return EmptyDisplace;
    }(React.Component);
  }

  options = options || {};

  var Displaced = function (_React$Component2) {
    _inherits(Displaced, _React$Component2);

    function Displaced() {
      var _ref;

      var _temp, _this2, _ret;

      _classCallCheck(this, Displaced);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Displaced.__proto__ || Object.getPrototypeOf(Displaced)).call.apply(_ref, [this].concat(args))), _this2), _this2.renderDisplaced = function () {
        ReactDOM.unstable_renderSubtreeIntoContainer(_this2, React.createElement(Content, _this2.props, _this2.props.children), _this2.container);
      }, _this2.removeDisplaced = function () {
        ReactDOM.unmountComponentAtNode(_this2.container);
      }, _temp), _possibleConstructorReturn(_this2, _ret);
    }

    _createClass(Displaced, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.container = function () {
          if (!options.renderTo) {
            var result = document.createElement('div');
            document.body.appendChild(result);
            return result;
          } else if (typeof options.renderTo === 'string') {
            return document.querySelector(options.renderTo);
          } else {
            return options.renderTo;
          }
        }();
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.props.mounted) {
          this.renderDisplaced();
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (prevProps.mounted && !this.props.mounted) {
          this.removeDisplaced();
        } else if (this.props.mounted) {
          this.renderDisplaced();
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.removeDisplaced();

        if (!options.renderTo) {
          this.container.parentNode.removeChild(this.container);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return false;
      }
    }]);

    return Displaced;
  }(React.Component);

  Displaced.defaultProps = {
    mounted: true
  };


  return Displaced;
}

module.exports = displace;

