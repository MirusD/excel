import {$} from '@core/dom';
import {isCell, isDifferentCell, matrix} from '@/component/table/table.functions';

export function groupSelection($root, selection) {
    document.onmousemove = (e) => {
        if (isCell(e)) {
            const $target = $(e.target);
            if (isDifferentCell(selection.group.last(), $target)) {
                const $cells = matrix($target, selection.current)
                    .map(id => $root.find(`[data-id="${id}"]`));
                selection.preSelectGroup($cells);
            }
        }
    }
    document.onmouseup = () => {
        document.onmousemove = null;
        selection.selectGroup(selection.group);
    }
}
