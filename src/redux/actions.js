import {
    APPLY_STYLE,
    CHANGE_STYLES,
    CHANGE_TITLE,
    CHANGE_TEXT,
    TABLE_RESIZE,
    UPDATE_DATE_OPEN
} from '@/redux/types';

export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}

export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data
    }
}

export function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data
    }
}

export function applyStyle(data) {
    return {
        type: APPLY_STYLE,
        data
    }
}

export function changeTitle(data) {
    return {
        type: CHANGE_TITLE,
        data
    }
}

export function updateDateOpen(data) {
    return {
        type: UPDATE_DATE_OPEN,
        data
    }
}
