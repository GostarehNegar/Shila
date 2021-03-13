
import * as React from 'react';
import {
  Avatar,
  ConversationHeader,
  MessageList,
  ChatContainer,
  VoiceCallButton,
  InfoButton,
  MessageSeparator,
  Message,
  MessageInput,
  VideoCallButton,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

import emily from '../static/emily.svg'
import zoeIco from '../static/zoe.svg'
export class Chat extends React.Component {

  constructor(props) {
    super(props);

  }
  renderMessage(m) {
    return <Message key={m.id} model={{
      message: m.text,
      sentTime: "15 mins ago",
      sender: "Zoe",
      direction: "incoming",
      position: "single"
    }}>
      <Avatar src={zoeIco} name="Zoe" />
    </Message>
  }

  render() {
    var props = this.props;
    return <ChatContainer>
      <ConversationHeader>
        <ConversationHeader.Back />
        <Avatar src={zoeIco} name="Zoe" />
        <ConversationHeader.Content userName="Zoe" info="Active 10 mins ago" />
        <ConversationHeader.Actions>
          <VoiceCallButton />
          <VideoCallButton />
          <InfoButton />
        </ConversationHeader.Actions>
      </ConversationHeader>
      <MessageList typingIndicator={<TypingIndicator content="Zoe is typing" />}>
        <MessageSeparator content="Saturday, 30 November 2019" />
        {props.messages.map((m, i) => this.renderMessage(m))}
      </MessageList>
      {/* <MessageInput placeholder="Type message here" value={messageInputValue} onChange={val => setMessageInputValue(val)} onSend={() => setMessageInputValue("")} /> */}
      <MessageInput placeholder="Type message here" value={"this.state.messageInputValue"} onChange={val => this.setMessageInputValue(val)} onSend={() => this.setMessageInputValue("")} />
    </ChatContainer>

  }
}
export default Chat