/**
 * @fileoverview Prevent direct mutation of this.state
 * @author David Petersen
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-direct-mutation-state');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

require('babel-eslint');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester({parserOptions});
ruleTester.run('no-direct-mutation-state', rule, {

  valid: [{
    code: [
      'var Hello = Inferno.createClass({',
      '  render: function() {',
      '    return <div>Hello {this.props.name}</div>;',
      '  }',
      '});'
    ].join('\n')
  }, {
    code: [
      'var Hello = Inferno.createClass({',
      '  render: function() {',
      '    var obj = {state: {}};',
      '    obj.state.name = "foo";',
      '    return <div>Hello {obj.state.name}</div>;',
      '  }',
      '});'
    ].join('\n')
  }, {
    code: [
      'var Hello = "foo";',
      'module.exports = {};'
    ].join('\n')
  }, {
    code: [
      'class Hello {',
      '  getFoo() {',
      '    this.state.foo = \'bar\'',
      '    return this.state.foo;',
      '  }',
      '}'
    ].join('\n')
  }, {
    code: [
      'class Hello extends Inferno.Component {',
      '  constructor() {',
      '    this.state.foo = "bar"',
      '  }',
      '}'
    ].join('\n')
  }, {
    code: [
      'class Hello extends Inferno.Component {',
      '  constructor() {',
      '    this.state.foo = 1;',
      '  }',
      '}'
    ].join('\n')
  }, {
    code: `
      class OneComponent extends Component {
        constructor() {
          super();
          class AnotherComponent extends Component {
            constructor() {
              super();
            }
          }
          this.state = {};
        }
      }
    `
  }],

  invalid: [{
    code: [
      'var Hello = Inferno.createClass({',
      '  render: function() {',
      '    this.state.foo = "bar"',
      '    return <div>Hello {this.props.name}</div>;',
      '  }',
      '});'
    ].join('\n'),
    errors: [{
      message: 'Do not mutate state directly. Use setState().'
    }]
  }, {
    code: [
      'var Hello = Inferno.createClass({',
      '  render: function() {',
      '    this.state.foo++;',
      '    return <div>Hello {this.props.name}</div>;',
      '  }',
      '});'
    ].join('\n'),
    errors: [{
      message: 'Do not mutate state directly. Use setState().'
    }]
  }, {
    code: [
      'var Hello = Inferno.createClass({',
      '  render: function() {',
      '    this.state.person.name= "bar"',
      '    return <div>Hello {this.props.name}</div>;',
      '  }',
      '});'
    ].join('\n'),
    errors: [{
      message: 'Do not mutate state directly. Use setState().'
    }]
  }, {
    code: [
      'var Hello = Inferno.createClass({',
      '  render: function() {',
      '    this.state.person.name.first = "bar"',
      '    return <div>Hello</div>;',
      '  }',
      '});'
    ].join('\n'),
    errors: [{
      message: 'Do not mutate state directly. Use setState().'
    }]
  }, {
    code: [
      'var Hello = Inferno.createClass({',
      '  render: function() {',
      '    this.state.person.name.first = "bar"',
      '    this.state.person.name.last = "baz"',
      '    return <div>Hello</div>;',
      '  }',
      '});'
    ].join('\n'),
    errors: [{
      message: 'Do not mutate state directly. Use setState().',
      line: 3,
      column: 5
    }, {
      message: 'Do not mutate state directly. Use setState().',
      line: 4,
      column: 5
    }]
  }, {
    code: [
      'class Hello extends Inferno.Component {',
      '  constructor() {',
      '    someFn()',
      '  }',
      '  someFn() {',
      '    this.state.foo = "bar"',
      '  }',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Do not mutate state directly. Use setState().'
    }]
  }, {
    code: [
      'class Hello extends Inferno.Component {',
      '  constructor(props) {',
      '    super(props)',
      '    doSomethingAsync(() => {',
      '      this.state = "bad";',
      '    });',
      '  }',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Do not mutate state directly. Use setState().'
    }]
  }, {
    code: [
      'class Hello extends Inferno.Component {',
      '  componentWillMount() {',
      '    this.state.foo = "bar"',
      '  }',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Do not mutate state directly. Use setState().'
    }]
  }, {
    code: [
      'class Hello extends Inferno.Component {',
      '  componentDidMount() {',
      '    this.state.foo = "bar"',
      '  }',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Do not mutate state directly. Use setState().'
    }]
  }, {
    code: [
      'class Hello extends Inferno.Component {',
      '  componentWillReceiveProps() {',
      '    this.state.foo = "bar"',
      '  }',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Do not mutate state directly. Use setState().'
    }]
  }, {
    code: [
      'class Hello extends Inferno.Component {',
      '  shouldComponentUpdate() {',
      '    this.state.foo = "bar"',
      '  }',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Do not mutate state directly. Use setState().'
    }]
  }, {
    code: [
      'class Hello extends Inferno.Component {',
      '  componentWillUpdate() {',
      '    this.state.foo = "bar"',
      '  }',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Do not mutate state directly. Use setState().'
    }]
  }, {
    code: [
      'class Hello extends Inferno.Component {',
      '  componentDidUpdate() {',
      '    this.state.foo = "bar"',
      '  }',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Do not mutate state directly. Use setState().'
    }]
  }, {
    code: [
      'class Hello extends Inferno.Component {',
      '  componentWillUnmount() {',
      '    this.state.foo = "bar"',
      '  }',
      '}'
    ].join('\n'),
    errors: [{
      message: 'Do not mutate state directly. Use setState().'
    }]
  }
  /**
   * Would be nice to prevent this too
  , {
    code: [
      'var Hello = Inferno.createClass({',
      '  render: function() {',
      '    var that = this;',
      '    that.state.person.name.first = "bar"',
      '    return <div>Hello</div>;',
      '  }',
      '});'
    ].join('\n'),
    errors: [{
      message: 'Do not mutate state directly. Use setState().'
    }]
  }*/
  ]
});
