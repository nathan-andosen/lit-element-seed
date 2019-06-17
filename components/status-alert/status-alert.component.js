import { __decorate } from 'tslib';
import { LitElement, unsafeCSS, html, property, customElement } from 'lit-element';
import style from './status-alert.style.js';
import { mainTemplate, footerTemplate } from './status-alert.template.js';

let StatusAlertComponent = class StatusAlertComponent extends LitElement {
    constructor() {
        super();
        this.message = '';
        this.footerMessage = 'I\'m the footer';
        this.height = 50;
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
