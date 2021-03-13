import EventBus from "../../../services/EventBus";

const entity_tracker_filter = (ctx,next)=>{

    var entity = ctx.getEntity();
    var ret = next(ctx);
    var entity_after = ctx.getEntity();
    var is_added = entity_after && !entity;
    
    if (is_added){
        //console.error(EventBus.Events.Names.EntityAdded);
        EventBus.publish(EventBus.Events.EntityAdded(entity_after));
    }
    
    
    return ret;
}
export default entity_tracker_filter;