import {
    FILTER_SELECTED,
    FILTERS_FINALIZED,
    SET_RESTAURANTS_AS_OWNER,
    SET_RESTAURANTS_AS_OWNER_FAILURE
} from '../actions/types';
  
  
  const INITIAL_STATE = {
    filterList: {},
    error: null,
    restaurantsSet: null
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FILTERS_FINALIZED:
            return {...state, restaurantsSet: false};
        case SET_RESTAURANTS_AS_OWNER:
            return {...state, restaurantsSet: true, error: false};
        case SET_RESTAURANTS_AS_OWNER_FAILURE:
            return {...state, error: true}
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
  