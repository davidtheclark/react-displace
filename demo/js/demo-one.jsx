var React = require('react');
var ReactDOM = require('react-dom');
var displace = require('../../');

var AppendedToBody = displace(React.createClass({
  propTypes: {
    number: React.PropTypes.number.isRequired,
  },

  render: function() {
    return (
      <div className='container'>
        <h2>
          Demo One's Displaced Element
        </h2>
        <p>
          I'm appended to the body rather than my parent React element.
        </p>
        <p>
          And I still update correctly.
          You've clicked "increment demo-one displaced number" {this.props.number} time(s).
        </p>
      </div>
    )
  },
}));

var DemoOne = React.createClass({
  getInitialState: function() {
    return {
      displacedNumber: 0,
      displacedMounted: false,
    };
  },

  toggleDisplaced: function() {
    this.setState({ displacedMounted: !this.state.displacedMounted });
  },

  incrementDisplaced: function() {
    this.setState({ displacedNumber: this.state.displacedNumber + 1 });
  },

  render: function() {
    return (
      <div>
        <button onClick={this.toggleDisplaced}>
          toggle demo-one displaced
        </button>
        <button onClick={this.incrementDisplaced}>
          increment demo-one displaced number
        </button>
        <AppendedToBody
          number={this.state.displacedNumber}
          mounted={this.state.displacedMounted}
        />
      </div>
    );
  },
});

ReactDOM.render(<DemoOne />, document.getElementById('demo-one'));
