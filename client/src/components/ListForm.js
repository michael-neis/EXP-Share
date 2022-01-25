import { Modal } from 'react-bootstrap'
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
        <Modal.Header>
          <Modal.Title>Are you sure you wish to delete this list?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <button className='nes-btn' onClick={handleDeleteClose}>
            Cancel
          </button>
          <button className='nes-btn is-error' onClick={handleDeleteClick} style={{float: 'right'}}>
            Delete
          </button>
        </Modal.Body>
    </Modal>

    <Modal show={showListModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{list === 'default.list.829920' ? 'Create List' : 'Edit List'}</Modal.Title>
        </Modal.Header>
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
                        style={{marginBottom: 8}}
                    />
                    <br/>
                    <label>
                    <input type="checkbox" className="nes-checkbox" checked={formData.public} onChange={handleChange}/>
                    <span>Public</span>
                    </label>
            </Form.Group>   
        <Modal.Footer>
            {list !== 'default.list.829920' ? <button className='nes-btn is-error' onClick={handleDeleteModal}>
                Remove
            </button> : null}
            <button className='nes-btn is-success' type='submit'>
                Submit
            </button>
        </Modal.Footer>
        </Form>
    </Modal>
    </>
    )
}

export default ListForm