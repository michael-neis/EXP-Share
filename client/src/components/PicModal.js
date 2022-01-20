import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function PicModal({showPicModal, handlePicClose, setPictureFormData, pictureFormData, handlePicSubmit}){


    const handleChange = (e) => {
        setPictureFormData(e.target.value)
    }

    return(
    <>
    <Modal show={showPicModal} onHide={handlePicClose}>
        <Modal.Header closeButton>
            <Modal.Title>Set Profile Picture</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => handlePicSubmit(e)}>
            <Form.Group style={{padding: 10}} onChange={handleChange}>
                    <Form.Label htmlFor="image" style={{marginTop: 5, marginLeft: 10}}>Image URL:</Form.Label>
                    <Form.Control
                        type="text"
                        id="image"
                        aria-describedby="imageBlock"
                        value={pictureFormData}
                        onChange={handleChange}
                    />
            </Form.Group>   
        <Modal.Footer>
            <Button onClick={handlePicClose}>
                Cancel
            </Button>
            <Button variant="success" type='submit'>
                Save
            </Button>
        </Modal.Footer>
        </Form>
    </Modal>
    </>
    )
}

export default PicModal