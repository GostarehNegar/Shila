const version_control_step = (ctx,next)=>{
    var prev_version = ctx.getChannel().version;
    var event_version = ctx.action.payload.version;
    if (typeof event_version === 'number' && isFinite(event_version)){
        var diff = event_version - prev_version;
        if (diff<0){

        }
        if (diff>1){
        }
    }
    var ret = next(ctx);
    var new_version = ctx.getChannel().version;
    ctx.getChannel().status= '';
    console.log("Version of "+ ctx.getChannelId() +" Changed From",prev_version, " to", new_version);
    return ret;
}

export default version_control_step;