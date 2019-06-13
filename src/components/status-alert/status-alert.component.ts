import {
  LitElement,
  html,
  customElement,
  property,
  css,
  unsafeCSS
} from 'lit-element';
import style from './status-alert.component.scss';
import { mainTemplate, footerTemplate } from './status-alert.component.template';

@customElement('status-alert')
export class StatusAlertComponent extends LitElement {

  constructor() {
    super();
  }

  @property() message = '';
  @property() footerMessage = 'I\'m the footer';
  @property() height = 50;


  static get styles() {
    return unsafeCSS(style);
  }

  render() {
    return html`
      ${mainTemplate(this)}
      ${footerTemplate(this)}
    `;
  }
}
