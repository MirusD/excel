import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/component/table/table.template';
import {resizeHandler} from '@/component/table/table.resize'
import {shouldResize} from '@/component/table/table.functions';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        });
    }

    toHTML() {
        return createTable(30);
    }
    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        }
    }
}
