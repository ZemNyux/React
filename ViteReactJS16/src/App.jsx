import { useState, useEffect } from 'react';
import './App.css';
import Dialog from "./components/Dialog.jsx";

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContainer, setModalContainer] = useState(null);

    useEffect(() => {
        const div = document.createElement('div');
        div.id = 'modal-root'; // за бажання, цей див можна зробити в index.html після id="root"
        document.body.appendChild(div);
        setModalContainer(div);

        return () => {
            document.body.removeChild(div);
        };
    }, []);

    return (
        <div className="container">
            <h1 className="title">Приклад React Portals в Vite</h1>
            <button className="open-button" onClick={() => setIsModalOpen(true)}>
                Відчинити модальне вікно
            </button>
            <Dialog title={"Title"} message={"Text"} footer={["Yes", "No", "Maybe"]}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    modalContainer={modalContainer}
            />
        </div>
    );
};

export default App;