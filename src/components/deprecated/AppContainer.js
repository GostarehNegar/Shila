import { connect } from 'react-redux'
import App from './App'
//import { getEvents } from '../store/reducers/events'
import { getUsers, getOwnId, getCurrentAgent } from '../store/reducers/users'
import { getRate, getChatState, getConnectionStatus } from '../store/reducers/app'
import { refresh, sendMessage, rateGood, rateBad,newConversation, deleteConversation, SignOut } from '../store/actions/chatActions'
import { getConversations } from '../store/reducers/conversations'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const parseTimestamp = timestamp => {
	const date = new Date(timestamp)
	return `${ date.getDate() } ${ months[date.getMonth()] } ${ date.getHours() }:${ date.getMinutes() }`
}

const parseMessages = messages =>
	messages
		.map(message => ({
			...message,
			parsedDate: parseTimestamp(message.timestamp),
		}))
		.reduce(
			(result, current) => {
				const previous = result[result.length - 1]
				if (!previous.length || previous[previous.length - 1].authorId === current.authorId) {
					result[result.length - 1].push(current)
					return result
				}
				result.push([current])
				return result
			},
			[[]],
		)

const mapStateToProps = state => {
	return {
		
		users: getUsers(state),
		ownId: getOwnId(state),
		currentAgent: getCurrentAgent(state),
		rate: getRate(state),
		chatState: getChatState(state),
		babak: 'babak',
		conversations :getConversations(state),
		connectionStatus:getConnectionStatus(state),
		
		panels:[{open:true, title:'info',items:['11']},{open:true, title:'babak', items:['pop']}]
	}
}

const mapDispatchToProps = dispatch => ({
	onMessageSend: data => {
		dispatch(
			sendMessage({
				text: data,
			}),
		)
	},
	refresh:()=>{

console.info("%%%%%%%%%%")
		dispatch(refresh())
	},
	signOut: ()=>{
		console.error("logging out")
		dispatch(SignOut())

	},
	sendMessage: text =>
		dispatch(
			sendMessage({
				text,
			}),
		),
	rateGood: () => {
		dispatch(rateGood())
	},
	rateBad: () => {
		dispatch(rateBad())
	},
	newConversation: title=>{
		dispatch(newConversation({title}))

	},
	deleteConversation: id=>{
		dispatch(deleteConversation(id))

	}
})

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)
export default AppContainer
