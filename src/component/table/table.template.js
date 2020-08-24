const CODES = {
    A: 65,
    Z: 90
}

function createCell(row) {
    return function(_, col) {
        return `
        <div 
            class="cell" 
            contenteditable 
            data-col="${col}" 
            data-id="${row}:${col}"
            data-type="cell"
        ></div>
    `
    }
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
        .fill('');

    const collsHeader = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createColumn)
        .join('');

    const rows = [];

    rows.push(createRow(null, collsHeader));
    for (let row = 0; row < rowsCount; row++) {
        rows.push(createRow(row + 1, cells.map(createCell(row)).join('')));
    }

    return rows.join('');
}
