import React from 'react';
import { useState } from 'react';
import {BrowserRouter,Link} from 'react-router-dom'

Array.prototype.mapEx = function name(callBack) {

  return this.map((x, i) => {
    //x.message = ()=>x.Message;
    //x.payload.Message = "llkk"
    x.message = x.payload.Message;
    return callBack(x, i);
  });

}

// Using "Stateless Functional Components"
const renderItem = x => <p>x</p>;
const ChannelMessages = props => {
  const [messageInputValue, setMessageInputValue] = useState("kk");
  return (
    <div>
      <div>{props.name} </div>
      <div>
        <input placeholder="Type message here" value={messageInputValue} onChange={val => setMessageInputValue(val.target.value)} />
        <button onClick={ev=>props.sendMessageToChannel(messageInputValue, props.channelId)}>Send</button>
        <Link to="home">Home</Link>
      </div>
      <div>
        {props.items.mapEx((x, i) =>
          <p key={x.id}>{x.id} {x.version} {x.payload.message} by: </p>
        )}
      </div>
    </div>

  );
}

export default ChannelMessages