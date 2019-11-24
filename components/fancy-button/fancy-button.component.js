// lit-element-seed v0.0.1 | 2019-11-24
import { __decorate } from 'tslib';
import { LitElement, css, html, customElement } from 'lit-element';

let FancyButtonComponent = class FancyButtonComponent extends LitElement {
    static get styles() {
        return css `
      button {
        padding: 1rem;
        background-color: #ff9900;
      }
    `;
    }
    render() {
        return html `
      <button>
        <slot></slot>
      </button>
    `;
    }
};
FancyButtonComponent = __decorate([
    customElement('fancy-button')
], FancyButtonComponent);
//# sourceMappingURL=fancy-button.component.js.map

export { FancyButtonComponent };
