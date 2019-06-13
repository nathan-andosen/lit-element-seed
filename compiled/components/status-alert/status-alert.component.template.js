import { html } from 'lit-element';
const headerTemplate = html `
  <h3>Alert!</h3>
`;
export const mainTemplate = (data) => html `
  <div>
    ${headerTemplate}
    <p>${data.message}</p>
  </div>
`;
export const footerTemplate = (data) => html `
  <h6>${data.footerMessage}</h6>
`;
