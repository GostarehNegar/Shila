import {
	createReducer
} from 'redux-create-reducer'
import * as actionTypes from '../constants/chatActionTypes'
import emily from '../../static/emily.svg'
const initialState = [{
	id: '1',
	name: 'babak',
	info: 'shdiizzzz',
	lastSenderName: 'zary',
	avatar: {
		src: emily,
		name: 'babak',
		status: 'available'
	}
}]

export default createReducer(initialState, {
	[actionTypes.NEW_CONVERSATION](state, action) {
		console.log("NEW CONVERSATION")
		if (action.payload.customId === 'VISITOR_CHAT_HISTORY') {
			return state
		}
		const foundEvent = state.filter(event => {
			return (
				(event.customId && event.customId === action.payload.customId) || (event.id && event.id === action.payload.id)
			)
		})
		if (!foundEvent.length) {
			return [...state, {...action.payload}]
		}
		return state
	},
	[actionTypes.DELETE_CONVERSATION](state, action) {
		return [...state.filter(x=>false)]
	},
})
export const getConversations = state => state.conversations