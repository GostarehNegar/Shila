import utils from "../../../services/utils";

const remove_entity_step = (ctx, next) => {
    if (ctx.isRemoveOperation()) {
        var id = ctx.getEntityId();
        var type = ctx.getEntityType();
        if (id && type) {
            var folder = ctx.state[type] || {};
            folder[id] = null;
            ctx.state[type] = utils.clean(folder);
            var channel = ctx.getChannel();
            var idx =-1;
            if (type === 'message') {
                idx = channel.messages.indexOf(id);
                if (idx>-1){
                    channel.messages.splice(idx,1);
                }
    
            } else {
                idx =  channel.children.findIndex(x => x.id === id && x.type === type);
                while (idx > -1) {
                    channel.children.splice(idx, 1);
                    idx =  channel.children.findIndex(x => x.id === id && x.type === type);
                }
            }
            console.info(
                "Entity '"+type +"' with id: ["+id+"] removed."
            )
        }
    }
    return next(ctx)

};

export default remove_entity_step