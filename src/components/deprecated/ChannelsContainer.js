import {    connect} from 'react-redux'
import { getChannels} from '../store/reducers/entities'
import Channels from '../components/Channels'
const mapStateToProps = state => {
        return {
            items: getChannels(state)
        }
    }
const mapDispatchToProps = dispatch => ({
    // deleteConversation: id => {
    //     dispatch(deleteConversation(id))

    // }
})
const ChannelsContainer = connect(mapStateToProps, mapDispatchToProps)(Channels)
export default ChannelsContainer