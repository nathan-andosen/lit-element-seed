import { LitElement } from 'lit-element';
import { CustomEventEmitter } from '@thenja/decorators';
export declare class StatusAlertComponent extends LitElement {
    footerMessage: string;
    height: number;
    close: CustomEventEmitter;
    titleClick: CustomEventEmitter;
    /**
     * Creates an instance of StatusAlertComponent.
     *
     * @memberof StatusAlertComponent
     */
    constructor();
    /**
     * Use styles this way in your component if you want to take advantage
     * of lit-element using Constructable Stylesheets. This means the browser
     * will parse the style sheet only once and re-use it for other instances
     * of your component, great for performance.
     * However, if you inject your styles this way, it makes it harder to debug
     * in the browser.
     */
    /**
     * Render your html templates.
     *
     * Style - You can either inject your styles in here, or use the
     * static get styles() getter above. If you inject them here, the browser
     * will parse the css for each instance of all the components on your page.
     */
    render(): import("lit-element").TemplateResult;
    closeClick(e: any): void;
}
