import React,{ useState } from 'react';
import { restrictionList, statusList } from '../tools'

const Form = () =>{
  const [name, setName] = useState('');
  const [guest, setGuest] = useState('');
  const [initials, setInitials] = useState('');
  const [typeOfId, setTypeOfId] = useState('');
  const [restrictions, setRestrictions] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault() 
    const data = [name, guest, initials, typeOfId, restrictions, status, notes]
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
        case 'restrictions':
          updateFn = setRestrictions;
          break;
        case 'status':
          updateFn = setStatus;
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
          <p>Name</p>
          <input placeholder="Name" value={name} onChange={(e) => handleChange(e, "name")} /> 
          <p>Guest</p>
          <input placeholder="Guest" value={guest} onChange={(e) => handleChange(e, "guest")} />
          <p>Employee Initials</p>
          <input placeholder="Employee Initials" value={initials} onChange={(e) => handleChange(e, "initials")} />
          <p>ID Type</p>
          <input placeholder="ID Type" value={typeOfId} onChange={(e) => handleChange(e, "typeOfId")} />
          <p>Restrictions</p>
          <select value={restrictions} onChange={(e) => handleChange(e, "restrictions")}>
            {restrictionList.map(e => <option value={e} key={e}>{e}</option>)}
          </select>
          <p>Status</p>
          <select value={status} onChange={(e) => handleChange(e, 'status')}>
            {statusList.map(e => <option value={e} key={e}>{e}</option>)}
          </select>
          <p>Notes</p>
          <input placeholder="notes" value={notes} onChange={(e) => handleChange(e, "notes")} />
          <button>Submit</button>
       </form>
    )
}

export default Form;
