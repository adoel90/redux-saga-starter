import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { INCREMENT } from './constants/action-types'
import Counter from './Counter'
import reducer from './reducers'
import { helloSaga, rootSaga } from './generator_sagas'
import logMiddleware from './middleware/log';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware, logMiddleware))

// sagaMiddleware.run(helloSaga)
sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({type})

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrementAsync = {() => action('INCREMENT_ASYNC')}
      onIncrement={() => action(INCREMENT)}
      onDecrement={() => action('DECREMENT')} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
