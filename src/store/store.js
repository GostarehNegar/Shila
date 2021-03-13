import { applyMiddleware, createStore, compose } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
//import storage from 'redux-persist/es/storage'
import storage from 'localforage'
import createSagaMiddleware from 'redux-saga'
import entities from './reducers/entities'

import app from './reducers/app'
import signalRMiddleware from './signalrMiddleWare'

const config = {
	key: 'root',
	storage,
	//timeout: null,
}

const reducer = persistCombineReducers(config, {
	app,
	// users,
	// conversations,
	// messages,
	// phoneCalls,
	entities
})

const sagaMiddleware = createSagaMiddleware()
const composeCreateStore = () =>
	compose(applyMiddleware(signalRMiddleware), window.devToolsExtension ? window.devToolsExtension() : fn => fn)(
		createStore,
	)

const configureStore = port => {
	const finalCreateStore = composeCreateStore(port)
	const store = {
		...finalCreateStore(reducer),
		runSaga: sagaMiddleware.run,
	}

	// if (module.hot) {
	// 	module.hot.accept('./reducers', () => store.replaceReducer(reducer))
	// }
	const persistor = persistStore(store)
	return { persistor, store }
}

export default configureStore
