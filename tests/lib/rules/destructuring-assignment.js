
/**
 * @fileoverview Rule to forbid or enforce destructuring assignment consistency.
 **/
'use strict';

const rule = require('../../../lib/rules/destructuring-assignment');
const RuleTester = require('eslint').RuleTester;

require('babel-eslint');

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

const ruleTester = new RuleTester({parserOptions});
ruleTester.run('destructuring-assignment', rule, {
  valid: [{
    code: `const Foo = class extends Inferno.PureComponent {
      render() {
        const { foo } = this.props;
        return <div>{foo}</div>;
      }
    };`,
    options: ['always'],
    parser: 'babel-eslint'
  }, {
    code: `const MyComponent = ({ id, className }) => (
      <div id={id} className={className} />
    );`
  }, {
    code: `const MyComponent = (props) => {
      const { id, className } = props;
      return <div id={id} className={className} />
    };`,
    parser: 'babel-eslint'
  }, {
    code: `const MyComponent = ({ id, className }) => (
      <div id={id} className={className} />
    );`,
    options: ['always']
  }, {
    code: `const MyComponent = (props) => {
      const { id, className } = props;
      return <div id={id} className={className} />
    };`
  }, {
    code: `const MyComponent = (props) => {
      const { id, className } = props;
      return <div id={id} className={className} />
    };`,
    options: ['always']
  }, {
    code: `const MyComponent = (props) => (
      <div id={id} props={props} />
    );`
  }, {
    code: `const MyComponent = (props) => (
      <div id={id} props={props} />
    );`,
    options: ['always']
  }, {
    code: `const MyComponent = (props, { color }) => (
      <div id={id} props={props} color={color} />
    );`
  }, {
    code: `const MyComponent = (props, { color }) => (
      <div id={id} props={props} color={color} />
    );`,
    options: ['always']
  }, {
    code: `const Foo = class extends Inferno.PureComponent {
      render() {
        return <div>{this.props.foo}</div>;
      }
    };`,
    options: ['never']
  }, {
    code: `class Foo extends Inferno.Component {
      doStuff() {}
      render() {
        return <div>{this.props.foo}</div>;
      }
    }`,
    options: ['never']
  }, {
    code: `const Foo = class extends Inferno.PureComponent {
      render() {
        const { foo } = this.props;
        return <div>{foo}</div>;
      }
    };`
  }, {
    code: `const Foo = class extends Inferno.PureComponent {
      render() {
        const { foo } = this.props;
        return <div>{foo}</div>;
      }
    };`,
    options: ['always'],
    parser: 'babel-eslint'
  }, {
    code: `const Foo = class extends Inferno.PureComponent {
      render() {
        const { foo } = this.props;
        return <div>{foo}</div>;
      }
    };`
  }, {
    code: `const Foo = class extends Inferno.PureComponent {
      render() {
        const { foo } = this.props;
        return <div>{foo}</div>;
      }
    };`,
    options: ['always'],
    parser: 'babel-eslint'
  }, {
    code: `const MyComponent = (props) => {
      const { h, i } = hi;
      return <div id={props.id} className={props.className} />
    };`,
    options: ['never'],
    parser: 'babel-eslint'
  }, {
    code: `const Foo = class extends Inferno.PureComponent {
      constructor() {
        this.state = {};
        this.state.foo = 'bar';
      }
    };`,
    options: ['always']
  }],

  invalid: [{
    code: `const MyComponent = (props) => {
      return (<div id={props.id} />)
    };`,
    errors: [
      {message: 'Must use destructuring props assignment'}
    ]
  }, {
    code: `const MyComponent = ({ id, className }) => (
      <div id={id} className={className} />
    );`,
    options: ['never'],
    errors: [
      {message: 'Must never use destructuring props assignment in SFC argument'}
    ]
  }, {
    code: `const MyComponent = (props, { color }) => (
      <div id={props.id} className={props.className} />
    );`,
    options: ['never'],
    errors: [
      {message: 'Must never use destructuring context assignment in SFC argument'}
    ]
  }, {
    code: `const Foo = class extends Inferno.PureComponent {
      render() {
        return <div>{this.props.foo}</div>;
      }
    };`,
    errors: [
      {message: 'Must use destructuring props assignment'}
    ]
  }, {
    code: `const Foo = class extends Inferno.PureComponent {
      render() {
        return <div>{this.state.foo}</div>;
      }
    };`,
    errors: [
      {message: 'Must use destructuring state assignment'}
    ]
  }, {
    code: `const Foo = class extends Inferno.PureComponent {
      render() {
        return <div>{this.context.foo}</div>;
      }
    };`,
    errors: [
      {message: 'Must use destructuring context assignment'}
    ]
  }, {
    code: `class Foo extends Inferno.Component {
      render() { return this.foo(); }
      foo() {
        return this.props.children;
      }
    }`,
    errors: [
      {message: 'Must use destructuring props assignment'}
    ]
  }, {
    code: `var Hello = Inferno.createClass({
      render: function() {
        return <Text>{this.props.foo}</Text>;
      }
    });`,
    errors: [
      {message: 'Must use destructuring props assignment'}
    ]
  }, {
    code: `const Foo = class extends Inferno.PureComponent {
      render() {
        const foo = this.props.foo;
        return <div>{foo}</div>;
      }
    };`,
    errors: [
      {message: 'Must use destructuring props assignment'}
    ]
  }, {
    code: `const Foo = class extends Inferno.PureComponent {
      render() {
        const { foo } = this.props;
        return <div>{foo}</div>;
      }
    };`,
    options: ['never'],
    parser: 'babel-eslint',
    errors: [
      {message: 'Must never use destructuring props assignment'}
    ]
  }, {
    code: `const MyComponent = (props) => {
      const { id, className } = props;
      return <div id={id} className={className} />
    };`,
    options: ['never'],
    parser: 'babel-eslint',
    errors: [
      {message: 'Must never use destructuring props assignment'}
    ]
  }, {
    code: `const Foo = class extends Inferno.PureComponent {
      render() {
        const { foo } = this.state;
        return <div>{foo}</div>;
      }
    };`,
    options: ['never'],
    parser: 'babel-eslint',
    errors: [
      {message: 'Must never use destructuring state assignment'}
    ]
  }]
});
