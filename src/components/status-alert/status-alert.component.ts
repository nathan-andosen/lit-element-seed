import {
  LitElement,
  html,
  customElement,
  property,
  css,
  unsafeCSS
} from 'lit-element';
import style from './status-alert.style.scss';
import { mainTemplate, footerTemplate } from './status-alert.template';
import { injectStyle } from './assets/icon-font/inject-style';

@customElement('status-alert')
export class StatusAlertComponent extends LitElement {

  constructor() {
    super();
    injectStyle();
  }

  // Uncomment this if you do not want to create a shadow dom
  // createRenderRoot() {
  //   return this;
  // }

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
