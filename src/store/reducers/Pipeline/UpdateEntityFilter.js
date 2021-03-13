



var final_apply_step = (ctx,next)=>{
    var state = ctx.state;
    var action = ctx.action;
    var channelId = action.payload.channelId;
    //var version = action.payload.version;
    //var payload = action.payload.payload;
    var entityId = ctx.getEntityId();// payload.entityId;
    var entityType = ctx.getEntityType();//  payload.entityType;
    //var eventType = payload.eventType;
    //var entityPayload = payload.payload;
    /*
     * check if channel exists...    
    */
    //debugger;
    var channel = ctx.getChannel() || {
        type: 'channel',
        id: channelId,
        name: 'new',
        version: 0
    };
    if (action.payload && Number.isInteger(action.payload.version) && action.payload.version > -1) {
        channel.version = action.payload.version;
    }
    channel.children= channel.children || [];
    channel.messages= channel.messages || [];
    var entity = ctx.merge();
    //var message= ctx.merge();
    if (entity && entityId && entityType) {
        //entity = ctx.merge();
        switch(entityType)
        {
            case 'message':
                if (!channel.messages.includes(entity.id))
                    channel.messages.push(entityId);
                break;
            case 'channel':
                if (entity.id === channelId){
                    channel = Object.assign({},channel,entity);
                }
                break;
            default: 
                var exists = channel.children
                    .findIndex(val=> val && val.id == entityId && val.entityType == entityType) >-1;
                if (!exists)
                    channel.children.push({
                        type: entityType,
                        id: entityId
                    })
                break;
        }
    }
    channel.id = channelId;
    //if (entity && entityType && entityId &&  entityType!='channel'){
    if (entity && entityType && entityId &&  entityId!=channelId){
        /// If we have and entity
        /// We should update it
        ctx.state = {
            ...state,
            'channel':{
                ...state.channel,
                [channelId]:channel
            },
            [entityType]:{
                ...state[entityType],
                [entityId]:entity,
            }
        };
        console.info("Entity '"+entityType+"' successfully updated:",entity)
        //return next(ctx);
    }
    else if(channel && channelId) {
        // Otherwise just update channel
        ctx .state=
        {
            ...state,
            'channel':{
                ...state.channel,
                [channelId]:channel
            }
        };
        console.info("Channel '"+channelId+"' successfully updated:",channel)
        //return next(ctx);
    } else{
        console.error(
            "Unexpected Error: Bad channel! Cannoy figure out the channel/entity for this action:", action
        )

    }

    return next(ctx);
}

export default final_apply_step