import {Page} from '@core/Page';
import {normalizeInitialState} from '@/redux/initialState';
import {createStore} from '@core/store/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {debounce, storage} from '@core/utils';
import {Excel} from '@/component/excel/Excel';
import {Header} from '@/component/header/Header';
import {Toolbar} from '@/component/toolbar/Toolbar';
import {Formula} from '@/component/formula/Formula';
import {Table} from '@/component/table/Table';

function storageName(param) {
    return 'excel:' + param;
}

export class ExcelPage extends Page {
    getRoot() {
        // eslint-disable-next-line no-extend-native
        Array.prototype.last = function() {
            return this[this.length - 1]
        }

        const params = this.params ? this.params : Date.now().toString();

        const state = storage(storageName(params))
        const store = createStore(rootReducer, normalizeInitialState(state));

        const stateListener = debounce(state => {
            console.log('App State: ', state);
            storage(storageName(params), state);
        }, 300);

        store.subscribe(stateListener)

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        })

        return this.excel.getRoot();
    }

    afterRender() {
        this.excel.init();
    }

    destroy() {
        this.excel.destroy();
    }
}
