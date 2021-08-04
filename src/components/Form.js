import { useState, useEffect, useReducer } from 'react';
import { restrictionList, statusList } from '../tools';
import { userLookupTrigger, postUser, emptyForm } from '../helpers';

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
  const fetchURL = 'http://localhost:5000/users'

  const handleChange = evt => {
    const { name, value} = evt.target;
    setUserInput({[name]: value});
  }
 
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedName(userInput.name);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [userInput.name]);
 
  useEffect(() => {
    const searchUser = () => {
      const encodedURL = encodeURI(fetchURL + "?name=" + userInput.name)
      fetch(encodedURL)
      .then(response => response.json())
      .then(data => setSearchResults(data))
    }

    if(debouncedName){
      return searchUser();
    }
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
  
    let chosenUser;

    if(userInput.dropdownChoice !== ""){
      chosenUser = JSON.parse(userInput.dropdownChoice);
      return Object.keys(chosenUserData).map(e => {
        return setUserInput({[e]: chosenUser[e]});
      }); 
    }
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

    const response = await postUser(fetchURL, data);

    if(response.status === 500){
      setMessage("Oops! Something went wrong. Please fill out all fields.");
    } else {
      setMessage('Success!');
      setSearchResults('');
      emptyForm(userInput, setUserInput)
    };
  };

  return (
      <form data-testid='passes-form' onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor='name'>Name</label>
        <input className='form-control' name='name' value={userInput.name} onChange={handleChange} /> 
          <div>{userLookupTrigger(searchResults, userInput.dropdownChoice, handleChange)}</div>
        <label htmlFor='permission'>Permission status</label>
        <p name='permission'>{permission}</p>
        <label htmlFor='employee_initials'>Employee Initials</label>
        <input className='form-control' data-testid='form-input' name="initials" value={userInput.initials} onChange={handleChange} />
        <label htmlFor='id_type'>ID Type</label>
        <input className='form-control' data-testid='form-input' name="idtype" value={userInput.idtype} onChange={handleChange} />
        <label htmlFor='restrictions'>Restrictions</label>
        <select className='form-select' name='restrictions' value={userInput.restrictions} onChange={handleChange}>
          {restrictionList.map(e => <option value={e} key={e}>{e}</option>)}
        </select>
        <label htmlFor='status'>Status</label>
        <select className='form-select' name='status' value={userInput.status} onChange={handleChange}>
          {statusList.map(e => <option value={e} key={e}>{e}</option>)}
        </select>
        <label htmlFor='cardissue'>Card Issued On</label>
        <input className='form-control' data-testid='form-input' name='cardissue' type='date' value={userInput.cardissue} onChange={handleChange} />
        <label htmlFor='cardexp'>Expiration Date</label>
        <input className='form-control' data-testid='form-input' name='cardexp' type='date' value={userInput.cardexp} onChange={handleChange} />
        <label htmlFor='notes'>Notes</label>
        <textarea className='form-control' data-testid='form-input' name='notes' value={userInput.notes} onChange={handleChange} />
        <div className='btn-group' role='group'>
          <button className='btn btn-primary' type='submit'>Submit</button>
          <button className='btn btn-secondary' type='button' onClick={() => emptyForm(userInput, setUserInput)}>Clear</button>
        </div>
        <div className='msgWrap'>
          <span name='message'>{message}</span>
        </div>
      </form>
  )
}

export default Form;

