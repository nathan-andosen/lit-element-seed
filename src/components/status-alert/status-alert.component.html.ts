import { StatusAlertComponent } from './status-alert.component';
import { html } from 'lit-element';

const template = (data: StatusAlertComponent) => html`
  <div>
    <h3>Alert!</h3>
    <p>${data.message}</p>
  </div>
`;

export default template;