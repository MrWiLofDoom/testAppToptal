import {
    FETCH_DATA_FAILED,
    FETCH_DATA_RECEIVED,
    FETCH_DATA,
    UPDATE_DATA_RECEIVED,
    UPDATE_DATA_FAILED,
    UPDATE_DATA,
    DELETE_DATA_FAILED,
    DELETE_DATA_RECEIVED,
    DELETE_DATA,
    ADD_DATA_FAILED,
    ADD_DATA_RECEIVED,
    ADD_DATA
} from '../actions/types';

// import _ from 'lodash';

import apiHelper from '../api/apiHelper.js';


const initialState = {
    authenticated: true,
    isEditor: true,
    data: [],
    hasError: false
}

export default function dataReducer (state = initialState, action){
    let newState = state;
    switch(action.type){
        case FETCH_DATA_FAILED:
            newState = Object.assign({}, state, {hasError: true});
            return newState;
        case FETCH_DATA_RECEIVED:
            newState = Object.assign({}, state, {hasError: false, data: apiHelper.formatResponse(action.response.data)});
            return newState;
        case FETCH_DATA:
            newState = Object.assign({}, state, {hasError: false});
            return newState;
        case UPDATE_DATA_FAILED:
            newState = Object.assign({}, state, {hasError: true});
            return newState;
        case UPDATE_DATA_RECEIVED:
            newState = Object.assign({}, state, {hasError: false, data: action.response.data});
            return newState;
        case UPDATE_DATA:
            newState = Object.assign({}, state, {hasError: false});
            return newState;
        case DELETE_DATA_FAILED:
            newState = Object.assign({}, state, {hasError: true});
            return newState;
        case DELETE_DATA_RECEIVED:
            console.log('delete data received:',action.response.data);
            newState = Object.assign({}, state, {hasError: false, data: action.response.data});
            return newState;
        case DELETE_DATA:
            newState = Object.assign({}, state, {hasError: false});
            return newState;

        case ADD_DATA_FAILED:
            newState = Object.assign({}, state, {hasError: true});
            return newState;
        case ADD_DATA_RECEIVED:
            console.log('===> add data received:',action.response.data.reviews);
            newState = Object.assign({}, state, {hasError: false, data: action.response.data.reviews});
            console.log('newState:',newState);
            return newState;
        case ADD_DATA:
            newState = Object.assign({}, state, {hasError: false});
            return newState;
        default:
            return state;
    }
}