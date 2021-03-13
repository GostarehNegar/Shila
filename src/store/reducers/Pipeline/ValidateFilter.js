const validate_step = (ctx,next)=>{
    var ev = ctx.action.payload
    var isValid = ctx && ctx.action && ctx.action.payload 
        &&  ctx.action.payload.channelId && ctx.action.payload.version;
    if (!isValid){
        console.warn("Invalid Event :", ctx.action )
        return ctx.state;
    }
    return next(ctx);
}

export default validate_step