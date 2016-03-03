var React = require('react');
var ReactDOM = require('react-dom');

module.exports = function(Content, options) {
  if (!global.document) return React.createClass({
    render: function() { return false; },
  });

  options = options || {};

  return React.createClass({
    propTypes: {
      mounted: React.PropTypes.bool,
    },

    getDefaultProps: function() {
      return {
        mounted: true,
      };
    },

    componentWillMount: function() {
      this.container = (function() {
        if (!options.renderTo) {
          var result = document.createElement('div');
          document.body.appendChild(result);
          return result;
        } else if (typeof options.renderTo === 'string') {
          return document.querySelector(options.renderTo);
        } else {
          return options.renderTo;
        }
      }());
    },

    componentDidMount: function() {
      if (this.props.mounted) {
        this.renderDisplaced();
      }
    },

    componentDidUpdate: function(prevProps) {
      if (prevProps.mounted && !this.props.mounted) {
        this.removeDisplaced();
      } else if (this.props.mounted) {
        this.renderDisplaced();
      }
    },

    componentWillUnmount: function() {
      this.removeDisplaced();

      if (!options.renderTo) {
        this.container.parentNode.removeChild(this.container);
      }
    },

    renderDisplaced: function() {
      ReactDOM.unstable_renderSubtreeIntoContainer(
        this,
        React.createElement(Content, this.props, this.props.children),
        this.container
      );
    },

    removeDisplaced: function() {
      ReactDOM.unmountComponentAtNode(this.container);
    },

    render: function() {
      return false;
    },
  });
}
