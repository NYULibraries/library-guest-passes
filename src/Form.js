import React,{ useState } from 'react';

const Form = () =>{
  const [name, setName] = useState('');
  const [guest, setGuest] = useState('');
  const [initials, setInitials] = useState('');
  const [typeOfId, setTypeOfId] = useState('');
  const [notes, setNotes] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault() 
    const data = [name, guest, initials, typeOfId, notes]
    console.log(data); 
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
      case 'initials':
        updateFn = setInitials;
        break;
        case 'typeOfId':
          updateFn = setTypeOfId;
          break;
        case 'notes':
          updateFn = setNotes;
          break;
        default:
          return;
    }
    updateFn(e.currentTarget.value);
  }

    return (
        <form onSubmit={handleSubmit}>
          <input placeholder="Name" value={name} onChange={(e) => handleChange(e, "name")} /> 
          <input placeholder="Guest" value={guest} onChange={(e) => handleChange(e, "guest")} />
          <input placeholder="Employee Initials" value={initials} onChange={(e) => handleChange(e, "initials")} />
          <input placeholder="ID Type" value={typeOfId} onChange={(e) => handleChange(e, "typeOfId")} />
          <input placeholder="notes" value={notes} onChange={(e) => handleChange(e, "notes")} />
          <button>Submit</button>
       </form>
    )
}

export default Form;
