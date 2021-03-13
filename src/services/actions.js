export const ENTITY_APPLY_EVENT = "ENTITY_APPLY_EVENT"
export const SEND_MESSAGE_TO_CHANNEL = "SEND_MESSAGE_TO_CHANNEL"

export const Types = {
    ENTITY_APPLY_EVENT: "ENTITY_APPLY_EVENT",
    SEND_MESSAGE_TO_CHANNEL: "SEND_MESSAGE_TO_CHANNEL",
    CONNECTION_CLOSED :'CONNECTION_CLOSED',
    CONNECTION_STATUS_CHANGED :'CONNECTION_STATUS_CHANGED',
    CONNECTION_STATUS_CONNECTED :"CONNECTION_STATUS_CONNECTED",
    CONNECTION_STATUS_DISCONNECTED :"CONNECTION_STATUS_DISCONNECTED",
    SIGN_OUT : 'SIGN_OUT',
    SIGN_IN : 'SIGN_IN',
    SIGNED_IN : 'SIGNED_IN',
    REFRESH : 'REFRESH',
    FORGET : 'FORGET'

}
export const Actions = {
    Types: Types,
    applyEvent: (payload) =>
        ({
            type: Types.ENTITY_APPLY_EVENT,
            payload: payload
        }),
    sendMessageToChannel : (channelId,text)=>({
        type:Types.SEND_MESSAGE_TO_CHANNEL,
        payload:{
            text:text,
            channelId:channelId
        }
    
    })
        
}
