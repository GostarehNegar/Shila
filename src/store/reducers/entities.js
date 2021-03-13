import { createReducer } from 'redux-create-reducer'
import { chatStarted } from '../actions/chatActions';
import * as actionTypes from '../constants/chatActionTypes'
import utils from "../../services/utils"
import bus from "../../services/EventService"
import pipeline from "./Pipeline/pipeline"



/*
 * We use a document store schema.
 * The store is partitioned by entity type.
 * Each entity has:id, name, type, version and payload.
 * 
*/
const initialState = {
    'channel':{
        // 'channel-id': {
        //     id: 'channel-id',
        //     name: 'channel 1',
        //     type:'channel',
        //     version:0,
        //     payload:{},
        //     children:[],
        //     messages:[]
        // },
    },

}

/*
 * Events should have:
 *   channelId: The channel id they have been received in.
 *   Version: The version of event.\
 *   payload: The event payload.
 * This payload should have 
 *   type: event type (e.g added, updated, deleted)
 *   entityType: The entity type it refers to
 *   id : Id of entity
 *   payload: the event payload which is normally added to entity 
 *              payload. 
 *    
*/

function _getEntityById(state, type,id) {
    if (state[type] && state[type][id])
        return state[type][id];
    return null;
}
const invoke = (p, ctx, idx)=>{
    idx = idx|| 0;
    if (idx>=p.length){
        return ctx.state ;
    }
    return p[idx](ctx,(x)=>invoke(p,x,++idx));
}

export default createReducer(initialState, {
    [actionTypes.ENTITY_APPLY_EVENT](state, action) {
        if(!action.payload)
            return;
        var p = [];
        //p.push(log_step);
        p.push(pipeline.logFilter);
        p.push(pipeline.tracker)

        //p.push(validate_step);
        p.push(pipeline.validateFilter);
        //p.push(version_control_step);
        p.push(pipeline.versionControlFilter)
        //p.push(final_apply_step);
        p.push(pipeline.updateFilter);
        //p.push(remove_entity_step);
        p.push(pipeline.removeFilter);

        if (typeof action.payload.length==='undefined')
            {
                var ctx = pipeline.createPipeLineContext(state, action);
                invoke(p, ctx);
                return ctx.state;
            }
        var q = action.payload;
        q.forEach(ev => {
            var ctx =pipeline.createPipeLineContext(state, {
                type: actionTypes.ENTITY_APPLY_EVENT,
                payload: ev
            });
            invoke(p, ctx);
            state = ctx.state;
        });
        return state;
    },
    [actionTypes.ENTITY_CLEAR_DB](state,action){
        return {
			
		}
    }

});

export const getEntities = (state,type)=>{
    var result =[];
    var obj = state.entities[type] || {}
    for (let key in obj) {
        result.push(obj[key]);
      }
      return result;

};
export const getEntityById = (state,type,id)=> _getEntityById(state.entities,type,id)
export const getChannels = state => getEntities(state,'channel');
export const getChannelById = (state,id) => _getEntityById(state.entities,'channel',id);
export const getMessages = (state,channelId) => {
    var channel = _getEntityById(state.entities,'channel',channelId)||{}
    var messages = channel.messages || [];
    var result =[]
    messages.map(x=>result.push(_getEntityById(state.entities,'message',x)||{}) );
    return result;
}
