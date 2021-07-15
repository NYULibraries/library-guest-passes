const UserLookup = ({ results }) => {
 if(results){
  return (
    <div className="dropdown">
      <select>
        {results.map((e) => <option key={e.id}>{e.name}</option>)}
      </select>
    </div>
  )
 }
 return (<div></div>)
}
    
export default UserLookup