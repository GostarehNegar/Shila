import * as actionTypes from '../constants/chatActionTypes'
import emily from '../../static/emily.svg'
export const newMessage = ({
	id,
	authorId,
	customId,
	text,
	buttons,
	title,
	imageUrl,
	timestamp
}) => ({
	type: actionTypes.NEW_MESSAGE,
	payload: {
		id,
		authorId,
		customId,
		text,
		buttons,
		title,
		imageUrl,
		timestamp,
	},
})
export const connectionStatusChanged = (newStatus) => ({
	type: actionTypes.CONNECTION_STATUS_CHANGED,
	payload:{
		status:newStatus
	}
});

export const newPhoneCall= (phone,name,time)=>({
	type:actionTypes.NEW_PHONECALL,
	payload:{
		phone:phone,
		name:name,
		time: time
	}
})

export const sendMessage = ({
	text,
	customId
}) => ({
	type: actionTypes.SEND_MESSAGE,
	payload: {
		text,
		customId: customId || String(Math.random()),
		timestamp: new Date(),
	},
})

export const sendMessageToChannel = (channelId,text)=>({
	type:actionTypes.SEND_MESSAGE_TO_CHANNEL,
	payload:{
		text:text,
		channelId:channelId
	}

})
export const deleteConversation = ({
	id
}) => ({
	type: actionTypes.DELETE_CONVERSATION,
	payload: {
		id
	},
})

export const refresh =()=>({
    type:actionTypes.REFRESH
})
export const SignOut =()=>({
	type:actionTypes.SIGN_OUT

})
export const signedIn =(payload)=>({
	type:actionTypes.SIGNED_IN,
	payload:payload
})
export const signIn =(userName,password)=>({
	type : actionTypes.SIGN_IN,
	payload:{
		userName:userName,
		password:password
	}

});
export const newConversation = ({
	title
}) => ({
	type: actionTypes.NEW_CONVERSATION,
	payload: {
		name: title,
		id: String(Math.random()),
		avatar: {
			src: emily
		}

	},
})
export const applyEvent =(payload)=>
	({
		type:actionTypes.ENTITY_APPLY_EVENT,
		payload:payload
	})

export const newUser = ({
	id,
	name,
	email,
	avatarUrl
}) => ({
	type: actionTypes.NEW_USER,
	payload: {
		id,
		name,
		email,
		avatarUrl,
	},
})

export const ownDataReceived = ({
	id
}) => ({
	type: actionTypes.OWN_DATA_RECEIVED,
	payload: {
		id,
	},
})

export const chatEnded = () => ({
	type: actionTypes.CHAT_ENDED,
})

export const chatStarted = ({
	chatId
}) => ({
	type: actionTypes.CHAT_STARTED,
	payload: {
		chatId,
	},
})

export const changeChatService = ({
	chatService
}) => ({
	type: actionTypes.CHANGE_CHAT_SERVICE,
	payload: {
		chatService,
	},
})

export const rateGood = () => ({
	type: actionTypes.RATE_GOOD,
})

export const rateBad = () => ({
	type: actionTypes.RATE_BAD,
})

export const chatRated = ({
	rate
}) => ({
	type: actionTypes.CHAT_RATED,
	payload: {
		rate,
	},
})

