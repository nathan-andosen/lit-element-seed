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
import { injectFontFaceStyle } from './inject-font-face-style';
import { event, EventEmitter } from '../../decorators/event';

@customElement('status-alert')
export class StatusAlertComponent extends LitElement {
  @property() footerMessage = 'I\'m the footer';
  @property() height = 50;
  @event() close: EventEmitter;
  @event() titleClick: EventEmitter;


  constructor() {
    super();
    injectFontFaceStyle();
  }


  static get styles() {
    return unsafeCSS(style);
  }


  render() {
    return html`
      ${mainTemplate(this)}
      ${footerTemplate(this)}
    `;
  }

  closeClick(e) {
    this.close.emit();
  }
}
