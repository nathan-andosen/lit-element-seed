import {
  LitElement,
  html,
  customElement,
  property,
  css,
  unsafeCSS
} from 'lit-element';
import style from './status-alert.style.scss';
import fontFaceStyle from './assets/icon-font/font-face.scss';
import { injectStyleIntoHead } from '../../utils';
import { mainTemplate, footerTemplate } from './status-alert.template';
import { event, CustomEventEmitter } from '@thenja/decorators';

@customElement('status-alert')
export class StatusAlertComponent extends LitElement {
  @property() footerMessage = 'I\'m the footer';
  @property() height = 50;
  @event() close: CustomEventEmitter;
  @event() titleClick: CustomEventEmitter;


  /**
   * Creates an instance of StatusAlertComponent.
   * 
   * @memberof StatusAlertComponent
   */
  constructor() {
    super();
    injectStyleIntoHead(fontFaceStyle);
  }


  /**
   * Use styles this way in your component if you want to take advantage 
   * of lit-element using Constructable Stylesheets. This means the browser
   * will parse the style sheet only once and re-use it for other instances
   * of your component, great for performance.
   * However, if you inject your styles this way, it makes it harder to debug
   * in the browser.
   */
  // static get styles() {
  //   return unsafeCSS(style);
  // }



  /**
   * Render your html templates.
   * 
   * Style - You can either inject your styles in here, or use the 
   * static get styles() getter above. If you inject them here, the browser
   * will parse the css for each instance of all the components on your page.
   */
  render() {
    return html`
      <style>
        ${style}
      </style>
      ${mainTemplate(this)}
      ${footerTemplate(this)}
    `;
  }

  closeClick(e) {
    this.close.emit();
  }
}
