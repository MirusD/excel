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
        if (typeof text === 'string') {
            this.$el.textContent = text;
            return this;
        }
        if (this.$el.tagName.toLocaleUpperCase() === 'input') {
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

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    focus() {
        this.$el.focus();
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
