import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/component/table/table.template';
import {resizeHandler} from '@/component/table/table.resize'
import {shouldResize, isCell, nextCellSelector} from '@/component/table/table.functions';
import {TableSelection} from '@/component/table/TableSelection';
import {groupSelection} from '@/component/table/table.groupSelection';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
        this.rowsCount = 30;
        this.colsCount = 26;

        this.on('formula:onInput', data => this.selection.current.text(data))
        this.on('formula:done', () => this.selection.current.focus())
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        const $cell = this.$root.find('[data-id="0:0"]'); // id ячейки которая будет выделнной при инициализации таблицы
        this.selectCell($cell); // Для установки выделенной ячейки при инициализации
    }

    selectCell($cell) {
        this.selection.select($cell); // Для установки выделенной ячейки при инициализации
        this.emit('table:onInput', $cell)
    }

    toHTML() {
        return createTable(this.rowsCount);
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event);
        } else if (isCell(event)) {
            const $target = $(event.target);
            groupSelection(this.$root, this.selection, event);
            this.selection.select($target);
            this.emit('table:focusChange', this.selection.current);
        }
    }

    onKeydown(event) {
        const keys = [
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'Enter',
            'Tab'
        ]
        const {key} = event;
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault();
            const currentCell = this.selection.current;
            const id = currentCell.id(true);
            const selector = nextCellSelector(id, key, this.rowsCount, this.colsCount);
            const $nextCell = this.$root.find(selector);
            if (currentCell.isNotEmpty()) {
                this.selectCell($nextCell);
            }
        }
    }

    onInput(event) {
        this.emit('table:onInput', $(event.target));
    }
}


