import { all, fork } from 'redux-saga/effects';
import * as dataSagas from './dataSagas';

// import watchers from other files
export default function* rootSaga() {
    yield all([
        ...Object.values(dataSagas),
        // add other watchers to the array
    ].map(fork));
}
