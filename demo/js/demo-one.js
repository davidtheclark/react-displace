const React = require('react');
const ReactDOM = require('react-dom');
const displace = require('../../src/displace');

let AppendedToBody = displace(
  class AppendedToBody extends React.Component {
    render() {
      return (
        <div className="container">
          <h2>
            Demo One's Displaced Element
          </h2>
          <p>
            I'm appended to the body rather than my parent React element.
          </p>
          <p>
            And I still update correctly.
            You've clicked "increment demo-one displaced number"
            {' '}
            {this.props.number}
            {' '}
            time(s).
          </p>
        </div>
      );
    }
  }
);

class DemoOne extends React.Component {
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
  }
}

ReactDOM.render(<DemoOne />, document.getElementById('demo-one'));
