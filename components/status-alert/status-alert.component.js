import { __decorate } from 'tslib';
import { LitElement, unsafeCSS, html, property, customElement } from 'lit-element';
import style from './status-alert.style.js';
import { mainTemplate, footerTemplate } from './status-alert.template.js';
import { injectStyle } from './inject-style.js';

let StatusAlertComponent = class StatusAlertComponent extends LitElement {
    constructor() {
        super();
        // Uncomment this if you do not want to create a shadow dom
        // createRenderRoot() {
        //   return this;
        // }
        this.message = '';
        this.footerMessage = 'I\'m the footer';
        this.height = 50;
        injectStyle();
    }
    static get styles() {
        return unsafeCSS(style);
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
