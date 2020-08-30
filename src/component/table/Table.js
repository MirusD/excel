import {defaultStyles} from '@/constants';
import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/component/table/table.template';
import {resizeHandler} from '@/component/table/table.resize'
import {shouldResize, isCell, nextCellSelector} from '@/component/table/table.functions';
import {TableSelection} from '@/component/table/TableSelection';
import {groupSelection} from '@/component/table/table.groupSelection';
import * as actions from '@/redux/actions';
import {applyStyle} from '@/redux/actions';
import {parse} from '@core/parse';

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
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        const $cell = this.$root.find('[data-id="0:0"]'); // id ячейки которая будет выделнной при инициализации таблицы
        this.selectCell($cell); // Для установки выделенной ячейки при инициализации
        this.on('formula:onInput', value => {
            this.selection.current
                .attr('data-value', value)
                .text(parse(value));
            console.log(parse(value));
            this.updateTextInStore(value);
        })
        this.on('formula:done', () => this.selection.current.focus())
        this.on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value);
            this.$dispatch(applyStyle({
                value,
                ids: this.selection.selectedIds
            }))
        })
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.emit('table:focusChange', $cell);
        const styles = $cell.getStyles(Object.keys(defaultStyles));
        this.$dispatch(actions.changeStyles(styles));
    }

    toHTML() {
        return createTable(this.rowsCount, this.store.getState());
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event);
            this.$dispatch(actions.tableResize(data));
        } catch (e) {
            console.warn('Resize error', e.message);
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event);
        } else if (isCell(event)) {
            const $target = $(event.target);
            groupSelection(this.$root, this.selection, event);
            this.selectCell($target)
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

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }));
    }

    onInput(event) {
        this.updateTextInStore($(event.target).text())
    }
}


