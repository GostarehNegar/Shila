const log_step = (ctx,next)=>{
    var ret = null;
    console.log("Pipeline Starts Channel:", ctx.getChannel(), "action:",ctx.action)
    try
    {
        
        ret = next(ctx)
    }
    catch (e){
        console.error("An error occured in pipeline:",e)
    }
    console.log("Pipeline Finish Channel:", ctx.getChannel(), "action:",ctx.action)
    return ret;
}

export default log_step