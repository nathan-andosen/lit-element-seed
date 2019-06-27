/**
 * Event emitter class to dispatch custom events
 *
 * @export
 * @class EventEmitter
 */
class EventEmitter {
    constructor(target, options) {
        this.target = target;
        this.options = options;
    }
    emit(data) {
        const eventDetails = Object.assign({ detail: data }, this.options);
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
const event = (options) => {
    return (target, propertyName) => {
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
        const getter = function () {
            let eventOptions;
            if (typeof options === 'string') {
                eventOptions = { eventName: options };
            }
            else if (options) {
                eventOptions = options;
            }
            else {
                eventOptions = {};
            }
            if (!eventOptions.eventName) {
                eventOptions.eventName = camelToKebab(propertyName);
            }
            return new EventEmitter(this, eventOptions);
        };
        // do not use arrow function for setter, as this is the instance of the
        // class
        const setter = function (newVal) { };
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

export { EventEmitter, event };
