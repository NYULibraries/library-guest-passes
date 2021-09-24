import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const backendDomain = `${
  process.env.REACT_APP_BACKEND_FULL_HOST || "http://localhost:5000"
}`;

function Guest() {
  const [data, setData] = useState([]);

  const fetchGuests = () => {
    fetch(`${backendDomain}/guests`)
      .then(res => res.json())
      .then(json => setData(json));
  }

  useEffect(() => {
    fetchGuests();
  }, []);

  const handleDelete = (url, id) => {
    fetch(`${url}/guests/${id}`, {
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

    const guests = data.filter(e => e.id !== id);
    setData(guests)
  }

  return (
    <div className="container">
      <h1>Guests</h1>
      <table className="table table-hover table-bordered">
        <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Permission Status</th>
          <th scope="col">Edit/View/Delete</th>
        </tr>
        </thead>
        <tbody>
          {
            data ? data.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.permission_status.toString()}</td>
                <td>
                  <div className="btn-group mb-3">
                    <button className="btn btn-outline-secondary" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                      </svg>
                    </button>
                    <Link to={{pathname: `/admin/guests/${e.id}`}}>
                      <button className="btn btn-outline-secondary" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                        </svg>
                      </button>
                    </Link>
                    <button className="btn btn-outline-secondary" type="button" onClick={() => handleDelete(backendDomain, e.id)}>
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
      </table>
    </div>
  );

}


export default Guest;