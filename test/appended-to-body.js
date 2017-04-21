const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-dom/test-utils');
const displace = require('../dist/displace');
const test = require('tape');

const mainContainer = document.createElement('div');
document.body.appendChild(mainContainer);

function mountTestElement() {
  let AppendedToBody = class AppendedToBody extends React.Component {
    render() {
      return <div id="appended-to-body">status: {this.props.status}</div>;
    }
  };
  AppendedToBody = displace(AppendedToBody);

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

test('appended-to-body displaced element appended to body', function(t) {
  const displacedNode = mountTestElement();
  t.notOk(
    displacedNode.parentNode === document.getElementById('element-parent')
  );
  t.equal(displacedNode.parentNode.tagName, 'DIV');
  t.equal(displacedNode.parentNode.parentNode, document.body);

  unmountTestElement();
  t.end();
});

test('appended-to-body displaced element updates state', function(t) {
  const displacedNode = mountTestElement();
  t.equal(displacedNode.textContent, 'status: nothing');

  const statusChanger = document.getElementById('atb-status-changer');
  statusChanger.value = 'something';
  TestUtils.Simulate.change(statusChanger);
  t.equal(displacedNode.textContent, 'status: something');

  unmountTestElement();
  t.end();
});

test('appended-to-body displaced element unmounts when parent unmounts', function(
  t
) {
  mountTestElement();
  t.ok(document.getElementById('appended-to-body'));
  unmountTestElement();
  t.notOk(document.getElementById('appended-to-body'));

  t.end();
});

test('appended-to-body displaced element unmounts and mounts via `mounted` prop', function(
  t
) {
  mountTestElement();
  t.ok(document.getElementById('appended-to-body'));
  t.equal(
    document.getElementById('appended-to-body').parentNode.parentNode,
    document.body
  );

  const toggleMountednessButton = document.getElementById(
    'atb-toggle-mountedness'
  );
  TestUtils.Simulate.click(toggleMountednessButton);
  t.notOk(document.getElementById('appended-to-body'));

  TestUtils.Simulate.click(toggleMountednessButton);
  t.ok(document.getElementById('appended-to-body'));
  t.equal(
    document.getElementById('appended-to-body').parentNode.parentNode,
    document.body
  );
  unmountTestElement();

  t.end();
});

test('appended-to-body displaced element cleans up its container div when it unmounts', function(
  t
) {
  mountTestElement();
  t.ok(document.getElementById('appended-to-body'));

  const containerDiv = document.getElementById('appended-to-body').parentNode;
  t.equal(containerDiv.parentNode, document.body);

  unmountTestElement();
  t.equal(containerDiv.parentNode, null);

  t.end();
});
