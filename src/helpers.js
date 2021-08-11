const userLookupTrigger = (results, dropdownChoice, handleChange) => {
  if(results?.length){
    return (
      <div className="dropdown input-group mb-3">
        <select className='form-select' name="dropdownChoice" value={dropdownChoice} onChange={handleChange}>
          <option key="empty" value="">Returning User?</option>
          {results.map((e) => <option key={e.id} value={JSON.stringify(e)}>{e.name}</option>)}
        </select>
      </div>
    )
   }
   return (<div></div>)
}

const postUser = async (url, data) => {
  return await fetch(`${url}/users`, {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
}

const emptyForm = (fieldsToEmpty, fn, optionalfn) => {
  Object.keys(fieldsToEmpty).map(e => {
    return fn({[e]: ''});
  });
  if(optionalfn){
    optionalfn('');
  };
}

const delayedSearchEffect = (fn, element) => {
  const timerId = setTimeout(() => {
    fn(element);
  }, 500);
  return () => {
    clearTimeout(timerId);
  };
}

const searchUserEffect = (url, name, fn, trigger) => {
  const searchUser = () => {
    const encodedURL = encodeURI(url + "/users/?name=" + name)
    fetch(encodedURL)
    .then(response => response.json())
    .then(data => fn(data))
  }

  if(trigger){
    return searchUser();
  }
}

export {
  userLookupTrigger,
  postUser,
  emptyForm,
  delayedSearchEffect,
  searchUserEffect
}