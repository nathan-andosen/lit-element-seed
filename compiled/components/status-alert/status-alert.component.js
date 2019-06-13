var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property, unsafeCSS } from 'lit-element';
import style from './status-alert.component.scss';
import { mainTemplate, footerTemplate } from './status-alert.component.template';
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
