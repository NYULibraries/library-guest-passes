import React,{useState} from 'react';

function Form(){
 const [name,setName] = useState('');

 function handleNameChange(e){ setName(e.targe.value) }
 function handleSubmit(e){
   e.preventDefault() 
     console.log(name); }

    return (
        <form onSubmit={handleSubmit}>
          <input placeholder="Name" value={name} onChange={handleNameChange}/>          
          <button>Submit</button>
       </form>
    )
}

export default App;
