import React,{ useState, useEffect } from 'react';
import { restrictionList, statusList } from '../tools'

const Form = () =>{
  const [name, setName] = useState('');
  const [permission, setPermission] = useState('-- enter name for permission status--');
  const [initials, setInitials] = useState('');
  const [typeOfId, setTypeOfId] = useState('');
  const [restrictions, setRestrictions] = useState('');
  const [status, setStatus] = useState('');
  const [issuedOn, setIssuedOn] = useState('');
  const [expiresOn, setExpiresOn] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Send Axios request here
      setPermission('-- enter name for permission status--')
    }, 1500)
    
    return () => clearTimeout(delayDebounceFn)
  }, [name])

  const handleSubmit = async (e) => {
    e.preventDefault() 
    const data = {
      "name": name,
      "initials": initials,
      "restrictions": restrictions,
      "status": status,
      "idtype": typeOfId,
      "cardissue": issuedOn,
      "cardexp": expiresOn,
      "notes": notes,
    }

    const response = await fetch("http://localhost:5000/users", {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if(response.status === 500){
      setErrorMsg("Oops! Something went wrong. Please fill out all fields.");
    }
  }

  return (
      <form data-testid='passes-form' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input id='name' value={name} onChange={(e) => handleChange(e, "name")} /> 
        <label htmlFor='permission'>Permission status</label>
        <p id='permission'>{permission}</p>
        <label htmlFor='employee_initials'>Employee Initials</label>
        <input data-testid='form-input' id="employee_initials" value={initials} onChange={(e) => handleChange(e, "initials")} />
        <label htmlFor='id_type'>ID Type</label>
        <input data-testid='form-input' id="id_type" value={typeOfId} onChange={(e) => handleChange(e, "typeOfId")} />
        <label htmlFor='restrictions'>Restrictions</label>
        <select id='restrictions' value={restrictions} onChange={(e) => handleChange(e, "restrictions")}>
          {restrictionList.map(e => <option value={e} key={e}>{e}</option>)}
        </select>
        <label htmlFor='status'>Status</label>
        <select id='status' value={status} onChange={(e) => handleChange(e, 'status')}>
          {statusList.map(e => <option value={e} key={e}>{e}</option>)}
        </select>
        <label htmlFor='issued_on'>Card Issued On</label>
        <input data-testid='form-input' id='issued_on' type='date' value={issuedOn} onChange={(e) => handleChange(e, 'issuedOn')} />
        <label htmlFor='expires_on'>Expiration Date</label>
        <input data-testid='form-input' id='expires_on' type='date' value={expiresOn} onChange={(e) => handleChange(e, 'expiresOn')} />
        <label htmlFor='notes'>Notes</label>
        <input data-testid='form-input' id='notes' value={notes} onChange={(e) => handleChange(e, 'notes')} />
        <button>Submit</button>
        <div className='msgWrap'>
          <span id='errorMsg'>{errorMsg}</span>
        </div>
      </form>
  )
}

export default Form;
