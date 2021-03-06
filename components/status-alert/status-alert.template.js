// lit-element-seed v0.0.1 | 2019-11-24
import { html } from 'lit-element';

const headerTemplate = (component) => html `
  <div class="header">
    <h3 @click="${(e) => { component.titleClick.emit(); }}">
      ${component.titleLbl}
    </h3>
    <button @click="${component.closeClick}">
      <span class="ico-cancel"></span>
    </button>
  </div>
`;
const mainTemplate = (component) => html `
  <div class="alert-wrapper">
    ${headerTemplate(component)}
    <div class="content-body">
      <slot></slot>
    </div>
  </div>
`;
const footerTemplate = (component) => html `
  <div class="footer">
    <h6>${component.footerMessage}</h6>
  </div>
`;
//# sourceMappingURL=status-alert.template.js.map

export { footerTemplate, mainTemplate };
