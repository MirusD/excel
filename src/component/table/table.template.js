const CODES = {
    A: 65,
    Z: 90
}

function createCell(content = '') {
    return `
        <div class="cell" contenteditable>${content}</div>
    `
}

function createColumn(content) {
    return `
        <div class="column">
            ${content}
        </div>
    `
}

function createRow(index, content) {
    return `
        <div class=row>
            <div class="row-info">${index ? index : ''}</div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;

    const cells = new Array(colsCount)
        .fill('')
        .map(createCell)
        .join('');

    const colls = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createColumn)
        .join('');

    const rows = [];

    rows.push(createRow(null, colls));
    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow(i + 1, cells));
    }

    return rows.join('');
}
