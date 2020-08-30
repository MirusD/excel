import {
   CHANGE_TEXT,
   CHANGE_STYLES,
   TABLE_RESIZE,
   APPLY_STYLE,
   CHANGE_TITLE
} from '@/redux/types';

export function rootReducer(state, action) {
   let field;
   let val;
   switch (action.type) {
      case TABLE_RESIZE:
         return tableResize(action, state);
      case CHANGE_TEXT:
         return changeText(action, state);
      case CHANGE_STYLES:
         return {...state, currentStyles: action.data}
      case APPLY_STYLE:
         field = 'stylesState';
         val = state[field] || {};
         action.data.ids.forEach(id => {
            val[id] = {...val[id], ...action.data.value}
         })
         return {
            ...state,
            [field]: val,
            currentStyles: {...state.currentStyles, ...action.data.value}
         }
      case CHANGE_TITLE:
         return {...state, title: action.data};
      default: return state;
   }
}

function tableResize(action, state) {
   const key = action.data.typeResize === 'col' ? 'colState' : 'rowState';
   const prevState = state[key] || {};
   prevState[action.data.id] = action.data.value;
   return {...state, [key]: prevState};
}

function changeText(action, state) {
   const prevState = state.dataState || {};
   prevState[action.data.id] = action.data.value;
   return {...state, currentText: action.data.value, dataState: prevState}
}
