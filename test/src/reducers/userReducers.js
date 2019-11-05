import {
    LOGIN_USER,
    LOGIN_USER_FAILED,
    LOGIN_USER_RECEIVED,
    REGISTER_USER,
    REGISTER_USER_FAILED,
    REGISTER_USER_RECEIVED
} from '../actions/types';

const initialState = {
    token: '',
    isEditor: false,
    hasError: false,
    isLoggedIn: false,
    userId: null,
    email: null
}

export default function userReducer (state = initialState, action){
    let newState = state;
    switch(action.type){
        case LOGIN_USER_FAILED:
            newState = Object.assign({}, state, {hasError: true, isLoggedIn: false, token: ''});
            return newState;
        case LOGIN_USER_RECEIVED:
            let response = action.response.data;
            let newData = {
                hasError: false,
                isLoggedIn: response.success,
                token: response.token,
                isEditor: response.isEditor,
                userId: response.userId
            }
            newState = Object.assign({}, state, newData);
            return newState;
        case LOGIN_USER:
            newState = Object.assign({}, state, {hasError: false});
            return newState;
        case REGISTER_USER_FAILED:
            newState = Object.assign({}, state, {hasError: true, isLoggedIn: false, token: ''});
            return newState;
        case REGISTER_USER_RECEIVED:
            let registerResponse = action.response.data;
            console.log('registerResponse:',registerResponse);
            let newRegisterData = {
                hasError: false,
                isLoggedIn: false,
                token: null,
                isEditor: false,
                userId: null,
                email: registerResponse.email
            }
            newState = Object.assign({}, state, newRegisterData);
            return newState;
        case REGISTER_USER:
            newState = Object.assign({}, state, {hasError: false});
            return newState;
        default:
            return state;
    }
}