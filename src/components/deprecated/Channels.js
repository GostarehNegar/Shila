import React from 'react';
import {BrowserRouter,Link} from 'react-router-dom'


// Using "Stateless Functional Components"
const renderItem =x=><p>x</p>;
const Channels= props =>{
  return (
    <div>
        {props.items.map((x,i)=>
        <p key={i}><Link to={'./'+x.id}>{x.id}</Link>{x.version}  {(x.payload||{}).name}</p>

        )}
  </div>

    );
}

export default Channels