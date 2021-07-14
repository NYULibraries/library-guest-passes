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
  const [message, setMessage] = useState('');
  const [searchResults, setSearchResults] = useState();
  const [debouncedName, setDebouncedName] = useState(userInput.name);
  const fetchURL = 'http://localhost:5000/users'

  const handleChange = evt => {
    const { name, value} = evt.target;
    setUserInput({[name]: value});
  }


  // de-bouncing the search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedName(userInput.name);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [userInput.name]);
 
  useEffect(() => {
    const searchUser = async () => {
      const encodedURL = encodeURI(fetchURL + "?name=" + userInput.name)
      const { data } = await fetch(encodedURL);
      setSearchResults(data);
    };
    if(debouncedName){
      searchUser();
    }
  }, [debouncedName]);

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

    const response = await fetch(fetchURL, {
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

