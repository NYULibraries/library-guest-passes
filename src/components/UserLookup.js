import { useState, useEffect, useReducer } from 'react';

const UserLookup = ({ name, results }) => {
 if(results){
  return (
    <div>
      {results.map(e => <div>{e.id}</div>)}
    </div>
  )
 }
 return (<div></div>)
}

export default UserLookup