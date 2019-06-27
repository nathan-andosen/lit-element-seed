export interface IEventOptions {
    eventName?: string;
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
}
/**
 * Event emitter class to dispatch custom events
 *
 * @export
 * @class EventEmitter
 */
export declare class EventEmitter {
    private target;
    private options;
    constructor(target: HTMLElement, options: IEventOptions);
    emit(data?: any): void;
}
/**
 * Event property decorator to easily emit events
 *
 *
 * @param {(string|IEventOptions)} [options]
 * @returns
 */
export declare const event: (options?: string | IEventOptions) => (target: Object, propertyName: string) => void;
