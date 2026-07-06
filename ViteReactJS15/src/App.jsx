import { useState, useEffect } from 'react';
import Person from './models/Person';
import ContactList from './components/ContactList';
import './App.css';

function App() {
    const [people, setPeople] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingContact, setEditingContact] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        let isCancelled = false;

        setIsLoading(true);
        fetch('https://randomuser.me/api/?results=10')
            .then(response => response.json())
            .then(data => {
                if (isCancelled) return;

                console.log('Дані від API:', data);

                if (data.results && data.results.length > 0) {
                    const fetchedPeople = data.results.map((user, index) => {
                        const phoneNumber = user.phone;
                        return new Person(
                            index + 1,
                            user.name.first,
                            user.name.last,
                            phoneNumber,
                            user.picture.large || `https://randomuser.me/api/portraits/men/${index + 1}.jpg`
                        );
                    });
                    setPeople(fetchedPeople);
                }
                setIsLoading(false);
            })
            .catch(error => {
                if (isCancelled) return;
                console.error('Помилка:', error);
                setIsLoading(false);
            });

        return () => {
            isCancelled = true;
        };
    }, []);

    const handleDelete = (id) => {
        setPeople(people.filter(contact => contact.id !== id));
    };

    const handleEdit = (contact) => {
        setEditingContact({ ...contact });
        setIsModalOpen(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        setPeople(people.map(contact =>
            contact.id === editingContact.id ? editingContact : contact
        ));
        setIsModalOpen(false);
        setEditingContact(null);
    };

    const handleAddContact = () => {
        fetch('https://randomuser.me/api/?results=1')
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    const user = data.results[0];
                    const newId = people.length > 0 ? Math.max(...people.map(p => p.id)) + 1 : 1;
                    const newContact = new Person(
                        newId,
                        user.name.first,
                        user.name.last,
                        user.phone,
                        user.picture.large || `https://randomuser.me/api/portraits/men/${newId}.jpg`
                    );
                    setPeople([...people, newContact]);
                }
            })
            .catch(error => {
                console.error('Помилка додавання контакту:', error);
            });
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Контакти</h1>
            <ContactList
                people={people}
                isLoading={isLoading}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onAddContact={handleAddContact}
            />
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2 className="modal-title">Редагувати контакт</h2>
                        <form onSubmit={handleSave}>
                            <div className="modal-field">
                                <label>Имя</label>
                                <input
                                    type="text"
                                    value={editingContact.firstName}
                                    onChange={(e) => setEditingContact({ ...editingContact, firstName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="modal-field">
                                <label>ПІБ</label>
                                <input
                                    type="text"
                                    value={editingContact.lastName}
                                    onChange={(e) => setEditingContact({ ...editingContact, lastName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="modal-field">
                                <label>Телефон</label>
                                <input
                                    type="text"
                                    value={editingContact.phoneNumber}
                                    onChange={(e) => setEditingContact({ ...editingContact, phoneNumber: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="modal-field">
                                <label>Фото (URL)</label>
                                <input
                                    type="text"
                                    value={editingContact.picture}
                                    onChange={(e) => setEditingContact({ ...editingContact, picture: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="modal-buttons">
                                <button type="submit" className="modal-save-button">Зберегти</button>
                                <button
                                    type="button"
                                    className="modal-cancel-button"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Скасувати
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;