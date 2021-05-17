import React,{ useState } from 'react';

const Form = () =>{
  const [name,setName] = useState('');
  const [guest,setGuest] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault() 
    console.log(); 
  }
  const handleChange = (e, type) => {
    let updateFn;
    switch (type){
      case 'name':
        updateFn = setName;
        break;
      case 'guest':
        updateFn = setGuest;
        break;
    }
  }

    return (
        <form onSubmit={handleSubmit}>
          <input placeholder="Name" value={name} onChange={(e) => handleChange(e, "name")} /> 
          <input placeholder="Guest" value={guest} onChange={(e) => handleChange(e, "guest")} />
          <button>Submit</button>
       </form>
    )
}

export default Form;
