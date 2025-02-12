/**
 * @fileoverview Tests for void-dom-elements-no-children
 * @author Joe Lencioni
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const rule = require('../../../lib/rules/void-dom-elements-no-children');
const RuleTester = require('eslint').RuleTester;

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true
  }
};

function errorMessage(elementName) {
  return `Void DOM element <${elementName} /> cannot receive children.`;
}

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester({parserOptions});
ruleTester.run('void-dom-elements-no-children', rule, {
  valid: [
    {
      code: '<div>Foo</div>;'
    },
    {
      code: '<div children="Foo" />;'
    },
    {
      code: '<div dangerouslySetInnerHTML={{ __html: "Foo" }} />;'
    },
    {
      code: 'Inferno.createElement("div", {}, "Foo");'
    },
    {
      code: 'Inferno.createElement("div", { children: "Foo" });'
    },
    {
      code: 'Inferno.createElement("div", { dangerouslySetInnerHTML: { __html: "Foo" } });'
    },
    {
      code: 'document.createElement("img");'
    },
    {
      code: 'Inferno.createElement("img");'
    }, {
      code: 'Inferno.createElement();'
    }, {
      code: 'document.createElement();'
    }, {
      code: `
        const props = {};
        Inferno.createElement("img", props);
      `
    }, {
      code: `
        import Inferno, {createElement} from "inferno-create-element";
        createElement("div");
      `
    }, {
      code: `
        import Inferno, {createElement} from "inferno-create-element";
        createElement("img");
      `
    }, {
      code: `
        import createElement from "inferno-create-element";
        import Component from "inferno-component";
        
        class Button extends PureComponent {
          handleClick(ev) {
            ev.preventDefault();
          }
          render() {
            return <div onClick={this.handleClick}>Hello</div>;
          }
        }
      `
    }
  ],
  invalid: [
    {
      code: '<br>Foo</br>;',
      errors: [{message: errorMessage('br')}]
    },
    {
      code: '<br children="Foo" />;',
      errors: [{message: errorMessage('br')}]
    },
    {
      code: '<img {...props} children="Foo" />;',
      errors: [{message: errorMessage('img')}]
    },
    {
      code: '<br dangerouslySetInnerHTML={{ __html: "Foo" }} />;',
      errors: [{message: errorMessage('br')}]
    },
    {
      code: 'Inferno.createElement("br", {}, "Foo");',
      errors: [{message: errorMessage('br')}]
    },
    {
      code: 'Inferno.createElement("br", { children: "Foo" });',
      errors: [{message: errorMessage('br')}]
    },
    {
      code: 'Inferno.createElement("br", { dangerouslySetInnerHTML: { __html: "Foo" } });',
      errors: [{message: errorMessage('br')}]
    },
    {
      code: `
        import Inferno, {createElement} from "inferno-create-element";
        createElement("img", {}, "Foo");
      `,
      errors: [{message: errorMessage('img')}],
      parser: 'babel-eslint'
    },
    {
      code: `
        import Inferno, {createElement} from "inferno-create-element";
        createElement("img", { children: "Foo" });
      `,
      errors: [{message: errorMessage('img')}],
      parser: 'babel-eslint'
    },
    {
      code: `
        import Inferno, {createElement} from "inferno-create-element";
        createElement("img", { dangerouslySetInnerHTML: { __html: "Foo" } });
      `,
      errors: [{message: errorMessage('img')}],
      parser: 'babel-eslint'
    }
  ]
});
