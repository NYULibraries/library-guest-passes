export const userLookupTrigger = (results, dropdownChoice, handleChange) => {
  if(results){
    return (
      <div className="dropdown">
        <select name="dropdownChoice" value={dropdownChoice} onChange={handleChange}>
          <option key="empty" value="empty">Returning User?</option>
          {results.map((e) => <option key={e.id} value={JSON.stringify(e)}>{e.name}</option>)}
        </select>
      </div>
    )
   }
   return (<div></div>)
}

export const postUser = async (url, data) => {
  return await fetch(url, {
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