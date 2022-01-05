import React, {useEffect, useState} from 'react';

const backendDomain = `${
  process.env.REACT_APP_BACKEND_FULL_HOST || "http://localhost:5000"
}`;

function PreviousVisits(props) {
  const [data, setData] = useState([]);
  const { typeOfVisitor, id } = props.match.params

  const fetchVisits = () => {
    fetch(`${backendDomain}/${typeOfVisitor}/${id}`)
      .then(res => res.json())
      .then(json => setData(json));
  }

  useEffect(() => {
    fetchVisits();
  }, []);

  const handleDelete = (url, id) => {
    fetch(`${url}/visits/${id}`, {
      method: "DELETE",
      mode: "cors",
      cache: "default",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.text())
    .then(res => console.log(res))

    const editedVisits = data.Visits.filter(e => e.id !== id);
    setData({ Visits: editedVisits })
  }

  return (
    <div className="container">
      <h1>Visits</h1>
      { data && data.hasOwnProperty("permission_status") ? <div><h2>{data.name}</h2><h3>Permission Status: {data.permission_status.toString()}</h3></div> : <div></div>}
      { data && data.hasOwnProperty("Visits") && data.Visits.length ?
        <table className="table table-hover table-bordered">
          <thead>
          <tr>
            <th scope="col">Card Issued on:</th>
            <th scope="col">Card Expires on:</th>
            <th scope="col">Staff Initials</th>
            <th scope="col">Type of ID</th>
            <th scope="col">Restrictions</th>
            <th scope="col">Status</th>
            <th scope="col">Notes</th>
            <th scope="col">Delete</th>
          </tr>
          </thead>
          <tbody>
            {
              data && data.hasOwnProperty("Visits") && data.Visits.length ? data.Visits.map((e) => (
                <tr key={e.id} id={id}>
                  <td  className="cardissue">{new Date(e.cardissue).toDateString()}</td>
                  <td className="cardexp">{new Date(e.cardexp).toDateString()}</td>
                  <td className="initials">{e.initials}</td>
                  <td className="idtype">{e.idtype}</td>
                  <td className="restrictions">{e.restrictions}</td>
                  <td className="status">{e.status}</td>
                  <td className="notes">{e.notes}</td>
                  <td>
                    <div className="">
                      <button className="btn btn-outline-secondary delete-btn" type="button" onClick={() => handleDelete(backendDomain, e.id)} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              )) : <div></div>
            }
          </tbody>
        </table> : <div></div>
      }
    </div>
  );

}


export default PreviousVisits;