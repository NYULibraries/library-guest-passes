import React,{ useState, useEffect } from 'react';
import { restrictionList, statusList } from '../tools'
//import { checkPermission } from '../helpers'

const Form = () =>{
  const [name, setName] = useState('');
  const [permission, setPermission] = useState('');
  const [guest, setGuest] = useState('');
  const [guestPermission, setGuestPermission] = useState('');
  const [initials, setInitials] = useState('');
  const [typeOfId, setTypeOfId] = useState('');
  const [restrictions, setRestrictions] = useState('');
  const [status, setStatus] = useState('');
  const [issuedOn, setIssuedOn] = useState('');
  const [expiresOn, setExpiresOn] = useState('');
  const [notes, setNotes] = useState('');

  const artificialPromise = () => {
    setTimeout(()=> {
      setPermission('-- enter name for permission status--')
    }, 1500)
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Send Axios request here
      artificialPromise();
      setPermission(name)
    }, 1500)
    
    return () => clearTimeout(delayDebounceFn)
  }, [name])

  useEffect(() => { 
    const delayDebounceFn = setTimeout(() => {
      // Send Axios request here
      setPermission('-- enter name for permission status--')
      setGuestPermission(guest)
    }, 1500)
    
    return () => clearTimeout(delayDebounceFn)
  }, [guest])

  const handleSubmit = (e) => {
    e.preventDefault() 
    const data = [name, guest, initials, typeOfId, restrictions, status, notes, issuedOn]
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
      case 'issuedOn':
        updateFn = setIssuedOn;
        break;
      case 'expiresOn':
        updateFn = setExpiresOn;
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
          <label htmlFor='name'>Name</label>
          <input id='name' value={name} onChange={(e) => handleChange(e, "name")} /> 
          <label htmlFor='permission'>Permission status</label>
          <p id='permission'>{permission}</p>
          <label htmlFor='guest'>Guest</label>
          <input id="guest" value={guest} onChange={(e) => handleChange(e, "guest")} />
          <label htmlFor='guestPermission'>Permission status</label>
          <p id='guestPermission'>{guestPermission}</p>
          <label htmlFor='employee_initials'>Employee Initials</label>
          <input id="employee_initials" value={initials} onChange={(e) => handleChange(e, "initials")} />
          <label htmlFor='id_type'>ID Type</label>
          <input id="id_type" value={typeOfId} onChange={(e) => handleChange(e, "typeOfId")} />
          <label htmlFor='restrictions'>Restrictions</label>
          <select id='restrictions' value={restrictions} onChange={(e) => handleChange(e, "restrictions")}>
            {restrictionList.map(e => <option value={e} key={e}>{e}</option>)}
          </select>
          <label htmlFor='status'>Status</label>
          <select id='status' value={status} onChange={(e) => handleChange(e, 'status')}>
            {statusList.map(e => <option value={e} key={e}>{e}</option>)}
          </select>
          <label htmlFor='issued_on'>Card Issued On</label>
          <input id='issued_on' type='date' value={issuedOn} onChange={(e) => handleChange(e, 'issuedOn')} />
          <label htmlFor='expires_on'>Expiration Date</label>
          <input id='expires_on' type='date' value={expiresOn} onChange={(e) => handleChange(e, 'expiresOn')} />
          <label htmlFor='notes'>Notes</label>
          <input id='notes' value={notes} onChange={(e) => handleChange(e, 'notes')} />
          <button>Submit</button>
       </form>
    )
}

export default Form;
