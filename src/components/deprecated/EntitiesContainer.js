import {    connect} from 'react-redux'
import { getEntities} from '../store/reducers/entities'
import Entities from '../components/Entities'
const mapStateToProps = state => {
        return {
            items: getEntities(state)
        }
    }
const mapDispatchToProps = dispatch => ({
    // deleteConversation: id => {
    //     dispatch(deleteConversation(id))

    // }
})
const EntitiesContainer = connect(mapStateToProps, mapDispatchToProps)(Entities)
export default EntitiesContainer