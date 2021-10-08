import React,{ useReducer } from 'react';

const backendDomain = `${
  process.env.REACT_APP_BACKEND_FULL_HOST || "http://localhost:5000"
}`;

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
    if(userInput.name === ""){
      setUserInput({name: visitorObject.name})
    } else if (userInput.permission_status === "") {
      setUserInput({permissionStatus: visitorObject.permission_status})
    }

    fetch(`${backendDomain}/${visitorObject.typeOfVisitor}/${visitorObject.id}`, {
      method: "PUT",
      mode: "cors",
      cache: "default",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: userInput.name, permission_status: userInput.permissionStatus})
    })
    .then(res => res.text())
    .then(res => console.log(res))
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