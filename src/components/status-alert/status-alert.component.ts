import {
  LitElement,
  html,
  customElement,
  property,
  css,
  unsafeCSS
} from 'lit-element';
import style from './status-alert.component.scss';
import template from './status-alert.component.html';

@customElement('status-alert')
export class StatusAlertComponent extends LitElement {

  constructor() {
    super();
  }

  @property() message = '';
  @property() height = 50;


  static get styles() {
    return unsafeCSS(style);
  }

  render() {
    return html`${template(this)}`;
  }
}
