import {    connect} from 'react-redux'
import { getEntityById,getMessages} from '../store/reducers/entities'
import ChannelMessages from '../components/ChannelMessages'
import { useParams } from "react-router";
import {sendMessageToChannel} from "../store/actions/chatActions"
import { Actions } from '../services/actions';

function checkNotificationPromise() {
    try {
      Notification.requestPermission().then();
    } catch(e) {
      return false;
    }

    return true;
  }
var id = null
const mapStateToProps = state => {
//    console.log(id)
         id = window.location.pathname.replace("/","");
        var channel = getEntityById(state,"channel",id) || {id:'',payload:{}}
        channel.payload = channel.payload ||{};


       // console.log("channel=",channel)
        return {
            items: getMessages(state,channel.id),
            name :channel.payload.name,
            channelId: channel.id
        }
    }
const mapDispatchToProps = dispatch => ({
    sendMessageToChannel:(text,channel)=>{
        // debugger
        // checkNotificationPromise();
        // var img = '/to-do-notifications/img/icon-128.png';
        // var text = 'HEY! Your task "' +  '" is now overdue.';
        // var notification = new Notification('To do list', { body: text, icon: img });
        dispatch(Actions.sendMessageToChannel(channel,text));
        //console.log('message' , text)
    }
    // deleteConversation: id => {
    //     dispatch(deleteConversation(id))

    // }
})
const ChannelMessagesContainer = connect(mapStateToProps, mapDispatchToProps)(ChannelMessages)
export default ChannelMessagesContainer