import React, {useEffect, useState} from 'react';

const backendDomain = `${
  process.env.REACT_APP_BACKEND_FULL_HOST || "http://localhost:5000"
}`;

const INVENTORY_API_URL = `${backendDomain}/guests`;

function Guest() {
    const [data, setData] = useState({});
    // GET request function to your Mock API
    const fetchInventory = () => {
      fetch(`${INVENTORY_API_URL}`)
        .then(res => res.json())
        .then(json => setData(json));
    }

    // Calling the function on component mount

    useEffect(() => {
      fetchInventory();
      console.log(data);
    }, []);

  return (
    <div className="container">
      <h1>Guests</h1>
      <table className="table table-hover table-bordered">
        <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Permission Status</th>
        </tr>
        </thead>
        <tbody>
          {
            data.guest ? data.guest.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.permission_status.toString()}</td>
              </tr>
            )) : <div></div>
          }
        </tbody>
      </table>
    </div>
  );

}


export default Guest;