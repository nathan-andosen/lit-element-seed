// lit-element-seed v0.0.1 | 2019-11-24
import { __decorate } from 'tslib';
import { LitElement, html, property, customElement } from 'lit-element';
import style from './status-alert.style.js';
import fontFaceStyle from './assets/icon-font/font-face.js';
import { injectStyleIntoHead } from '../utilities/inject-style-into-head.js';
import '../utilities/index.js';
import { mainTemplate, footerTemplate } from './status-alert.template.js';
import { event } from '@thenja/decorators';

let StatusAlertComponent = class StatusAlertComponent extends LitElement {
    /**
     * Creates an instance of StatusAlertComponent.
     *
     * @memberof StatusAlertComponent
     */
    constructor() {
        super();
        this.titleLbl = 'Alert!';
        this.footerMessage = 'I\'m the footer';
        this.height = 50;
        injectStyleIntoHead(fontFaceStyle);
    }
    connectedCallback() {
        // if you use custom element functions / hooks, you must use super to call
        // the parents hook as well
        super.connectedCallback();
    }
    /**
     * Use styles this way in your component if you want to take advantage
     * of lit-element using Constructable Stylesheets. This means the browser
     * will parse the style sheet only once and re-use it for other instances
     * of your component, great for performance.
     * However, if you inject your styles this way, it makes it harder to debug
     * in the browser.
     */
    // static get styles() {
    //   return unsafeCSS(style);
    // }
    /**
     * Render your html templates.
     *
     * Style - You can either inject your styles in here, or use the
     * static get styles() getter above. If you inject them here, the browser
     * will parse the css for each instance of all the components on your page.
     */
    render() {
        return html `
      <style>
        ${style}
      </style>
      ${mainTemplate(this)}
      ${footerTemplate(this)}
    `;
    }
    closeClick(e) {
        this.close.emit();
        this.titleLbl = 'Close clicked';
        this.requestUpdate();
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

export { StatusAlertComponent };
