import { StatusAlertComponent } from './status-alert.component';
import { html } from 'lit-element';


const headerTemplate = 
html`
  <h3>Alert!</h3>
`;


export const mainTemplate = (data: StatusAlertComponent) => 
html`
  <div>
    ${headerTemplate}
    <span class="ico-cancel"></span>
    <p>${data.message}</p>
    <slot></slot>
  </div>
`;


export const footerTemplate = (data: StatusAlertComponent) => 
html`
  <h6>${data.footerMessage}</h6>
`;