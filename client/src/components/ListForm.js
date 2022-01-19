import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useState } from 'react';

function ListForm({handleClose, showListModal, handleSubmit, formData, setFormData, list, handleDelete}){

    const [showDelete, setShowDelete] = useState(false)

    const handleChange = (e) =>{
 
        const id = e.target.id

        if(id === "title"){
            setFormData({
                ...formData,
                list_name: e.target.value
            })
        }else{
            setFormData({
                ...formData,
                public: e.target.checked,
            })
        }
    }

    const handleDeleteModal = () => {
        handleClose()
        setShowDelete(true)
    }

    const handleDeleteClose = () => {
        setShowDelete(false)
    }

    const handleDeleteClick = () => {
        handleDelete(list)
        setShowDelete(false)
    }

    return(
        <>
    <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you wish to delete this list?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteClick} style={{float: 'right'}}>
            Delete
          </Button>
        </Modal.Body>
    </Modal>

    <Modal show={showListModal} onHide={handleClose}>
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group style={{padding: 10}} onChange={handleChange}>
            <br/>
                    <Form.Label htmlFor="title" style={{marginTop: 5, marginLeft: 10}}>List Title:</Form.Label>
                    <Form.Control
                        type="text"
                        id="title"
                        aria-describedby="titleBlock"
                        value={formData.list_name}
                        onChange={handleChange}
                    />
                    <Form.Check 
                        type="switch"
                        id="custom-switch"
                        label="Public"
                        checked={formData.public}
                        onChange={handleChange}
                    />
            </Form.Group>   
        <Modal.Footer>
            {list ? <Button variant="danger" onClick={handleDeleteModal}>
                Remove
            </Button> : null}
            <Button variant="success" type='submit'>
                Submit
            </Button>
        </Modal.Footer>
        </Form>
    </Modal>
    </>
    )
}

export default ListForm