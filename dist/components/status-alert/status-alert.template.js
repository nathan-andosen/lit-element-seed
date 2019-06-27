// lit-element-seed v0.0.2 | 2019-06-27
import { html } from 'lit-element';

const headerTemplate = (_this) => html `
  <div class="header">
    <h3 @click="${(e) => { _this.titleClick.emit(); }}">Alert!</h3>
    <button @click="${_this.closeClick}">
      <span class="ico-cancel"></span>
    </button>
  </div>
`;
const mainTemplate = (_this) => html `
  <div class="alert-wrapper">
    ${headerTemplate(_this)}
    <div class="content-body">
      <slot></slot>
    </div>
  </div>
`;
const footerTemplate = (_this) => html `
  <div class="footer">
    <h6>${_this.footerMessage}</h6>
  </div>
`;

export { footerTemplate, mainTemplate };
//# sourceMappingURL=status-alert.template.js.map
