import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
        this.emitter = options.emitter;
        this.subscribe = options.subscribe || [];
        this.store = options.store;
        this.unset = [];

        this.prepare();
    }

    toHTML() {
        return '';
    }

    emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }

    on(event, fn) {
        const delFunc = this.emitter.subscribe(event, fn);
        this.unset.push(delFunc);
    }

    $dispatch(action) {
        this.store.dispatch(action);
    }

    prepare() {
    }

    storeChange() {
    }

    isWatching(key) {
        return this.subscribe.includes(key);
    }

    init() {
        this.initDOMListeners();
    }

    destroy() {
        this.removeDOMListeners();
        this.unset.forEach(fn => fn())
        this.unset = [];
    }
}
