import React,{ useState, useEffect, useReducer } from 'react';
import { restrictionList, statusList } from '../tools'

const Form = () =>{
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      name: '',
      initials: '',
      restrictions: '',
      status: '',
      typeOfId: '',
      issuedOn: '',
      expiresOn: '',
      notes: '',
    }
  );

  const [permission, setPermission] = useState('-- enter name for permission status--');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = evt => {
    const { name, value} = evt.target;
    setUserInput({[name]: value});
  }

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     // Send Axios request here
  //     setPermission('-- enter name for permission status--')
  //   }, 1500)
    
  //   return () => clearTimeout(delayDebounceFn)
  // }, [name])

  const handleSubmit = async (e) => {
    e.preventDefault() 
    const data = {
      "name": userInput.name,
      "initials": userInput.initials,
      "restrictions": userInput.restrictions,
      "status": userInput.status,
      "idtype": userInput.typeOfId,
      "cardissue": userInput.issuedOn,
      "cardexp": userInput.expiresOn,
      "notes": userInput.notes,
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
    } else {
      Object.keys(data).map(e => {
        //return handleChange("", e);
        console.log(e);
      });
    };
  };

  return (
      <form data-testid='passes-form' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input name='name' value={userInput.name} onChange={handleChange} /> 
        <label htmlFor='permission'>Permission status</label>
        <p name='permission'>{permission}</p>
        <label htmlFor='employee_initials'>Employee Initials</label>
        <input data-testid='form-input' name="initials" value={userInput.initials} onChange={handleChange} />
        <label htmlFor='id_type'>ID Type</label>
        <input data-testid='form-input' name="typeOfId" value={userInput.typeOfId} onChange={handleChange} />
        <label htmlFor='restrictions'>Restrictions</label>
        <select name='restrictions' value={userInput.restrictions} onChange={handleChange}>
          {restrictionList.map(e => <option value={e} key={e}>{e}</option>)}
        </select>
        <label htmlFor='status'>Status</label>
        <select name='status' value={userInput.status} onChange={handleChange}>
          {statusList.map(e => <option value={e} key={e}>{e}</option>)}
        </select>
        <label htmlFor='issued_on'>Card Issued On</label>
        <input data-testid='form-input' name='issuedOn' type='date' value={userInput.issuedOn} onChange={handleChange} />
        <label htmlFor='expires_on'>Expiration Date</label>
        <input data-testid='form-input' name='expiresOn' type='date' value={userInput.expiresOn} onChange={handleChange} />
        <label htmlFor='notes'>Notes</label>
        <input data-testid='form-input' name='notes' value={userInput.notes} onChange={handleChange} />
        <button>Submit</button>
        <div className='msgWrap'>
          <span name='errorMsg'>{errorMsg}</span>
        </div>
      </form>
  )
}

export default Form;
