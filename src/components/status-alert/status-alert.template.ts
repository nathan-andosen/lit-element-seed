import { StatusAlertComponent } from './status-alert.component';
import { html } from 'lit-element';


const headerTemplate = (_this: StatusAlertComponent) =>
html`
  <div class="header">
    <h3 @click="${(e) => { _this.titleClick.emit(); }}">Alert!!!</h3>
    <button @click="${_this.closeClick}">
      <span class="ico-cancel"></span>
    </button>
  </div>
`;



export const mainTemplate = (_this: StatusAlertComponent) =>
html`
  <div class="alert-wrapper">
    ${headerTemplate(_this)}
    <div class="content-body">
      <slot></slot>
    </div>
  </div>
`;


export const footerTemplate = (_this: StatusAlertComponent) => 
html`
  <div class="footer">
    <h6>${_this.footerMessage}</h6>
  </div>
`;