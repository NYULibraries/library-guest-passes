import { useState, useEffect, useReducer } from 'react';
import { restrictionList, statusList } from '../tools';
import { userLookupTrigger, fetchUser } from '../helpers';

const Form = () =>{
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      name: '',
      initials: '',
      restrictions: '',
      status: '',
      idtype: '',
      cardexp: '2000-06-09T00:00:00.000Z',
      cardissue: '2000-06-09T00:00:00.000Z',
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
    }
  
    let chosenUser
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

    const response = fetchUser(fetchURL, data);

    if(response.status === 500){
      setMessage("Oops! Something went wrong. Please fill out all fields.");
    } else {
      setMessage('Success!')
      Object.keys(data).map(e => {
        return setUserInput({[e]: ''});
      });
    };
  };

  return (
      <form data-testid='passes-form' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input name='name' value={userInput.name} onChange={handleChange} /> 
          <div>{userLookupTrigger(searchResults, userInput.dropdownChoice, handleChange)}</div>
        <label htmlFor='permission'>Permission status</label>
        <p name='permission'>{permission}</p>
        <label htmlFor='employee_initials'>Employee Initials</label>
        <input data-testid='form-input' name="initials" value={userInput.initials} onChange={handleChange} />
        <label htmlFor='id_type'>ID Type</label>
        <input data-testid='form-input' name="idtype" value={userInput.idtype} onChange={handleChange} />
        <label htmlFor='restrictions'>Restrictions</label>
        <select name='restrictions' value={userInput.restrictions} onChange={handleChange}>
          {restrictionList.map(e => <option value={e} key={e}>{e}</option>)}
        </select>
        <label htmlFor='status'>Status</label>
        <select name='status' value={userInput.status} onChange={handleChange}>
          {statusList.map(e => <option value={e} key={e}>{e}</option>)}
        </select>
        <label htmlFor='cardissue'>Card Issued On</label>
        <input data-testid='form-input' name='cardissue' type='date' value={userInput.cardissue} onChange={handleChange} />
        <label htmlFor='cardexp'>Expiration Date</label>
        <input data-testid='form-input' name='cardexp' type='date' value={userInput.cardexp} onChange={handleChange} />
        <label htmlFor='notes'>Notes</label>
        <input data-testid='form-input' name='notes' value={userInput.notes} onChange={handleChange} />
        <button>Submit</button>
        <div className='msgWrap'>
          <span name='message'>{message}</span>
        </div>
      </form>
  )
}

export default Form;

