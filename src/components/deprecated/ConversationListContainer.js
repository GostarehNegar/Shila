import React from 'react';

import {ExpansionPanel} from "@chatscope/chat-ui-kit-react";
// Using "Stateless Functional Components"
const renderItem =x=><p>x</p>;
const Panel= props =>{
    
  return (
    <ExpansionPanel open={props.data.open} title={props.data.title}>
        {props.data.items.map(x=>
        <p>{x}</p>
        )}
  </ExpansionPanel>

    );
}

export default Panel