import {useState} from 'react';
import './css/FormContainer.css';

// дочірня компонента отримує дані та функції від батька через пропси
// в ідеалі, звичайно, потрібно розмістити батька та дочірні компоненти в окремих файлах!
function FormInput({label, type, name, value, onChange}) {
    const handleInputChange = (e) => {
        onChange(e.target.value); // виклик коллбек-функції для оновлення стану батьківської форми
    };

    return (
        <div className="form-group">
            <label htmlFor={name}>{label}:</label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={handleInputChange}
            />
        </div>
    );
}

// батьківська компонента (сама форма)
function FormContainer() {
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    const [submitResult, setSubmitResult] = useState(null);

// коллбек, який оновлює стан formData у батьківському компоненті
// приймає два параметри: field (ім'я поля, наприклад, name або email) та value (нове значення поля)
// Використовуючи setFormData, функція змінює лише вказане поле в об'єкті formData, зберігаючи інші поля незмінними
    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // скасування стандартної поведінки форми (у вигляді перезавантаження сторінки, наприклад)
        setSubmitResult(null);
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log('Відподвідь від API:', data);
            setSubmitResult({success: true, data});
        } catch (error) {
            console.error('Помилка API:', error);
            setSubmitResult({success: false, error: error.message});
        }
    };

    return (
        <div className="form-container">
            <h2>Реєстраційна форма</h2>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="ПІБ"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(value) => handleChange('name', value)}
                />
                <FormInput
                    label="Е-mail"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(value) => handleChange('email', value)}
                />
                <button type="submit">
                    Відправити
                </button>
            </form>
            <div className="form-data">
                <h3>Введені дані:</h3>
                <p>ПІБ: {formData.name || '—'}</p>
                <p>Е-mail: {formData.email || '—'}</p>
            </div>
            {submitResult && (
                <div className="result">
                    {submitResult.success ? (
                        <>
                            <p className="success">Успіх!</p>
                            <pre>{JSON.stringify(submitResult.data, null, 2)}</pre>
                        </>
                    ) : (
                        <p className="error">
                            Помилка: {submitResult.error || 'не вдалося відправити'}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default FormContainer;
// ================================================================================================================
//
//     альтернативний варіант з useContext():
//
// https://gist.github.com/sunmeat/1426f6782180966fc21621360156e9ac