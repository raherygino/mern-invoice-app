import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const FormModal = ({id, show, title, size, onHide, children}) => {

    return(
        <Modal
            size={size}
            show={show}
            onHide={onHide}
            aria-labelledby={id} >

            <Modal.Header className='py-4' closeButton>
                <Modal.Title id={id}>
                   { title }
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className='py-2'>
                { children }
            </Modal.Body>

            <Modal.Footer className='py-2'>
                <Button variant='secondary' onClick={onHide}>Cancel</Button>
                <Button variant='primary'>Ok</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FormModal