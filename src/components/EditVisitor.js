import React,{ useState } from 'react';
import { postEditVisitor } from '../helpers';
import { useNavigate} from 'react-router';
import { Modal, Button, Form } from 'react-bootstrap';

const EditVisitor = (props) =>{
  const history = useNavigate()
  const visitorObject = props.state
  const [name, setName] = useState("");
  const [permissionStatus, setPermissionStatus] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postEditVisitor(visitorObject, name, permissionStatus);
    setName("");
    setPermissionStatus();
    history.go();
  };

  return (<div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { 
            visitorObject && visitorObject.hasOwnProperty('name') ? 
            <Form onSubmit={handleSubmit} id="edit-visitor">
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                  <Form.Control className='edit-name' placeholder="Name" name="name" defaultValue={visitorObject.name} onChange={(e) => setName(e.target.value)} /> 
              </Form.Group>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Permission Status</Form.Label>
                  <Form.Control className="edit-permission_status" placeholder="Permission Status" name="permission_status" defaultValue={visitorObject.permission_status} onChange={(e) => setPermissionStatus(e.target.value)} />
              </Form.Group>
              <Button type="submit" form="edit-visitor" variant="secondary">Save Changes</Button>
            </Form> : <div></div>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditVisitor;
