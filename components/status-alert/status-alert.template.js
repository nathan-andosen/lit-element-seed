import { html } from 'lit-element';

const headerTemplate = html `
  <h3>Alert!</h3>
`;
const mainTemplate = (data) => html `
  <div>
    ${headerTemplate}
    <p>${data.message}</p>
  </div>
`;
const footerTemplate = (data) => html `
  <h6>${data.footerMessage}</h6>
`;

export { footerTemplate, mainTemplate };
