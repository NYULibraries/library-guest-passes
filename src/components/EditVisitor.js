import React,{ useEffect, useState, useReducer } from 'react';

const backendDomain = `${
  process.env.REACT_APP_BACKEND_FULL_HOST || "http://localhost:5000"
}`;

const EditVisitor = (props) =>{
  // const [name, setName] = useState('');
  // const [permissionStatus, setPermissionStatus] = useState();
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      permissionStatus: null,
    })

  const { typeOfVisitor, id } = props.match.params

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserInput({ [name]: value });
  };

  const fetchVisitorInfo = () => {
    fetch(`${backendDomain}/${typeOfVisitor}/${id}`)
      .then(res => res.json())
      .then(json => {
        setUserInput({name: json.name, permissionStatus: json.permission_status})
      });
  }

  useEffect(() => {
    fetchVisitorInfo()
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault() 
    console.log(e); 
  }

    return (
        <div>
          { 
            userInput.permissionStatus ? 
            <form onSubmit={handleSubmit}>
            <input placeholder="Name" value={userInput.name} onChange={handleChange} /> 
            <input placeholder="Permission Status" value={userInput.permissionStatus.toString()} onChange={handleChange} />
            <button>Submit</button>
            </form> : <div></div>
          }
        </div>
       
    )
}

export default EditVisitor;