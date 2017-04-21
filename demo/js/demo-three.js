const React = require('react');
const ReactDOM = require('react-dom');
const displace = require('../../dist/displace');

let AppendedToNode = class AppendedToNode extends React.Component {
  render() {
    return (
      <div className="container">
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
    );
  }
};

AppendedToNode = displace(AppendedToNode, {
  renderTo: document.getElementById('demo-three-displaced')
});

class DemoThree extends React.Component {
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
          toggle demo-three displaced
        </button>
        <button onClick={this.incrementDisplaced}>
          increment demo-three displaced number
        </button>
        <AppendedToNode number={this.state.displacedNumber} mounted={this.state.displacedMounted} />
      </div>
    );
  }
}

ReactDOM.render(<DemoThree />, document.getElementById('demo-three'));
