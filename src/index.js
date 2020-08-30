import {Excel} from '@/component/excel/Excel';
import {Header} from '@/component/header/Header';
import {Toolbar} from '@/component/toolbar/Toolbar';
import {Formula} from '@/component/formula/Formula';
import {Table} from '@/component/table/Table';
import {createStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {debounce, storage} from '@core/utils';
import './scss/index.scss'
import {initialState} from '@/redux/initialState';

// eslint-disable-next-line no-extend-native
Array.prototype.last = function() {
    return this[this.length - 1]
}

const store = createStore(rootReducer, initialState);

const stateListener = debounce(state => {
    console.log('App State: ', state);
    storage('excel-state', state);
}, 300);

store.subscribe(stateListener)

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
})

excel.render();
