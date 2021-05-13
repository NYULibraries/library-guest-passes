import React,{useState} from 'react';

const Form = () =>{
 const [name,setName] = useState('');
 const [guest,setGuest] = useState('');

 const handleNameChange = (e) => { setName(e.targe.value) }
 const handleSubmit = (e) => {
    e.preventDefault() 
    console.log(name); 
  }

    return (
        <form onSubmit={handleSubmit}>
          <input placeholder="Name" value={name} onChange={handleNameChange}/> 
          {/* <input placeholder="Guest" value={guest} onChange= />          */}
          <button>Submit</button>
       </form>
    )
}

export default Form;
