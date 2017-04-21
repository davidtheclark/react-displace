const React = require('react');
const PropTypes = require('prop-types');
const ReactDOM = require('react-dom');
const TestUtils = require('react-dom/test-utils');
const displace = require('../dist/displace');
const test = require('tape');

const mainContainer = document.createElement('div');
document.body.appendChild(mainContainer);

const appendToMe = document.createElement('div');
appendToMe.id = 'append-to-me';
document.body.appendChild(appendToMe);

function mountTestElement() {
  let AppendedToNode = class AppendedToNode extends React.Component {
    static contextTypes = {
      test: PropTypes.string
    };

    render() {
      return <div id="appended-to-node" data-context={this.context.test}>status: {this.props.status}</div>;
    }
  };
  AppendedToNode = displace(AppendedToNode, { renderTo: '#append-to-me' });

  let ElementParent = class ElementParent extends React.Component {
    static childContextTypes = {
      test: PropTypes.string
    };

    state = {
      input: 'nothing',
      displacedMounted: true
    };

    getChildContext() {
      return { test: 'This is a test' };
    }

    changeInput = (e) => {
      this.setState({ input: e.target.value });
    }

    toggleMountedness = () => {
      this.setState({ displacedMounted: !this.state.displacedMounted });
    }

    render() {
      return (
        <div id="element-parent">
          <input id="atn-status-changer" onChange={this.changeInput} value={this.state.input} />
          <button id="atn-toggle-mountedness" onClick={this.toggleMountedness} />
          <AppendedToNode status={this.state.input} mounted={this.state.displacedMounted} />
        </div>
      );
    }
  };
  ElementParent = displace(ElementParent);

  ReactDOM.render(<ElementParent />, mainContainer);
  return document.getElementById('appended-to-node');
}

function unmountTestElement() {
  ReactDOM.unmountComponentAtNode(mainContainer);
}

test('appended-to-node displaced element appended to node', function(t) {
  const displacedNode = mountTestElement();
  t.notOk(displacedNode.parentNode === document.getElementById('element-parent'));
  t.equal(displacedNode.parentNode, document.getElementById('append-to-me'));

  unmountTestElement();
  t.end();
});

test('appended-to-node displaced element updates state', function(t) {
  const displacedNode = mountTestElement();
  t.equal(displacedNode.textContent, 'status: nothing');

  const statusChanger = document.getElementById('atn-status-changer');
  statusChanger.value = 'something';
  TestUtils.Simulate.change(statusChanger);
  t.equal(displacedNode.textContent, 'status: something');

  unmountTestElement();
  t.end();
});

test('appended-to-node displaced element unmounts when parent unmounts', function(t) {
  mountTestElement();
  t.ok(document.getElementById('appended-to-node'));
  unmountTestElement();
  t.notOk(document.getElementById('appended-to-node'));

  t.end();
});

test('appended-to-node displaced element unmounts and mounts via `mounted` prop', function(t) {
  mountTestElement();
  t.ok(document.getElementById('appended-to-node'));
  t.equal(document.getElementById('appended-to-node').parentNode, document.getElementById('append-to-me'));

  const toggleMountednessButton = document.getElementById('atn-toggle-mountedness');
  TestUtils.Simulate.click(toggleMountednessButton);
  t.notOk(document.getElementById('appended-to-node'));

  TestUtils.Simulate.click(toggleMountednessButton);
  t.ok(document.getElementById('appended-to-node'));
  t.equal(document.getElementById('appended-to-node').parentNode, document.getElementById('append-to-me'));
  unmountTestElement();

  t.end();
});

test('appended-to-node displaced component gets context from parent', function(t) {
  mountTestElement();
  t.ok(document.getElementById('appended-to-node'));
  t.equal(document.getElementById('appended-to-node').dataset.context, 'This is a test');
  unmountTestElement();

  t.end();
});
