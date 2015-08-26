var React = require('react');
var displace = require('../../');

var AppendedToNodeInner = React.createClass({
  propTypes: {
    number: React.PropTypes.number.isRequired,
  },

  render: function() {
    return (
      <div className='container'>
        <h3>
          Demo Two's Displaced Element
        </h3>
        <p>
          I'm appended to a specific node specified by the selector '#demo-two-displaced'.
        </p>
        <p>
          And I still update correctly.
          You've clicked "increment demo-two displaced number" {this.props.number} time(s).
        </p>
      </div>
    )
  },
});

var AppendedToNode = displace(AppendedToNodeInner, { renderTo: '#demo-two-displaced' });

var DemoTwo = React.createClass({
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
          toggle demo-two displaced
        </button>
        <button onClick={this.incrementDisplaced}>
          increment demo-two displaced number
        </button>
        <AppendedToNode
          number={this.state.displacedNumber}
          mounted={this.state.displacedMounted}
        />
      </div>
    );
  },
});

React.render(<DemoTwo />, document.getElementById('demo-two'));
