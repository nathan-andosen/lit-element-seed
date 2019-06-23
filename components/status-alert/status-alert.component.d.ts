import { LitElement } from 'lit-element';
import { EventEmitter } from '../../decorators/event';
export declare class StatusAlertComponent extends LitElement {
    footerMessage: string;
    height: number;
    close: EventEmitter;
    titleClick: EventEmitter;
    constructor();
    static readonly styles: import("lit-element").CSSResult;
    render(): import("lit-element").TemplateResult;
    closeClick(e: any): void;
}
