import {
    FILTER_SELECTED,
    GET_RESTAURANTS
} from '../actions/types';
  
  
  const INITIAL_STATE = {
    filterList: {},
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_RESTAURANTS:
            return state;
        case FILTER_SELECTED:
            const filterList = Object.assign({}, state.filterList);
            if (filterList[action.payload]) {
                delete filterList[action.payload];
            } else {
                filterList[action.payload] = true;
            }
            return { ... state, filterList}        
      default:
        return state;
    }
  };
  