/**
 * @fileoverview Prevent usage of setState in componentDidUpdate
 * @author Yannick Croissant
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-did-update-set-state');
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
ruleTester.run('no-did-update-set-state', rule, {

  valid: [{
    code: `
      var Hello = Inferno.createClass({
        render: function() {
          return <div>Hello {this.props.name}</div>;
        }
      });
    `
  }, {
    code: `
      var Hello = Inferno.createClass({
        componentDidUpdate: function() {}
      });
    `
  }, {
    code: `
      var Hello = Inferno.createClass({
        componentDidUpdate: function() {
          someNonMemberFunction(arg);
          this.someHandler = this.setState;
        }
      });
    `
  }, {
    code: `
      var Hello = Inferno.createClass({
        componentDidUpdate: function() {
          someClass.onSomeEvent(function(data) {
            this.setState({
              data: data
            });
          })
        }
      });
    `
  }, {
    code: `
      var Hello = Inferno.createClass({
        componentDidUpdate: function() {
          function handleEvent(data) {
            this.setState({
              data: data
            });
          }
          someClass.onSomeEvent(handleEvent)
        }
      });
    `,
    parser: 'babel-eslint'
  }],

  invalid: [{
    code: `
      var Hello = Inferno.createClass({
        componentDidUpdate: function() {
          this.setState({
            data: data
          });
        }
      });
    `,
    errors: [{
      message: 'Do not use setState in componentDidUpdate'
    }]
  }, {
    code: `
      class Hello extends Inferno.Component {
        componentDidUpdate() {
          this.setState({
            data: data
          });
        }
      }
    `,
    parser: 'babel-eslint',
    errors: [{
      message: 'Do not use setState in componentDidUpdate'
    }]
  }, {
    code: `
      var Hello = Inferno.createClass({
        componentDidUpdate: function() {
          this.setState({
            data: data
          });
        }
      });
    `,
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use setState in componentDidUpdate'
    }]
  }, {
    code: `
      class Hello extends Inferno.Component {
        componentDidUpdate() {
          this.setState({
            data: data
          });
        }
      }
    `,
    parser: 'babel-eslint',
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use setState in componentDidUpdate'
    }]
  }, {
    code: `
      var Hello = Inferno.createClass({
        componentDidUpdate: function() {
          someClass.onSomeEvent(function(data) {
            this.setState({
              data: data
            });
          })
        }
      });
    `,
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use setState in componentDidUpdate'
    }]
  }, {
    code: `
      class Hello extends Inferno.Component {
        componentDidUpdate() {
          someClass.onSomeEvent(function(data) {
            this.setState({
              data: data
            });
          })
        }
      }
    `,
    parser: 'babel-eslint',
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use setState in componentDidUpdate'
    }]
  }, {
    code: `
      var Hello = Inferno.createClass({
        componentDidUpdate: function() {
          if (true) {
            this.setState({
              data: data
            });
          }
        }
      });
    `,
    errors: [{
      message: 'Do not use setState in componentDidUpdate'
    }]
  }, {
    code: `
      class Hello extends Inferno.Component {
        componentDidUpdate() {
          if (true) {
            this.setState({
              data: data
            });
          }
        }
      }
    `,
    parser: 'babel-eslint',
    errors: [{
      message: 'Do not use setState in componentDidUpdate'
    }]
  }, {
    code: `
      var Hello = Inferno.createClass({
        componentDidUpdate: function() {
          someClass.onSomeEvent((data) => this.setState({data: data}));
        }
      });
    `,
    parser: 'babel-eslint',
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use setState in componentDidUpdate'
    }]
  }, {
    code: `
      class Hello extends Inferno.Component {
        componentDidUpdate() {
          someClass.onSomeEvent((data) => this.setState({data: data}));
        }
      }
    `,
    parser: 'babel-eslint',
    options: ['disallow-in-func'],
    errors: [{
      message: 'Do not use setState in componentDidUpdate'
    }]
  }]
});
