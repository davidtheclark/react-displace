'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

function displace(Content, options) {
  if (!global.document) {
    return class EmptyDisplace extends React.Component {
      render() {
        return false;
      }
    };
  }

  options = options || {};

  class Displaced extends React.Component {
    static defaultProps = {
      mounted: true
    };

    componentWillMount() {
      this.container = (() => {
        if (!options.renderTo) {
          var result = document.createElement('div');
          document.body.appendChild(result);
          return result;
        } else if (typeof options.renderTo === 'string') {
          return document.querySelector(options.renderTo);
        } else {
          return options.renderTo;
        }
      })();
    }

    componentDidMount() {
      if (this.props.mounted) {
        this.renderDisplaced();
      }
    }

    componentDidUpdate(prevProps) {
      if (prevProps.mounted && !this.props.mounted) {
        this.removeDisplaced();
      } else if (this.props.mounted) {
        this.renderDisplaced();
      }
    }

    componentWillUnmount() {
      this.removeDisplaced();

      if (!options.renderTo) {
        this.container.parentNode.removeChild(this.container);
      }
    }

    renderDisplaced = () => {
      ReactDOM.unstable_renderSubtreeIntoContainer(
        this,
        React.createElement(Content, this.props, this.props.children),
        this.container
      );
    };

    removeDisplaced = () => {
      ReactDOM.unmountComponentAtNode(this.container);
    };

    render() {
      return false;
    }
  }

  return Displaced;
}

module.exports = displace;
