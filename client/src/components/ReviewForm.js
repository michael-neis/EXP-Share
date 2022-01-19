import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Rating from '@mui/material/Rating';
import { useState } from 'react';

function ReviewForm({game, handleClose, showReviewModal, handleSubmit, formData, setFormData, review, handleDelete}){

    const [showDelete, setShowDelete] = useState(false)

    const handleChange = (e) =>{
        const name = e.target.name
        const value = e.target.value

        if(name === "customized-10"){
            const numValue = parseFloat(value)
            setFormData({
                ...formData,
                rating: numValue
            })
        }else{
            setFormData({
                ...formData,
                comment: value,
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
        handleDelete(review)
        setShowDelete(false)
    }

    return(
    <>
    <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you wish to remove this review?</Modal.Title>
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

    <Modal show={showReviewModal} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{game.name}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group style={{padding: 10}} onChange={handleChange}>
            <Rating name="customized-10" value={formData.rating} max={10} />
            <br/>
                    <Form.Label htmlFor="title" style={{marginTop: 5, marginLeft: 10}}>Comment:</Form.Label>
                    <Form.Control
                        type="text"
                        id="title"
                        aria-describedby="titleBlock"
                        value={formData.comment}
                        onChange={handleChange}
                    />
            </Form.Group>   
        <Modal.Footer>
            {review ? <Button variant="danger" onClick={handleDeleteModal}>
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

export default ReviewForm