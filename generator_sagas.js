import { put, takeEvery, all } from 'redux-saga/effects'
import { INCREMENT_ASYNC, INCREMENT } from './constants/action-types'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

//*Code "Worker Saga", to perform Increment Async task
export function* asyncIncrementTask(){

    yield delay(1000)
    yield put({type: INCREMENT})
}

//*Code "Watcher Saga", spawn/ menelurkan new Increment Async function task
export function* watchIncrementAsyncTask(){
    yield takeEvery(INCREMENT_ASYNC, asyncIncrementTask)
}


export function* helloSaga(){
    console.log('Hello Sagas Wew !');
}

// Code learn "Generator Function"
export function* generator(i){
    yield i;
    yield i + 10;
}
var gen = generator(10); //returned by Generator Function : "Generator Object", if context redux, we called : "Effects"

export function* fire(){
    console.log("Starting Learn Generator Function...")
    console.log(gen.next().value)
    console.log(gen.next().value)
    console.log("Finish !")
};

//*single entry point to start all Sagas at once
export function* rootSaga(){
    yield all([helloSaga(), watchIncrementAsyncTask(), fire()])
}