const React = require('react');
const ReactDOM = require('react-dom');
const displace = require('../../src/displace');

let AppendedToNode = class AppendedToNode extends React.Component {
  render() {
    return (
      <div className="container">
        <h3>
          Demo Two's Displaced Element
        </h3>
        <p>
          I'm appended to a specific node specified by the selector '#demo-two-displaced'.
        </p>
        <p>
          And I still update correctly.
          You've clicked "increment demo-two displaced number"
          {' '}
          {this.props.number}
          {' '}
          time(s).
        </p>
      </div>
    );
  }
};

AppendedToNode = displace(AppendedToNode, { renderTo: '#demo-two-displaced' });

class DemoTwo extends React.Component {
  state = {
    displacedNumber: 0,
    displacedMounted: false
  };

  toggleDisplaced = () => {
    this.setState({ displacedMounted: !this.state.displacedMounted });
  };

  incrementDisplaced = () => {
    this.setState({ displacedNumber: this.state.displacedNumber + 1 });
  };

  render() {
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
  }
}

ReactDOM.render(<DemoTwo />, document.getElementById('demo-two'));
