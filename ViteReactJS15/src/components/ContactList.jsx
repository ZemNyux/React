import ContactCard from './ContactCard';
import './../App.css';

function ContactList({ people, isLoading, onDelete, onEdit, onAddContact }) {
    return (
        <div className="contact-list">
            {isLoading ? (
                <p className="loading-text">Завантаження даних...</p>
            ) : people.length === 0 ? (
                <p className="loading-text">Нема нічого</p>
            ) : (
                <div className="cards-container">
                    {people.map(contact => (
                        <ContactCard
                            key={contact.id}
                            contact={contact}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
            <button className="add-button" onClick={onAddContact}>
                Додати контакт
            </button>
        </div>
    );
}


export default ContactList;