import {
  LitElement,
  html,
  customElement,
  css
} from 'lit-element';

@customElement('fancy-button')
export class FancyButtonComponent extends LitElement {

  static get styles() {
    return css`
      button {
        padding: 1rem;
        background-color: #ff9900;
      }
    `;
  }

  render() {
    return html`
      <button>
        <slot></slot>
      </button>
    `;
  }
}
