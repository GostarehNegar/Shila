import React from 'react';


// Using "Stateless Functional Components"
const renderItem =x=><p>x</p>;
const Entities= props =>{
    
  return (
    <div>
        {props.items.map(x=>
        <p>{x.id} {x.version} {x.name}</p>
        )}
  </div>

    );
}

export default Entities