import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
        this.emitter = options.emitter;
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

    prepare() {
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
