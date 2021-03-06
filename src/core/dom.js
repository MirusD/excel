class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector;
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;
            return this;
        }
        return this.$el.outerHTML.trim();
    }

    text(text) {
        if (typeof text !== 'undefined') {
            this.$el.textContent = text;
            return this;
        }
        if (this.$el.tagName.toLocaleUpperCase() === 'INPUT') {
            return this.$el.value.trim();
        }
        return this.$el.textContent.trim();
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback);
        return this;
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback);
        return this
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el;
        }
        if (Element.prototype.append) {
            this.$el.append(node);
        } else {
            this.$el.appendChild(node);
        }
        return this;
    }

    get data() {
        return this.$el.dataset;
    }

    id(parse) {
        if (parse) {
            const parsed = this.id().split(':');
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.$el.dataset.id;
    }

    find(selector) {
        return $(this.$el.querySelector(selector));
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector);
    }

    closest(selector) {
        return $(this.$el.closest(selector));
    }

    clear() {
        this.html('');
        return this;
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    focus() {
        this.$el.focus();
        return this;
    }

    focusToEnd() {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(this.$el);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
        return this;
    }

    addClass(className) {
        this.$el.classList.add(className);
        return this;
    }

    isNotEmpty() {
        return this.$el;
    }

    removeClass(className) {
        this.$el.classList.remove(className);
        return this
    }

    css(styles = {}) {
        Object.keys(styles)
            .forEach(key => {
                this.$el.style[key] = styles[key];
            })
        return this
    }

    getStyles(styles = []) {
        return styles.reduce((res, s) => {
            res[s] = this.$el.style[s]
            return res;
        }, {})
    }

    attr(name, value) {
        if (typeof value === 'string') {
            this.$el.setAttribute(name, value);
            return this;
        }
        return this.$el.getAttribute(name);
    }
}

export function $(selector) {
    return new Dom(selector);
}

$.create = (tagName, classes) => {
    const el = document.createElement(tagName);
    if (typeof classes === 'string' && classes !== '') {
        el.classList.add(classes);
    }
    return $(el);
}
