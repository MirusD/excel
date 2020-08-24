import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        });
    }

    init() {
        super.init();
        this.$formula = this.$root.find('#formula-input');
        this.on('table:onInput', $cell => this.formulaText($cell.text()));
        this.on('table:focusChange', $cell => this.formulaText($cell.text()));
    }

    toHTML() {
        return `<div class="excel__formula-info">fx</div>
<div id="formula-input" class="excel__formula-input" contenteditable spellcheck="false"></div>
        `;
    }

    formulaText(text) {
        this.$formula.text(text);
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
