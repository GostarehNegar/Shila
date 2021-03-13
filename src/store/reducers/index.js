import { combineReducers } from 'redux'
import events from './events'
import users from './deprecated/users'
import app from './app'

const rootReducer = combineReducers({
	app,
	events,
	users,
})

export default rootReducer
