import {$} from '@core/dom';
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@core/StoreSubscriber';
import {updateDateOpen} from '@/redux/actions';

export class Excel {
    constructor(options) {
        this.components = options.components || [];
        this.emitter = new Emitter();
        this.store = options.store;
        this.subscriber = new StoreSubscriber(this.store);
    }

    getRoot() {
        const $root = $.create('div', 'excel');
        const options = {
            emitter: this.emitter,
            store: this.store
        }

        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className);
            const component = new Component($el, options);
            // DEBUG
            // if (component.name) {
            //     window['c' + component.name] = component;
            // }
            $el.html(component.toHTML());
            $root.append($el);
            return component;
        })
        return $root;
    }

    init() {
        this.store.dispatch(updateDateOpen());
        this.subscriber.subscriberComponents(this.components)
        this.components.forEach(component => component.init())
    }

    destroy() {
        this.subscriber.unsubscribeFromStore();
        this.components.forEach(component => component.destroy());
    }
}
