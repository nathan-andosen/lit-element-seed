import { _ as __decorate } from '../chunks/chunk-abb76639.js';
import { html, LitElement, unsafeCSS, property, customElement } from 'lit-element';

var css = ":host {\n  display: block; }\n\np {\n  background-color: #ff9900;\n  display: flex;\n  align-items: center;\n  padding: 1rem; }\n";

const headerTemplate = html `
  <h3>Alert!</h3>
`;
const mainTemplate = (data) => html `
  <div>
    ${headerTemplate}
    <p>${data.message}</p>
  </div>
`;
const footerTemplate = (data) => html `
  <h6>${data.footerMessage}</h6>
`;

let StatusAlertComponent = class StatusAlertComponent extends LitElement {
    constructor() {
        super();
        this.message = '';
        this.footerMessage = 'I\'m the footer';
        this.height = 50;
    }
    static get styles() {
        return unsafeCSS(css);
    }
    render() {
        return html `
      ${mainTemplate(this)}
      ${footerTemplate(this)}
    `;
    }
};
__decorate([
    property()
], StatusAlertComponent.prototype, "message", void 0);
__decorate([
    property()
], StatusAlertComponent.prototype, "footerMessage", void 0);
__decorate([
    property()
], StatusAlertComponent.prototype, "height", void 0);
StatusAlertComponent = __decorate([
    customElement('status-alert')
], StatusAlertComponent);

export { StatusAlertComponent };
