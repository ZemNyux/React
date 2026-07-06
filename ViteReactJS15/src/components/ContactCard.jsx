import './../App.css';

function ContactCard({ contact, onEdit, onDelete }) {
    return (
        <div className="contact-card">
            <img
                src={contact.picture}
                alt={`${contact.firstName} ${contact.lastName}`}
                className="contact-image"
            />
            <div className="contact-info">
                <h3 className="contact-name">
                    {contact.firstName} {contact.lastName}
                </h3>
                <p className="contact-phone">{contact.phoneNumber}</p>
            </div>
            <div className="contact-buttons">
                <button className="edit-button" onClick={() => onEdit(contact)}>
                    Редагувати
                </button>
                <button className="delete-button" onClick={() => onDelete(contact.id)}>
                    Видалити
                </button>
            </div>
        </div>
    );
}


export default ContactCard;