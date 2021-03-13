import {    connect} from 'react-redux'
//import { getMessages} from '../store/reducers/deprecated/messages'
import {Chat} from '../components/Chat'
const mapStateToProps = state => {
        return {
            messages:[] // getMessages(state)
        }
    }
const mapDispatchToProps = dispatch => ({
    // deleteConversation: id => {
    //     dispatch(deleteConversation(id))

    // }
})
const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Chat)
export default ChatContainer