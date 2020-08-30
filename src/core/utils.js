export function capitalize(string) {
    if (typeof string !== 'string') return '';
    return string.charAt().toUpperCase() + string.slice(1);
}

export function range(start, end) {
    // if (start > end) {
    //     [start, end] = [end, start]
    // }
    return new Array(Math.abs(end - start) + 1)
        .fill('')
        .map((_, index) => Math.min(start, end) + index);
}

export function storage(key, data = null) {
    if (!data) {
       return JSON.parse(localStorage.getItem(key));
    }
    localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
    if (typeof a === 'object'&& typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
}

export function toKebabCase(string) {
    return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

export function toInlineStyles(styles = {}) {
    return Object.keys(styles)
        .map(key => `${toKebabCase(key)}: ${styles[key]}`)
        .join(';');
}

export function debounce(fn, wait) {
    let timeout;
    return function(...args) {
        const later = () => {
            clearTimeout(timeout);
            // eslint-disable-next-line no-invalid-this
            fn.apply(this, args);
        }
        clearTimeout(timeout);
        timeout = setTimeout(later, wait)
    }
}
