import { StatusAlertComponent } from './status-alert.component';
import { html } from 'lit-element';


const headerTemplate = (component: StatusAlertComponent) =>
html`
  <div class="header">
    <h3 @click="${(e) => { component.titleClick.emit(); }}">
      ${component.titleLbl}
    </h3>
    <button @click="${component.closeClick}">
      <span class="ico-cancel"></span>
    </button>
  </div>
`;



export const mainTemplate = (component: StatusAlertComponent) =>
html`
  <div class="alert-wrapper">
    ${headerTemplate(component)}
    <div class="content-body">
      <slot></slot>
    </div>
  </div>
`;


export const footerTemplate = (component: StatusAlertComponent) =>
html`
  <div class="footer">
    <h6>${component.footerMessage}</h6>
  </div>
`;
