import {ExcelComponent} from '@core/ExcelComponent';
import {changeTitle} from '@/redux/actions';
import {debounce} from '@core/utils';
import {$} from '@core/dom';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        });
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300);
    }

    toHTML() {
        const title = this.store.getState().title;
        return `
        <input type="text" class="excel__header-title" value="${title}">
        <div>
            <div class="button" data-btn="del">
                <i class="material-icons" data-btn="del">delete</i>
            </div>
            <div class="button" data-btn="exit">
                <i class="material-icons" data-btn="exit">exit_to_app</i>
            </div>
        </div>
        `;
    }

    onInput(event) {
        console.log('onInput');
        const $target = $(event.target);
        this.$dispatch(changeTitle($target.text()))
    }

    onClick(event) {
        const $target = $(event.target);

        if ($target.data.btn === 'exit') {
            ActiveRoute.navigate('');
        } else if ($target.data.btn === 'del') {
            const decision = confirm('Вы действительно хотите удалить таблицу?');
            if (decision) {
                localStorage.removeItem('excel:' + ActiveRoute.param);
                ActiveRoute.navigate('');
            }
        }
    }
}
