var React = require('react/addons');
var displace = require('..');
var test = require('tape');

var TestUtils = React.addons.TestUtils;

var mainContainer = document.createElement('div');
document.body.appendChild(mainContainer);

function mountTestElement() {
  var AppendedToBody = displace(React.createClass({
    propTypes: {
      status: React.PropTypes.string.isRequired,
    },
    render: function() {
      return <div id='appended-to-body'>status: {this.props.status}</div>
    },
  }));

  var ElementParent = React.createClass({
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
            id='atb-status-changer'
            onChange={this.changeInput}
            currentValue={this.state.input}
          />
          <button
            id='atb-toggle-mountedness'
            onClick={this.toggleMountedness}
          />
          <AppendedToBody
            status={this.state.input}
            mounted={this.state.displacedMounted}
          />
        </div>
      )
    },
  });

  var elementParentElement = React.render(<ElementParent />, mainContainer);
  var appendedToBodyElement = TestUtils.findRenderedComponentWithType(elementParentElement, AppendedToBody);
  return document.getElementById('appended-to-body');
}

function unmountTestElement() {
  React.unmountComponentAtNode(mainContainer);
}

test('appended-to-body displaced element appended to body', function(t) {
  var displacedNode = mountTestElement();
  t.notOk(displacedNode.parentNode === document.getElementById('element-parent'));
  t.equal(displacedNode.parentNode.tagName, 'DIV');
  t.equal(displacedNode.parentNode.parentNode, document.body);

  unmountTestElement();
  t.end();
});

test('appended-to-body displaced element updates state', function(t) {
  var displacedNode = mountTestElement();
  t.equal(displacedNode.textContent, 'status: nothing');

  var statusChanger = document.getElementById('atb-status-changer');
  statusChanger.value = 'something';
  TestUtils.Simulate.change(statusChanger);
  t.equal(displacedNode.textContent, 'status: something');

  unmountTestElement();
  t.end();
});

test('appended-to-body displaced element unmounts when parent unmounts', function(t) {
  mountTestElement();
  t.ok(document.getElementById('appended-to-body'));
  unmountTestElement();
  t.notOk(document.getElementById('appended-to-body'));

  t.end();
});

test('appended-to-body displaced element unmounts and mounts via `mounted` prop', function(t) {
  var displacedNode = mountTestElement();
  t.ok(document.getElementById('appended-to-body'));
  t.equal(document.getElementById('appended-to-body').parentNode.parentNode, document.body);

  var toggleMountednessButton = document.getElementById('atb-toggle-mountedness');
  TestUtils.Simulate.click(toggleMountednessButton);
  t.notOk(document.getElementById('appended-to-body'));

  TestUtils.Simulate.click(toggleMountednessButton);
  t.ok(document.getElementById('appended-to-body'));
  t.equal(document.getElementById('appended-to-body').parentNode.parentNode, document.body);
  unmountTestElement();

  t.end();
});
