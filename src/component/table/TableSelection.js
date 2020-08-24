// import {$} from '@core/dom';

export class TableSelection {
    static className = 'selected';

    constructor() {
        this.group = [];
        this.current = null;
    }

    select($el) {
        this.current = $el;
        this.clear();
        $el.focus().addClass(TableSelection.className);
        return this;
    }

    selectGroup($group = []) {
        this.clear();
        this.group = $group;
        this.group.forEach($cell => $cell.addClass(TableSelection.className))
    }

    preSelectGroup($group = []) {
        this.clear();
        this.group = $group;
        this.group.forEach($cell => $cell.css({backgroundColor: '#E7F0FD'}))
    }

    clear() {
        this.group.forEach($el => {
            if (this.current.id() !== $el.id()) {
                $el.removeClass(TableSelection.className);
            }
            $el.css({backgroundColor: 'white'});
        });
        this.group = [];
        this.group.push(this.current);
    }
}

