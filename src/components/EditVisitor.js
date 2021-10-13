import React,{ useState } from 'react';
import { postEditVisitor } from '../helpers';
import { useHistory } from 'react-router';

const backendDomain = `${
  process.env.REACT_APP_BACKEND_FULL_HOST || "http://localhost:5000"
}`;

const EditVisitor = (props) =>{
  const history = useHistory()
  const visitorObject = props.state
  const [name, setName] = useState("");
  const [permissionStatus, setPermissionStatus] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postEditVisitor(backendDomain, visitorObject, name, permissionStatus);
    setName("");
    setPermissionStatus();
    history.go();
  };

  return (
    <div className="modal" id="editVisitor" role="dialog" tabindex="-1" aria-labelledby="Edit Guest Modal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="edit">Edit</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
              </button>
            </div>
            <div className="modal-body">
              { 
                visitorObject && visitorObject.hasOwnProperty('name') ? 
                <form onSubmit={handleSubmit} id="edit-visitor">
                  <input placeholder="Name" name="name" defaultValue={visitorObject.name} onChange={(e) => setName(e.target.value)} /> 
                  <input placeholder="Permission Status" name="permission_status" defaultValue={visitorObject.permission_status} onChange={(e) => setPermissionStatus(e.target.value)} />
                  <button type="submit" form="edit-visitor" className="btn btn-secondary">Save Changes</button>
                </form> : <div></div>
              }
            </div>
        </div>
      </div>
    </div>
  )
}

export default EditVisitor;