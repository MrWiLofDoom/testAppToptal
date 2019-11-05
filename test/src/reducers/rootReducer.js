import { combineReducers } from 'redux';
import { default as DataStore } from './dataReducers';
import { default as UserStore } from './userReducers';

import { RESET } from '../actions/types';

const appReducer = combineReducers({
    DataStore,
    UserStore
});

const rootReducer = (state, action) => {
    if (action.type === RESET) {
        const { UserStore } = state;
        state = { UserStore };
    }
    return appReducer(state, action);
};
export default rootReducer;
