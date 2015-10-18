var React = require('react');
var ReactDOM = require('react-dom');
var displace = require('../../');

var AppendedToNodeInner = React.createClass({
  propTypes: {
    number: React.PropTypes.number.isRequired,
  },

  render: function() {
    return (
      <div className='container'>
        <h3>
          Demo Three's Displaced Element
        </h3>
        <p>
          I'm appended to a specific node that is passed as a node (not selector string).
        </p>
        <p>
          And I still update correctly.
          You've clicked "increment demo-three displaced number" {this.props.number} time(s).
        </p>
      </div>
    )
  },
});

var AppendedToNode = displace(AppendedToNodeInner, {
  renderTo: document.getElementById('demo-three-displaced'),
});

var DemoThree = React.createClass({
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
          toggle demo-three displaced
        </button>
        <button onClick={this.incrementDisplaced}>
          increment demo-three displaced number
        </button>
        <AppendedToNode
          number={this.state.displacedNumber}
          mounted={this.state.displacedMounted}
        />
      </div>
    );
  },
});

ReactDOM.render(<DemoThree />, document.getElementById('demo-three'));
