import { LitElement, html, customElement, property } from 'lit-element';

@customElement('status-alert')
export class StatusAlertComponent extends LitElement {

  constructor() {
    super();
  }

  @property() message = '';

  render() {
    return html`
      <div>
        <h3>Alert!</h3>
        <p>${this.message}</p>
      </div>
    `;
  }
}
