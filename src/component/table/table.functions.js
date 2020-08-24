import {range} from '@core/utils';

export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.type === 'cell'
}

export function matrix($target, $current) {
    const target = $target.id(true);
    const current = $current.id(true);
    const cols = range(current.col, target.col);
    const rows = range(current.row, target.row);
    return cols.reduce((acc, col) => {
        rows.forEach((row) => acc.push(`${row}:${col}`));
        return acc;
    }, [])
}

export function isDifferentCell(currentCell, newCell) {
    return currentCell.id() !== newCell.id()
}

export function nextCellSelector({col, row}, key, rowsCount, colsCount) {
    const MIN = 0;
    switch (key) {
        case 'ArrowDown':
        case 'Enter':
            row++;
            break;
        case 'ArrowRight':
        case 'Tab':
            col++;
            break;
        case 'ArrowLeft': col--; break;
        case 'ArrowUp': row--; break;
    }

    row = Math.min(Math.max(row, MIN), rowsCount - 1);
    col = Math.min(Math.max(col, MIN), colsCount - 1);

    return `[data-id="${row}:${col}"]`
}
