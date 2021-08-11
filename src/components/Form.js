import { useState, useEffect, useReducer } from 'react';
import { restrictionList, statusList } from '../tools';
import { userLookupTrigger, postUser, emptyForm, delaySearchEffect, searchUserEffect, dropdownChoiceEffect } from '../helpers';

const backendDomain = `${process.env.REACT_APP_BACKEND_FULL_HOST || 'http://localhost:5000'}`

const Form = () =>{
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      name: '',
      initials: '',
      restrictions: '',
      status: '',
      idtype: '',
      cardexp: '',
      cardissue: '',
      notes: '',
      dropdownChoice: ''
    }
  );
  
  const [permission, setPermission] = useState('-- enter name for permission status--');
  const [message, setMessage] = useState('');
  const [searchResults, setSearchResults] = useState();
  const [debouncedName, setDebouncedName] = useState('');

  const handleChange = evt => {
    const { name, value} = evt.target;
    setUserInput({[name]: value});
  }
 
  useEffect(() => {
    delaySearchEffect(setDebouncedName, userInput.name);
  }, [userInput.name]);
 
  useEffect(() => {
    searchUserEffect(backendDomain, userInput.name, setSearchResults, debouncedName);
  }, [debouncedName]);

  useEffect(() => {
    const chosenUserData = {
    "name": userInput.name,
    "initials": userInput.initials,
    "restrictions": userInput.restrictions,
    "status": userInput.status,
    "idtype": userInput.idtype,
    "notes": userInput.notes
    }

    dropdownChoiceEffect(userInput.dropdownChoice, chosenUserData, setUserInput)
  }, [userInput.dropdownChoice]);

  const handleSubmit = async (e) => {
    e.preventDefault() 
    const data = {
      "name": userInput.name,
      "initials": userInput.initials,
      "restrictions": userInput.restrictions,
      "status": userInput.status,
      "idtype": userInput.idtype,
      "cardissue": userInput.cardissue,
      "cardexp": userInput.cardexp,
      "notes": userInput.notes,
    }

    const response = await postUser(backendDomain, data);

    if(response.status === 500){
      setMessage("Oops! Something went wrong. Please fill out all fields.");
    } else {
      setMessage('Success!');
      setSearchResults('');
      emptyForm(userInput, setUserInput, setSearchResults)
    };
  };

  return (
      <form data-testid='passes-form' onSubmit={handleSubmit} autoComplete="off">
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input className='form-control' data-testid='form-input' name='name' id='name' value={userInput.name} onChange={handleChange} /> 
            <div>{userLookupTrigger(searchResults, userInput.dropdownChoice, handleChange)}</div>
          <label htmlFor='permission'>Permission status</label>
          <p name='permission'>{permission}</p>
          <label htmlFor='initials'>Employee Initials</label>
          <input className='form-control' data-testid='form-input' name="initials" id='initials' value={userInput.initials} onChange={handleChange} />
          <label htmlFor='idtype'>ID Type</label>
          <input className='form-control' data-testid='form-input' name="idtype" id='idtype' value={userInput.idtype} onChange={handleChange} />
          <label htmlFor='restrictions'>Restrictions</label>
          <select className='form-select' name='restrictions' id='restrictions'  value={userInput.restrictions} onChange={handleChange}>
            {restrictionList.map(e => <option value={e} key={e}>{e}</option>)}
          </select>
          <label htmlFor='status'>Status</label>
          <select className='form-select' name='status' id='status' value={userInput.status} onChange={handleChange}>
            {statusList.map(e => <option value={e} key={e}>{e}</option>)}
          </select>
          <label htmlFor='cardissue'>Card Issued On</label>
          <input className='form-control' data-testid='form-input' name='cardissue' id='cardissue' type='date' value={userInput.cardissue} onChange={handleChange} />
          <label htmlFor='cardexp'>Expiration Date</label>
          <input className='form-control' data-testid='form-input' name='cardexp' id='cardexp' type='date' value={userInput.cardexp} onChange={handleChange} />
          <label htmlFor='notes'>Notes</label>
          <textarea className='form-control' data-testid='form-input' name='notes' id='notes' value={userInput.notes} onChange={handleChange} />
          <div className='btn-group ' role='group'>
            <button className='btn btn-primary' type='submit'>Submit</button>
            <button className='btn btn-secondary' type='button' onClick={() => emptyForm(userInput, setUserInput, setSearchResults)}>Clear</button>
          </div>
          <div className='msgWrap'>
            <span name='message'>{message}</span>
          </div>
        </div>
      </form>
  )
}

export default Form;

