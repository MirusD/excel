export class Emitter {
    constructor() {
        this.listeners = {};
    }
    emit(event, ...args) {
        if (Array.isArray(this.listeners[event])) {
            this.listeners[event].forEach(listen => listen(...args))
        }
    }
    subscribe(event, callback) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(callback);
        return () => {
            this.listeners[event] = this.listeners[event].filter(fn => fn !== callback)
        }
    }
}
