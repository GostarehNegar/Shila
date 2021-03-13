import {
    createReducer
} from 'redux-create-reducer'
import * as actionTypes from '../constants/chatActionTypes'
function updateObject(oldObject, newValues) {
    // Encapsulate the idea of passing a new object as the first parameter
    // to Object.assign to ensure we correctly copy data instead of mutating
    return Object.assign({}, oldObject, newValues)
  }
  
  function updateItemInArray(array, itemId, updateItemCallback) {
    const updatedItems = array.map(item => {
      if (item.id !== itemId) {
        // Since we only want to update one item, preserve all others as they are now
        return item
      }
  
      // Use the provided callback to create an updated item
      const updatedItem = updateItemCallback(item)
      return updatedItem
    })
}
  
const initialState = {
    byId: [{
        id: 1,
        conversationId: 1,
        text: "hi there"
    }],
    allIds: [1]
}

export default createReducer(initialState, {
    [actionTypes.NEW_MESSAGE](state, action) {
        
        console.debug("New MESSAGE")
        const new_by_ids =state.byId.concat({id:2,text:action.payload.text})
        return{
            ...state,
            byId:new_by_ids
        }
    }

});

export const getMessages = state => state.messages.byId