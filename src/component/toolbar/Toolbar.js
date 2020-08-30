import {createToolbar} from '@/component/toolbar/toolbar.template';
import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {$} from '@core/dom';
import {defaultStyles} from '@/constants';

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar';

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options
        });
    }

    prepare() {
        this.initState(defaultStyles);
    }

    get template() {
        return createToolbar(this.state);
    }

    toHTML() {
        return this.template;
    }

    storeChange(changes) {
        this.setState(changes.currentStyles);
        // console.log(changes);
    }

    onClick(event) {
        const $target = $(event.target);
        if ($target.data.type === 'button') {
            const value = JSON.parse($target.data.value); // {}
            const key = Object.keys(value)[0]; // [key]

            this.emit('toolbar:applyStyle', value);

            this.setState({[key]: value[key]});
        }
    }
}
