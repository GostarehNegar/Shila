import React from 'react';


// Using "Stateless Functional Components"
const Chats= props =>{
    
  return (
    props.users.map(x=>
    
    <p>
        {x.name} 
    </p>
    )
    );
}

export default Chats