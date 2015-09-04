var React = require('react');

module.exports = function(Content, options) {
  if (!global.document) return React.createClass({
    render: function() { return false; },
  });

  options = options || {};
  var container = (function() {
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

  return React.createClass({
    propTypes: {
      mounted: React.PropTypes.bool,
    },

    getDefaultProps: function() {
      return {
        mounted: true,
      };
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
    },

    renderDisplaced: function() {
      React.render(
        React.createElement(Content, this.props, this.props.children),
        container
      );
    },

    removeDisplaced: function() {
      React.unmountComponentAtNode(container);
    },

    render: function() {
      return false;
    },
  });
}
