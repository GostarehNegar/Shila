import {
    HubConnectionBuilder,
    LogLevel,
    HttpTransportType
} from "@microsoft/signalr"
import { channel } from "redux-saga";
import {
    connecionClosed,
    connectionStatusChanged,
    newConversation,
    newMessage,
    newPhoneCall,signIn,signedIn,
    applyEvent
} from "./actions/chatActions";
import * as actionTypes from './constants/chatActionTypes'
import { REHYDRATE } from 'redux-persist';

import {getAuthorizationToken} from './reducers/app'
import {getChannels,getChannelById} from './reducers/entities';
//import statics from "./staticStoreAPI";
import singleton from "../services/singleton"
import Config from "../services/config";
import { Actions } from "../services/actions";
import ServiceLocator from "../services/ServiceLocator";
import constants from "../services/constants";








const connection = new HubConnectionBuilder()
    .configureLogging(LogLevel.Information)
    //.withAutomaticReconnect()
    .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: retryContext => {
            if (retryContext.elapsedMilliseconds < 60000) {
                // If we've been reconnecting for less than 60 seconds so far,
                // wait between 0 and 10 seconds before the next reconnect attempt.
                return Math.random() * 5000;
            } else {
                // If we've been reconnecting for more than 60 seconds so far, stop reconnecting.
                if (retryContext.previousRetryCount<100){

                    return Math.random() * 100000
                }
                return null
            }
        }
    })
    .withUrl( Config.serverUrl, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
    })
    //.configureLogging(signalR.LogLevel.Debug)
    .build();

const processApplyEvent = (storeAPI, events)=>
{
    console.info("processApplyEvent  ", events)
    //debugger
    if (events==null)
        return;
    /// Convert it to array if it's not
    if (!events.length){
        events = [events];
    }
    if (1==1){
        //storeAPI.dispatch(new applyEvent(events));
        storeAPI.dispatch(Actions.applyEvent(events));
    }
    else {
        events.map(ev=>{
            storeAPI.dispatch(new applyEvent(ev));
        })
    }
}

const DoStart = (storeAPI) => {
    var state = storeAPI.getState();
    if (!state._persist || !state._persist.rehydrated){
        //debugger;
        console.error("rehydration!!!")
        return
    }
    var startModel ={};
    startModel.channels=[];
    var channels = getChannels(state);
    channels.forEach(x => {
        console.debug("StartModel:",x, "State=",state)
        startModel.channels.push({id:x.id,version:x.version})
    });
    console.info("******************connected*************");
    var token = getAuthorizationToken(storeAPI.getState());
    connection.invoke("Authorize",token ,startModel)

    .then(res=>{
        console.info("Connection Successfully Authroized")
        //storeAPI.dispatch(connectionStatusChanged('connected'))
    })
    .catch(err=>{
        console.error("Authorization Failed")

    });



};

const signalRMiddleware = function (storeAPI) {

    singleton.storeAPI = storeAPI;
    ServiceLocator.register(constants.serviceNames,s=>storeAPI);
    connection.on("apply", ev => processApplyEvent(storeAPI, ev));
    connection.onclose(err => storeAPI.dispatch(connectionStatusChanged('close')))
    connection.onreconnected(err => storeAPI.dispatch(connectionStatusChanged('reconnected')))
    connection.onreconnecting(x => {
        storeAPI.dispatch(connectionStatusChanged('reconnection'));
    });
    if (1==1){
    connection.start()
        .then(x => {
            setTimeout(()=>{
                storeAPI.dispatch(connectionStatusChanged('connected'));
            },500);
        })
        .catch(err => {
            console.error("Error on start...")

        });
    }
    return function (next) {
        return function (action) {
            if (action.type == actionTypes.SIGN_IN) {
                console.debug("sign in ", action.payload)
                connection.invoke('signIn', action.payload)
                    .then(res => {

                        console.debug("Successfully signed in. payload: ", res)
                        storeAPI.dispatch(signedIn(res))
                        storeAPI.dispatch({type:actionTypes.ENTITY_CLEAR_DB,payload:{}});
                        DoStart(storeAPI);

                    })
                    .catch(err => {
                        console.error("an error occured whilte tringto signIn: " + err)

                    })
            }
            if (action.type == actionTypes.REFRESH) {

                console.debug("Invoking refresh...")
                connection.invoke('refersh', action.payload)
                    .then(res => {

                        console.debug("Successfully refershed in. payload: ", res)
                        //storeAPI.dispatch(signedIn(res))
                    })
                    .catch(err => {
                        console.error("an error occured whilte tringto signIn: " + err)

                    })

            }
            if (action.type===Actions.Types.SEND_MESSAGE_TO_CHANNEL){
                console.log("sending to server", action);
                connection.invoke("execute",JSON.stringify(action));
            }
            let result = next(action)
            if (action.type==actionTypes.CONNECTION_STATUS_CHANGED){
                if (action.payload && (
                    action.payload.status==='connected' || 
                    action.payload.status==='reconnected')){
                    console.info("Reconnected to server. We will apply start.")
                        DoStart(storeAPI);
                    
                }
            }
            console.log('signalr next state', storeAPI.getState())

            return result

        }
    }
}

export default signalRMiddleware