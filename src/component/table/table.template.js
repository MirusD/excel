const CODES = {
    A: 65,
    Z: 90
}

function createCell(content = '', col) {
    return `
        <div class="cell" contenteditable data-col="${col}">${content}</div>
    `
}

function createColumn(content, index) {
    return `
        <div class="column" data-type="resizeble" data-col="${index}">
            ${content}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(index, content) {
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
    return `
        <div class=row data-type="resizeble">
            <div class="row-info">
                ${index ? index : ''}
                ${resize}
            </div>
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
