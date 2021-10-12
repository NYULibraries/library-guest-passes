import React,{ useState, useReducer } from 'react';

const backendDomain = `${
  process.env.REACT_APP_BACKEND_FULL_HOST || "http://localhost:5000"
}`;

const EditVisitor = (props) =>{
  const visitorObject = props.state
  const [name, setName] = useState("");
  const [permissionStatus, setPermissionStatus] = useState();

  const onClose = (e) => {
    props.onClose && props.onClose(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault() 
      fetch(`${backendDomain}/${visitorObject.typeOfVisitor}/${visitorObject.id}`, {
        method: "PUT",
        mode: "cors",
        cache: "default",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: name, permission_status: permissionStatus})
      })
      .then(res => res.text())
      .then(res => console.log(res))
  }

  if(!props.show){return null}
  return (
      <div>
        { 
          visitorObject && visitorObject.hasOwnProperty('name') ? 
          <form onSubmit={handleSubmit}>
            <input placeholder="Name" name="name" defaultValue={visitorObject.name} onChange={(e) => setName(e.target.value)} /> 
            <input placeholder="Permission Status" name="permission_status" defaultValue={visitorObject.permission_status} onChange={(e) => setPermissionStatus(e.target.value)} />
            <button>Submit</button>
          </form> : <div><h1>Hello!!</h1></div>
        }
        <div>
          <button className="toggle-button" onClick={onClose}> Close </button>
        </div>
      </div>
      
  )
}

export default EditVisitor;