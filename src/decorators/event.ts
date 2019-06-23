
// Event options for the decorator
export interface IEventOptions {
  // The name of the event
  eventName?: string;

  // A Boolean indicating whether the event bubbles up through the DOM or not.
  bubbles?: boolean;

  // A Boolean indicating whether the event is cancelable.
  cancelable?: boolean;

  // A Boolean value indicating whether or not the event can bubble across the
  // boundary between the shadow DOM and the regular DOM.
  composed?: boolean;
}


/**
 * Event emitter class to dispatch custom events
 *
 * @export
 * @class EventEmitter
 */
export class EventEmitter {
  private target: HTMLElement;
  private options: IEventOptions;

  constructor(target: HTMLElement, options: IEventOptions) {
    this.target = target;
    this.options = options;
  }

  emit(data?: any) {
    const eventDetails = { detail: data, ...this.options };
    const event = new CustomEvent(eventDetails.eventName, eventDetails);
    this.target.dispatchEvent(event);
  }
}


/**
 * Event property decorator to easily emit events
 * 
 *
 * @param {(string|IEventOptions)} [options]
 * @returns
 */
export const event = (options?: string|IEventOptions) => {
  return (target: Object, propertyName: string) => {

    /**
     * Convert camel case to kebab (myEvent becomes my-event)
     *
     * @param {*} string
     * @returns
     */
    const camelToKebab = (string) => {
      return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
        .toLowerCase();
    };

    // do not use arrow function for getter, as this is the instance of the
    // class
    const getter = function(this: HTMLElement) {
      let eventOptions: IEventOptions;
      if (typeof options === 'string') {
        eventOptions = { eventName: options };
      } else if (options) {
        eventOptions = options;
      } else {
        eventOptions = {};
      }
      if (!eventOptions.eventName) {
        eventOptions.eventName = camelToKebab(propertyName);
      }
      return new EventEmitter(this, eventOptions);
    }

    // do not use arrow function for setter, as this is the instance of the
    // class
    const setter = function(this: HTMLElement, newVal) {}

    // delete the property and re-assign it
    if (delete target[propertyName]) {
      Object.defineProperty(target, propertyName, {
        get: getter,
        set: setter,
        enumerable: false,
        configurable: false
      });
    }
  };
};