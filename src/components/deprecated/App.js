import * as React from 'react'
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import './chats'
import ChatContainer from './ChatContainer'



import {
    EllipsisButton,
    MainContainer,
    Sidebar,
    ConversationList,
    Conversation,
    Avatar,
    Search,
} from "@chatscope/chat-ui-kit-react";
import Chats from './chats';
import Panel from './Panel';
import { Button } from '@chatscope/chat-ui-kit-react/dist/cjs/Buttons/Button';


class App extends React.Component {
    state = {
        theme: 'defaultTheme',
        messageInputValue:"*"
    }

    renderConversations = x=>
    <Conversation {... x} key ={x.idx} >
    <Avatar {...x.avatar} />
    <Conversation.Operations>
            <Button onClick={() =>x.delete(x)} >delete</Button>
          </Conversation.Operations>
    </Conversation>
    

    
    handleThemeChange = ({ target }) => {
        console.log('target.name', target.name)
        this.setState({
            theme: target.name + 'Theme'    ,
        })
    }
    setMessageInputValue= v=>{this.setState({messageInputValue:v})};
    
    render() {
        //const [messageInputValue, setMessageInputValue] = useState("");
        return (
            <div style={{
                height: "600px",
                position: "relative"
              }}>
                          <MainContainer responsive>                                   
                            <Sidebar position="left" scrollable={false}>
                                <section>
                            <EllipsisButton orientation="vertical" /> 
                              <Button onClick={this.props.signOut}>Logout</Button>
                              <Button onClick={this.props.refresh}>Refresh</Button>
                              </section>
                              <Search placeholder="Search..." />
                              <ConversationList>                                                     
                                {this.props.conversations.map((x,idx)=>this.renderConversations({...x,idx,delete:this.props.deleteConversation}))}
                              </ConversationList>
                            </Sidebar>
                            <ChatContainer/>
                              <Sidebar position="right">
                                  {this.props.panels.map(x=>
                                  <Panel data={x}/>
                                  )}
                              </Sidebar>            
                          </MainContainer>
                          <Chats users={[{name:'babak'},{name:'ahmad'}]}  />
                          <button onClick={this.props.newConversation}> HI </button>
                                  <p>{this.props.connectionStatus}</p>

                        </div>
       
        )
    }
}

export default App
