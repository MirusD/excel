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
