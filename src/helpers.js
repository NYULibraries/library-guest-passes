export const userLookupTrigger = (results, dropdownChoice, handleChange) => {
  if(results){
    return (
      <div className="dropdown">
        <select name="dropdownChoice" value={dropdownChoice} onChange={handleChange}>
          {results.map((e) => <option key={e.id} value={JSON.stringify(e)}>{e.name}</option>)}
        </select>
      </div>
    )
   }
   return (<div></div>)
}