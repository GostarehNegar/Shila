import { createReducer } from 'redux-create-reducer'
import { Actions,Types } from '../../services/actions'

const initialState = {
	chatState: 'NOT_CHATTING',
	widgetState: 'MAXIMIZED',
	chatService: 'botEngine',
	rate: 'none',
	activeChatId:0,
	connectionState:'close',
	token:''
}

export default createReducer(initialState, {
	[Types.SIGNED_IN](state,{payload}) {
		return{
			...state,
			token:payload.token,
			userName:payload.userName,
			loggedIn: true
		}
	},
	[Types.SIGN_OUT](state,{payload}) {
		return{
			...state,
			loggedIn:false
			
		}
	},
	[Types.CONNECTION_STATUS_CHANGED](state,{payload}) {
		console.info('connection status changed', payload)
		return {
			...state,
			connectionState: payload.status,
			
		}
	},

})

// export const getChatState = state => state.app.chatState
// export const getWidgetState = state => state.app.widgetState
// export const getChatService = state => state.app.chatService
// export const getRate = state => state.app.rate
export const getConnectionStatus = state=>state.app.connectionState
export const getSinedIn = state=>state.app.loggedIn
export const getAuthorizationToken = state=>state.app.token
export const getUserName = state => state.app.userName