import { __decorate } from 'tslib';
import { LitElement, unsafeCSS, html, property, customElement } from 'lit-element';
import style from './status-alert.style.js';
import { mainTemplate, footerTemplate } from './status-alert.template.js';
import { injectFontFaceStyle } from './inject-font-face-style.js';
import { event } from '../../decorators/event.js';

let StatusAlertComponent = class StatusAlertComponent extends LitElement {
    constructor() {
        super();
        this.footerMessage = 'I\'m the footer';
        this.height = 50;
        injectFontFaceStyle();
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
    closeClick(e) {
        this.close.emit();
    }
};
__decorate([
    property()
], StatusAlertComponent.prototype, "footerMessage", void 0);
__decorate([
    property()
], StatusAlertComponent.prototype, "height", void 0);
__decorate([
    event()
], StatusAlertComponent.prototype, "close", void 0);
__decorate([
    event()
], StatusAlertComponent.prototype, "titleClick", void 0);
StatusAlertComponent = __decorate([
    customElement('status-alert')
], StatusAlertComponent);
//# sourceMappingURL=status-alert.component.js.map

export { StatusAlertComponent };
