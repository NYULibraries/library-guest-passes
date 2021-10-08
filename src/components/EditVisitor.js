import React,{ useState, useReducer } from 'react';


const EditVisitor = (props) =>{
  const visitorObject = props.location.state; 
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      permissionStatus: "",
    });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserInput({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault() 
    console.log(userInput); 
  }

    return (
        <div>
          { 
            visitorObject.hasOwnProperty('name') ? 
            <form onSubmit={handleSubmit}>
            <input placeholder="Name" name="name" defaultValue={visitorObject.name} onChange={handleChange} /> 
            <input placeholder="Permission Status" name="permission_status" defaultValue={visitorObject.permission_status} onChange={handleChange} />
            <button>Submit</button>
            </form> : <div></div>
          }
        </div>
       
    )
}

export default EditVisitor;