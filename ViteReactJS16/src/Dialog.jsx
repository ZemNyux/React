import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Dialog({ title, message, footer = [], isOpen, onClose, modalContainer }) {
    if (!isOpen || !modalContainer) return null;

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal.Dialog>
                <Modal.Header closeButton onHide={onClose}>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{message}</p>
                </Modal.Body>

                <Modal.Footer>
                    {footer.map((item, index) => (
                        <Button
                            key={index}
                            variant="secondary"
                            onClick={() => console.log(item)} // додай свою логіку при потребі
                        >
                            {item}
                        </Button>
                    ))}
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}

export default Dialog;