import {
	createReducer
} from 'redux-create-reducer'
import * as actionTypes from '../constants/chatActionTypes'
import emily from '../../static/emily.svg'
const initialState = [{
    phone:'9121877626',
	name:'babak',
	time:'1399/1/1 8:30:20'
}]

export default createReducer(initialState, {
	[actionTypes.NEW_PHONECALL](state, action) {
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
			return [ {...action.payload},...state]
		}
		return state
	},
	[actionTypes.DELETE_CONVERSATION](state, action) {
		return [...state.filter(x=>false)]
	},
})
export const getPhoneCalls = state => state.phoneCalls