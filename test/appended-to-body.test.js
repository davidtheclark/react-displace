const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-dom/test-utils');
const displace = require('../src/displace');

const mainContainer = document.createElement('div');
document.body.appendChild(mainContainer);

function mountTestElement() {
  const AppendedToBodyInner = class AppendedToBodyInner
    extends React.Component {
    render() {
      return <div id="appended-to-body">status: {this.props.status}</div>;
    }
  };
  const AppendedToBody = displace(AppendedToBodyInner);
  expect(AppendedToBody.WrappedComponent).toBe(AppendedToBodyInner);

  class ElementParent extends React.Component {
    state = {
      input: 'nothing',
      displacedMounted: true
    };

    changeInput = e => {
      this.setState({ input: e.target.value });
    };

    toggleMountedness = () => {
      this.setState({ displacedMounted: !this.state.displacedMounted });
    };

    render() {
      return (
        <div id="element-parent">
          <input
            id="atb-status-changer"
            onChange={this.changeInput}
            value={this.state.input}
          />
          <button
            id="atb-toggle-mountedness"
            onClick={this.toggleMountedness}
          />
          <AppendedToBody
            status={this.state.input}
            mounted={this.state.displacedMounted}
          />
        </div>
      );
    }
  }

  ReactDOM.render(<ElementParent />, mainContainer);
  return document.getElementById('appended-to-body');
}

function unmountTestElement() {
  ReactDOM.unmountComponentAtNode(mainContainer);
}

describe('appended to body', () => {
  let displacedNode;

  beforeEach(() => {
    displacedNode = mountTestElement();
  });

  afterEach(() => {
    unmountTestElement();
  });

  test('appended-to-body displaced element appended to body', () => {
    expect(
      displacedNode.parentNode === document.getElementById('element-parent')
    ).toBeFalsy();
    expect(displacedNode.parentNode.tagName).toBe('DIV');
    expect(displacedNode.parentNode.parentNode).toBe(document.body);
  });

  test('appended-to-body displaced element updates state', () => {
    expect(displacedNode.textContent).toBe('status: nothing');

    const statusChanger = document.getElementById('atb-status-changer');
    statusChanger.value = 'something';
    TestUtils.Simulate.change(statusChanger);
    expect(displacedNode.textContent).toBe('status: something');
  });

  test('appended-to-body displaced element unmounts when parent unmounts', () => {
    expect(document.getElementById('appended-to-body')).toBeTruthy();
    unmountTestElement();
    expect(document.getElementById('appended-to-body')).toBeFalsy();
  });

  test('appended-to-body displaced element unmounts and mounts via `mounted` prop', () => {
    expect(document.getElementById('appended-to-body')).toBeTruthy();
    expect(
      document.getElementById('appended-to-body').parentNode.parentNode
    ).toBe(document.body);

    const toggleMountednessButton = document.getElementById(
      'atb-toggle-mountedness'
    );
    TestUtils.Simulate.click(toggleMountednessButton);
    expect(document.getElementById('appended-to-body')).toBeFalsy();

    TestUtils.Simulate.click(toggleMountednessButton);
    expect(document.getElementById('appended-to-body')).toBeTruthy();
    expect(
      document.getElementById('appended-to-body').parentNode.parentNode
    ).toBe(document.body);
  });

  test('appended-to-body displaced element cleans up its container div when it unmounts', () => {
    expect(document.getElementById('appended-to-body')).toBeTruthy();

    const containerDiv = document.getElementById('appended-to-body').parentNode;
    expect(containerDiv.parentNode).toBe(document.body);

    unmountTestElement();
    expect(containerDiv.parentNode).toBe(null);
  });
});
