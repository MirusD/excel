import {toInlineStyles} from '@core/utils';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 25;

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

function getWidth(state) {
    return function(cont, index) {
        return {cont, index, width: (state.colState[index] || DEFAULT_WIDTH) + 'px'}
    }
}

function getHeight(state, row) {
    return (state.rowState[row + 1] || DEFAULT_HEIGHT) + 'px';
}

function createCell(row, state) {
    return function({index: col, width}) {
        const id = `${row}:${col}`;
        const content = state.dataState[id] || '';
        const styles = toInlineStyles({
            ...defaultStyles,
            ...state.stylesState[id]
        });
        return `
        <div 
            class="cell"
            style="${styles}; width: ${width}"
            contenteditable 
            data-col="${col}" 
            data-id="${id}"
            data-value="${content || ''}"
            data-type="cell"
        >${parse(content) || ''}</div>
    `
    }
}

function createColumn({cont, index, width}) {
    return `
        <div class="column" style="width: ${width}" data-type="resizeble" data-col="${index}">
            ${cont}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(index, content, height) {
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
    return `
        <div class=row style="height: ${height}" data-row="${index}" data-type="resizeble">
            <div class="row-info">
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

export function createTable(rowsCount = 15, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1;

    const cells = new Array(colsCount)
        .fill('')
        .map(getWidth(state))

    const collsHeader = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(getWidth(state))
        .map(createColumn)
        .join('');

    const rows = [];

    rows.push(createRow(null, collsHeader));
    for (let row = 0; row < rowsCount; row++) {
        rows.push(createRow(row + 1, cells.map(createCell(row, state)).join(''), getHeight(state, row)));
    }

    return rows.join('');
}
