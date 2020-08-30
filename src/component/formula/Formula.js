import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options
        });
    }

    init() {
        super.init();
        this.$formula = this.$root.find('#formula-input');
        this.on('table:focusChange', $cell => this.$formula.text($cell.data.value));
    }

    toHTML() {
        return `<div class="excel__formula-info">fx</div>
<div id="formula-input" class="excel__formula-input" contenteditable spellcheck="false"></div>
        `;
    }

    storeChange({currentText}) {
        this.$formula.text(currentText);
    }

    onInput(event) {
        this.emit('formula:onInput', $(event.target).text());
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab'];
        const key = event.key;
        if (keys.includes(key)) {
            event.preventDefault();
            this.emit('formula:done');
        }
    }
}
