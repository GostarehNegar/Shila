
import utils from "../../../services/utils"
import tracker from "./EntityTrackerFilter"
import log_step from "./LogFilter"
import remove_entity_step from "./RemoveEntityFilter"
import updateFilter from "./UpdateEntityFilter"
import validate_step from "./ValidateFilter"
import version_control_step from "./VersionControlFilter"


function _getEntityById(state, type, id) {
    if (state[type] && state[type][id])
        return state[type][id];
    return null;
}

class PipelineContext {
    state = {};
    action = {}
    constructor(state, action) {
        this.state = state || {}
        if (action && action.payload && action.payload.payload && typeof action.payload.payload.payload === 'string') {
            try {
                action.payload.payload.payload = JSON.parse(action.payload.payload.payload)
            } catch (e) {}
        }
        this.action = action || {};

    }
    getChannelId = () => this.action.payload.channelId;
    getChannel = () => {
        var ret = _getEntityById(this.state, 'channel', this.getChannelId())
        if (!ret) {
            var channelId = this.getChannelId();
            ret = ret || {
                type: 'channel',
                id: channelId,
                name: 'new'
            };
        }
        return ret;
    }
    isValid = () => this.action && this.action.payload && this.action.payload.channelId;
    version = () => this.action.payload.version;
    payload1 = ()=> this.action.payload || {};
    payload2 = ()=>this.payload1().payload || {};
    payload3 = ()=> this.payload2().payload || {};
    isRemoveOperation = ()=> this.payload2().action == 'remove' || this.payload2().removed;
    isRemoveOperation_dep = () => this.action && this.action.payload && this.action.payload.payload && this.action.payload.payload.removed;
    getEntityId = () => this.action && this.action.payload && this.action.payload.payload ?
        this.action.payload.payload.id :
        null;
    getEntityType = () => this.action && this.action.payload && this.action.payload.payload ?
        this.action.payload.payload.type :
        null;
    getEntityName = () => this.action && this.action.payload && this.action.payload.payload ?
        this.action.payload.payload.name :
        null;

    getEntity = () => {
        var id = this.getEntityId();
        var type = this.getEntityType();
        return id && type ? _getEntityById(this.state, type, id) : null;

    }
    mergeAttributes = (entity) => {
        entity = entity || this.getEntity();
        if (entity) {
            var attribs = entity.payload || {};
            var payload_attribs = this.action && this.action.payload && this.action.payload.payload ?
                this.action.payload.payload.attributes || {} : {};
            try {
                entity.payload = Object.assign({}, entity.payload, payload_attribs)
            } catch (e) {}
        }

    }
    merge = (entity) => {
        entity = entity || this.getEntity();
        if (!entity) {
            var id = this.getEntityId();
            var type = this.getEntityType();
            if (id && type) {
                entity = {
                    type: type,
                    id: id,
                    payload: {}
                };
            }
        }
        if (entity ){
            var payload = this.action && this.action.payload && this.action.payload.payload
                ? this.action.payload.payload.payload || {}
                :{}
            entity.payload = Object.assign({},entity.payload,utils.clean(payload));
            entity.name = this.getEntityName() || entity.name;
            entity.description = this.payload2().description || entity.description;
            entity.channelId = this.getChannelId();
            this.mergeAttributes(entity);
        }
        return entity;


    }


}

const createPipeLineContext = (state, action) => {
    var result = {}
    //debugger;
    if (action && action.payload && action.payload.payload && typeof action.payload.payload.payload === 'string') {
        try {
            action.payload.payload.payload = JSON.parse(action.payload.payload.payload)
        } catch (e) {

        }
    }
    result.state = state;
    result.action = action;
    result.log = console.log;
    result.getChannelId = () => action.payload.channelId;
    result.getChannel = () => {
        var ret = _getEntityById(state, 'channel', result.getChannelId())
        if (!ret) {
            var channelId = result.getChannelId();
            ret = ret || {
                type: 'channel',
                id: channelId,
                name: 'new'
            };
        }
        return ret;
    }
    result.isValid = () => action && action.payload && action.payload.channelId;
    result.version = () => action.payload.version;
    result.isRemoveOperation = () => action && action.payload && action.payload.payload && action.payload.payload.removed;
    result.getEntityId = () => action && action.payload && action.payload.payload ? action.payload.payload.entityId : null;
    result.getEntityType = () => action && action.payload && action.payload.payload ? action.payload.payload.entityType : null;

    result.getEntity = () => {
        var id = result.getEntityId();
        var type = result.getEntityType();
        return id && type ? _getEntityById(state, type, id) : null;

    }
    console.error("pipeline");

    return result;

}





export default {
    tracker: tracker,
    updateFilter: updateFilter,
    removeFilter: remove_entity_step,
    versionControlFilter: version_control_step,
    logFilter: log_step,
    validateFilter: validate_step,
    createPipeLineContext: (state, action) => new PipelineContext(state, action)

}