import { Modal } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

function PicModal({showPicModal, handlePicClose, setPictureFormData, pictureFormData, handlePicSubmit}){


    const handleChange = (e) => {
        setPictureFormData(e.target.value)
    }

    return(
    <>
    <Modal show={showPicModal} onHide={handlePicClose}>
        <Modal.Header >
            <Modal.Title>Set Profile Picture</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => handlePicSubmit(e)}>
            <Form.Group style={{padding: 10}} onChange={handleChange}>
                    <Form.Label htmlFor="image" style={{marginTop: 5, marginLeft: 10}}>Profile Picture:</Form.Label>
                    <Form.Control
                        type="text"
                        id="image"
                        aria-describedby="imageBlock"
                        value={pictureFormData}
                        onChange={handleChange}
                    />
                    {/* <input type="text" id="image" className="nes-input" placeholder="Image URL" value={pictureFormData} onChange={handleChange} label="Image" style={{marginBottom: 20}}></input> */}
            </Form.Group>   
        <Modal.Footer>
            <button className='nes-btn' type='button' onClick={handlePicClose}>
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

export default PicModal