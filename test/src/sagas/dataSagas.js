import { put, takeLatest, call } from 'redux-saga/effects';
import apiHelper from '../api/apiHelper.js';

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

function* getData(){
    try {
        const response = yield call(apiHelper.fetchDataApi);
        yield put({ type: FETCH_DATA_RECEIVED, response });
    }
    catch (error) {
        yield put({ type: FETCH_DATA_FAILED, error });
    }
}

function* addData(action){
    console.log('*addData:',action);
    try {
        const response = yield call(apiHelper.addDataApi, action);
        yield put({ type: ADD_DATA_RECEIVED, response });
    }
    catch (error) {
        yield put({ type: ADD_DATA_FAILED, error });
    }
}

function* updateData(action){
    try {
        const response = yield call(apiHelper.updateDataApi, action);
        yield put({ type: UPDATE_DATA_RECEIVED, response });
    }
    catch (error) {
        yield put({ type: UPDATE_DATA_FAILED, error });
    }
}

function* deleteData(action){
    console.log('****** deleteData:',action);
    try {
        const response = yield call(apiHelper.deleteDataApi, action);
        yield put({ type: DELETE_DATA_RECEIVED, response });
    }
    catch (error) {
        yield put({ type: DELETE_DATA_FAILED, error });
    }
}

export function* watchFetchData() {
    yield takeLatest(FETCH_DATA, getData);
}

export function* watchUpdateData(){
    yield takeLatest(UPDATE_DATA, updateData);
}

export function* watchAddData(){
    yield takeLatest(ADD_DATA, addData);
}

export function* watchDeleteData(){
    yield takeLatest(DELETE_DATA, deleteData);
}
