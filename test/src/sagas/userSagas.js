import { put, takeLatest, call } from 'redux-saga/effects';
import apiHelper from '../api/apiHelper.js';

import {
    LOGIN_USER,
    LOGIN_USER_FAILED,
    LOGIN_USER_RECEIVED,
    REGISTER_USER,
    REGISTER_USER_FAILED,
    REGISTER_USER_RECEIVED
} from '../actions/types';

function* loginUser(action){
    try {
        console.log('*loginUser:',action);
        const response = yield call(apiHelper.loginUser, action);
        yield put({ type: LOGIN_USER_RECEIVED, response });
    }
    catch (error) {
        yield put({ type: LOGIN_USER_FAILED, error });
    }
}

function* registerUser(action){
    console.log('*registerUser:',action);
    try {
        const response = yield call(apiHelper.registerUser, action);
        yield put({ type: REGISTER_USER_RECEIVED, response });
    }
    catch (error) {
        yield put({ type: REGISTER_USER_FAILED, error });
    }
}

export function* watchLoginUser() {
    yield takeLatest(LOGIN_USER, loginUser);
}

export function* watchRegisterUser(){
    yield takeLatest(REGISTER_USER, registerUser);
}
