import { Modal } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

function UserDataModal({showUserModal, handleUserClose, setUserFormData, userFormData, handleUserSubmit}){

    const handleChange = (e) => {
        setUserFormData({
            ...userFormData,
            [e.target.id]: e.target.value
        })
    }

    return(
    <>
    <Modal show={showUserModal} onHide={handleUserClose}>
        <Modal.Header>
            <Modal.Title>Profile Details</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => handleUserSubmit(e)}>
            <Form.Group style={{padding: 10}} onChange={handleChange}>
                    <Form.Label htmlFor="username" style={{marginTop: 5, marginLeft: 10}}>Username:</Form.Label>
                    <input autoComplete='off' type="text" id="username" className="nes-input" placeholder="Username" value={userFormData.username} onChange={handleChange} label="Username" style={{marginBottom: 40}}></input>
                    <Form.Label htmlFor="bio" style={{marginTop: 5, marginLeft: 10}}>Bio:</Form.Label>
                    <input autoComplete='off' type="text" id="bio" className="nes-input" placeholder="Bio" value={userFormData.bio} onChange={handleChange} label="Bio" style={{marginBottom: 40}}></input>
            </Form.Group>   
        <Modal.Footer>
            <button className='nes-btn' type='button' onClick={handleUserClose}>
                Cancel
            </button>
            <button className='nes-btn is-success' type='submit'>
                Save
            </button>
        </Modal.Footer>
        </Form>
    </Modal>
    </>
    )
}

export default UserDataModal