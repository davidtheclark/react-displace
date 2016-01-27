var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var displace = require('..');
var test = require('tape');

var mainContainer = document.createElement('div');
document.body.appendChild(mainContainer);

var appendToMe = document.createElement('div');
appendToMe.id = 'append-to-me';
document.body.appendChild(appendToMe);

function mountTestElement() {
  var AppendedToNodeInner = React.createClass({
    contextTypes: {
      test: React.PropTypes.string,
    },
    propTypes: {
      status: React.PropTypes.string.isRequired,
    },
    render: function() {
      return <div id='appended-to-node' data-context={this.context.test}>status: {this.props.status}</div>
    },
  });

  var AppendedToNode = displace(AppendedToNodeInner, { renderTo: '#append-to-me' });

  var ElementParent = React.createClass({
    childContextTypes: {
      test: React.PropTypes.string,
    },
    getChildContext: function() {
      return {test: 'This is a test'};
    },
    getInitialState: function() {
      return {
        input: 'nothing',
        displacedMounted: true,
      };
    },
    changeInput: function(e) {
      this.setState({ input: e.target.value });
    },
    toggleMountedness: function() {
      this.setState({ displacedMounted: !this.state.displacedMounted });
    },
    render: function() {
      return (
        <div id='element-parent'>
          <input
            id='atn-status-changer'
            onChange={this.changeInput}
            currentValue={this.state.input}
          />
          <button
            id='atn-toggle-mountedness'
            onClick={this.toggleMountedness}
          />
          <AppendedToNode
            status={this.state.input}
            mounted={this.state.displacedMounted}
          />
        </div>
      )
    },
  });

  ReactDOM.render(<ElementParent />, mainContainer);
  return document.getElementById('appended-to-node');
}

function unmountTestElement() {
  ReactDOM.unmountComponentAtNode(mainContainer);
}

test('appended-to-node displaced element appended to node', function(t) {
  var displacedNode = mountTestElement();
  t.notOk(displacedNode.parentNode === document.getElementById('element-parent'));
  t.equal(displacedNode.parentNode, document.getElementById('append-to-me'));

  unmountTestElement();
  t.end();
});

test('appended-to-node displaced element updates state', function(t) {
  var displacedNode = mountTestElement();
  t.equal(displacedNode.textContent, 'status: nothing');

  var statusChanger = document.getElementById('atn-status-changer');
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
  t.equal(
    document.getElementById('appended-to-node').parentNode,
    document.getElementById('append-to-me')
  );

  var toggleMountednessButton = document.getElementById('atn-toggle-mountedness');
  TestUtils.Simulate.click(toggleMountednessButton);
  t.notOk(document.getElementById('appended-to-node'));

  TestUtils.Simulate.click(toggleMountednessButton);
  t.ok(document.getElementById('appended-to-node'));
  t.equal(
    document.getElementById('appended-to-node').parentNode,
    document.getElementById('append-to-me')
  );
  unmountTestElement();

  t.end();
});

test('appended-to-node displaced component gets context from parent', function(t) {
  mountTestElement();
  t.ok(document.getElementById('appended-to-node'));
  t.equal(
    document.getElementById('appended-to-node').dataset.context,
    'This is a test'
  );
  unmountTestElement();

  t.end();
});
