import React, {useState, useActionState, useEffect} from 'react';
import './css/Anketa.css';
/* у файл зі стилями потрібно додати:
.anketa-error {
    color: #d32f2f;
    font-size: 0.9em;
    margin-top: 5px;
    margin-left: 10px;
    display: block;
    font-family: Arial, sans-serif;
    line-height: 1.4;
} */

const Anketa = () => {
    // початковий стан форми
    const initialFormState = {
        login: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        website: '',
        fullname: '',
        gender: '',
        dob: '',
        city: 'od',
        number: '',
        languages: [],
        profession: 'business',
        additionalInfo: '',
        photo: null
    };

    // стан форми
    const [formState, setFormState] = useState(initialFormState);
    // стан помилок
    const [errors, setErrors] = useState({});

    // ефект для примусового оновлення форми після появи помилок
    useEffect(() => {
        // якщо є помилки, примусово оновлюємо форму, щоб відобразити чекбокси та радіокнопки
        if (Object.keys(errors).length > 0) {
            setFormState((prev) => ({
                ...prev,
                gender: prev.gender, // зберігаємо радіокнопки
                languages: [...prev.languages], // зберігаємо чекбокси
            }));
        }
    }, [errors]);

    // функція валідації форми
    const validateForm = () => {
        const newErrors = {};

        // логін: обов’язковий, 3-20 символів, тільки літери, цифри, підкреслення
        if (!formState.login) {
            newErrors.login = 'Логін обов’язковий';
        } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(formState.login)) {
            newErrors.login = 'Логін повинен бути 3-20 символів, тільки літери, цифри, підкреслення';
        }

        // пароль: обов’язковий, мінімум 8 символів, повинен містити літери та цифри
        if (!formState.password) {
            newErrors.password = 'Пароль обов’язковий';
        } else if (formState.password.length < 8 || !/[a-zA-Z]/.test(formState.password) || !/[0-9]/.test(formState.password)) {
            newErrors.password = 'Пароль повинен бути мінімум 8 символів, містити літери та цифри';
        }

        // підтвердження пароля: має збігатися з паролем
        if (!formState.confirmPassword) {
            newErrors.confirmPassword = 'Підтвердження пароля обов’язкове';
        } else if (formState.confirmPassword !== formState.password) {
            newErrors.confirmPassword = 'Паролі не збігаються';
        }

        // електронна пошта: якщо вказана, має бути коректною
        if (formState.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
            newErrors.email = 'Введіть коректну електронну пошту';
        }

        // телефон: якщо вказаний, має відповідати формату (наприклад, +380630300035)
        if (formState.phone && !/^\+?\d{10,15}$/.test(formState.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Введіть коректний номер телефону (10-15 цифр)';
        }

        // веб-сайт: якщо вказаний, має бути коректним URL
        if (formState.website && !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(formState.website)) {
            newErrors.website = 'Введіть коректний URL (наприклад, https://alex.com)';
        }

        // повне ім’я: якщо вказане, мінімум 2 слова, 2-50 символів
        if (formState.fullname && (formState.fullname.trim().split(/\s+/).length < 2 || formState.fullname.length > 50)) {
            newErrors.fullname = 'Повне ім’я має містити мінімум 2 слова і не перевищувати 50 символів';
        }

        // стать: обов’язкова
        if (!formState.gender) {
            newErrors.gender = 'Виберіть стать';
        }

        // дата народження: якщо вказана, користувач має бути старше 18 років
        if (formState.dob) {
            const today = new Date();
            const dob = new Date(formState.dob);
            let age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                age--;
            }
            if (age < 18) {
                newErrors.dob = 'Ви повинні бути старше 18 років';
            }
        }

        // місто: обов’язкове
        if (!formState.city) {
            newErrors.city = 'Виберіть місто';
        }

        // улюблене число: якщо вказане, має бути від 1 до 100
        if (formState.number && (formState.number < 1 || formState.number > 100)) {
            newErrors.number = 'Число має бути від 1 до 100';
        }

        // мови: мінімум одна мова
        if (formState.languages.length === 0) {
            newErrors.languages = 'Виберіть хоча б одну мову';
        }

        // професія: обов’язково вказати
        if (!formState.profession) {
            newErrors.profession = 'Виберіть сферу діяльності';
        }

        // додаткова інформація: максимум 500 символів
        if (formState.additionalInfo.length > 500) {
            newErrors.additionalInfo = 'Максимум 500 символів';
        }

        // фото: якщо вказане, тільки зображення (jpeg, png), максимум 5 МБ
        if (formState.photo && !['image/jpeg', 'image/png'].includes(formState.photo.type)) {
            newErrors.photo = 'Допустимі тільки файли JPEG або PNG';
        } else if (formState.photo && formState.photo.size > 5 * 1024 * 1024) {
            newErrors.photo = 'Файл не повинен перевищувати 5 МБ';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // хук useActionState
    const [State, formAction, isPending] = useActionState(
        async (prevState, formData) => {
            // синхронізуємо formState з FormData перед валідацією
            const updatedState = {
                ...formState,
                ...Object.fromEntries(formData.entries()),
                languages: formData.getAll('languages'),
                photo: formState.photo, // зберігаємо поточний файл
                number: formData.get('number') ? Number(formData.get('number')) : '',
            };
            setFormState(updatedState);

            // перевіряємо валідацію
            if (!validateForm()) {
                return updatedState; // повертаємо оновлений стан
            }

            try {
                const entries = {
                    ...updatedState,
                    photo: updatedState.photo ? updatedState.photo.name : null,
                };
                const login = formData.get('login') || '';
                const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username: login})
                });
                if (response.ok) {
                    console.log('статус відповіді:', response.status);
                    console.log('надійслані дані:', entries);
                    alert('Дані успішно надіслано!');
                    setErrors({}); // очищаємо помилки
                    setFormState(initialFormState); // скидаємо форму
                    return initialFormState;
                } else {
                    throw new Error('Помилка сервера: ' + response.status);
                }
            } catch (error) {
                alert('Сталася помилка при надсиланні даних. ' + error.message);
                return updatedState; // повертаємо оновлений стан
            }
        },
        initialFormState
    );

    // обробник змін для текстових полів, select, textarea, radio
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: value
        }));
        // очищаємо всі помилки при зміні будь-якого поля
        setErrors({});
    };

    // обробник змін для чекбоксів (languages)
    const handleCheckboxChange = (e) => {
        const {value, checked} = e.target;
        setFormState((prev) => {
            const languages = checked
                ? [...prev.languages, value]
                : prev.languages.filter((lang) => lang !== value);
            return {...prev, languages};
        });
        // очищаємо всі помилки при зміні
        setErrors({});
    };

    // обробник змін для файлу
    const handleFileChange = (e) => {
        const file = e.target.files[0] || null;
        setFormState((prev) => ({
            ...prev,
            photo: file
        }));
        // очищаємо всі помилки при зміні
        setErrors({});
    };

    // обробник скидання форми
    const handleReset = () => {
        setFormState(initialFormState);
        setErrors({});
    };

    return (
        <div className="anketa-container">
            <form action={formAction}>
                <fieldset className="anketa-fieldset">
                    <legend className="anketa-legend">Реєстрація користувача</legend>

                    {/* логін */}
                    <label htmlFor="login" className="anketa-label">Логін (обов’язкове поле):</label>
                    <input
                        autoComplete="username"
                        type="text"
                        id="login"
                        name="login"
                        value={formState.login}
                        onChange={handleInputChange}
                        className="anketa-input"
                        required
                    />
                    {errors.login && <span className="anketa-error">{errors.login}</span>}<br/>

                    {/* пароль */}
                    <label htmlFor="password" className="anketa-label">Пароль (обов’язкове поле):</label>
                    <input
                        autoComplete="new-password"
                        type="password"
                        id="password"
                        name="password"
                        value={formState.password}
                        onChange={handleInputChange}
                        className="anketa-input"
                        required
                    />
                    {errors.password && <span className="anketa-error">{errors.password}</span>}<br/>

                    {/* підтвердження пароля */}
                    <label htmlFor="confirmPassword" className="anketa-label">Підтвердження пароля:</label>
                    <input
                        autoComplete="new-password"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formState.confirmPassword}
                        onChange={handleInputChange}
                        className="anketa-input"
                        required
                    />
                    {errors.confirmPassword && <span className="anketa-error">{errors.confirmPassword}</span>}<br/>

                    {/* електронна пошта */}
                    <label htmlFor="email" className="anketa-label">Електронна пошта:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        className="anketa-input"
                    />
                    {errors.email && <span className="anketa-error">{errors.email}</span>}<br/>

                    {/* телефон */}
                    <label htmlFor="phone" className="anketa-label">Телефон:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        className="anketa-input"
                    />
                    {errors.phone && <span className="anketa-error">{errors.phone}</span>}<br/>

                    {/* веб-сайт */}
                    <label htmlFor="website" className="anketa-label">Веб-сайт:</label>
                    <input
                        type="url"
                        id="website"
                        name="website"
                        value={formState.website}
                        onChange={handleInputChange}
                        className="anketa-input"
                    />
                    {errors.website && <span className="anketa-error">{errors.website}</span>}<br/>

                    {/* повне ім’я */}
                    <label htmlFor="fullname" className="anketa-label">Повне ім’я та прізвище:</label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        size="50"
                        value={formState.fullname}
                        onChange={handleInputChange}
                        className="anketa-input"
                    />
                    {errors.fullname && <span className="anketa-error">{errors.fullname}</span>}<br/>

                    {/* стать */}
                    <label className="anketa-label">Стать:</label><br/>
                    <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="Чоловік"
                        checked={formState.gender === 'Чоловік'}
                        onChange={handleInputChange}
                        className="anketa-radio"
                    />
                    <label htmlFor="male" className="anketa-radio-label">Чоловік</label><br/>
                    <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="Жінка"
                        checked={formState.gender === 'Жінка'}
                        onChange={handleInputChange}
                        className="anketa-radio"
                    />
                    <label htmlFor="female" className="anketa-radio-label">Жінка</label>
                    {errors.gender && <span className="anketa-error">{errors.gender}</span>}<br/>

                    {/* дата народження */}
                    <label htmlFor="dob" className="anketa-label">Дата народження:</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formState.dob}
                        onChange={handleInputChange}
                        className="anketa-input"
                    />
                    {errors.dob && <span className="anketa-error">{errors.dob}</span>}<br/>

                    {/* місто */}
                    <label htmlFor="city" className="anketa-label">Місто:</label>
                    <select
                        name="city"
                        id="city"
                        value={formState.city}
                        onChange={handleInputChange}
                        className="anketa-select"
                    >
                        <optgroup label="Україна">
                            <option value="od">Одеса</option>
                            <option value="kh">Харків</option>
                            <option value="ch">Черкаси</option>
                            <option value="uz">Ужгород</option>
                            <option value="dn">Дніпро</option>
                            <option value="my">Миколаїв</option>
                            <option value="ky">Київ</option>
                            <option value="lv">Львів</option>
                            <option value="oth1">Інше місто України</option>
                        </optgroup>
                        <optgroup label="Світ">
                            <option value="pa">Париж</option>
                            <option value="am">Амстердам</option>
                            <option value="ba">Барселона</option>
                            <option value="be">Берлін</option>
                            <option value="va">Варшава</option>
                            <option value="pr">Прага</option>
                            <option value="oth2">Інше місто світу</option>
                        </optgroup>
                    </select>
                    {errors.city && <span className="anketa-error">{errors.city}</span>}<br/>

                    {/* улюблене число */}
                    <label htmlFor="number" className="anketa-label">Улюблене число:</label>
                    <input
                        type="number"
                        id="number"
                        name="number"
                        value={formState.number}
                        onChange={handleInputChange}
                        className="anketa-input"
                    />
                    {errors.number && <span className="anketa-error">{errors.number}</span>}<br/>

                    {/* іноземні мови */}
                    <label className="anketa-label">Іноземні мови:</label><br/>
                    {['англійська', 'французька', 'німецька', 'іспанська', 'італійська'].map(lang => (
                        <div key={lang}>
                            <input
                                type="checkbox"
                                id={lang}
                                name="languages"
                                value={lang}
                                checked={formState.languages.includes(lang)}
                                onChange={handleCheckboxChange}
                                className="anketa-checkbox"
                            />
                            <label htmlFor={lang} className="anketa-checkbox-label">
                                {lang[0].toUpperCase() + lang.slice(1)}
                            </label><br/>
                        </div>
                    ))}
                    {errors.languages && <span className="anketa-error">{errors.languages}</span>}<br/>

                    {/* професія */}
                    <label htmlFor="profession" className="anketa-label">Сфера діяльності:</label>
                    <select
                        name="profession"
                        id="profession"
                        value={formState.profession}
                        onChange={handleInputChange}
                        className="anketa-select"
                    >
                        <option value="business">Бізнес</option>
                        <option value="education">Освіта</option>
                        <option value="engineering">Інженерія</option>
                        <option value="healthcare">Охорона здоров’я</option>
                        <option value="it">ІТ</option>
                    </select>
                    {errors.profession && <span className="anketa-error">{errors.profession}</span>}<br/>

                    {/* додаткова інформація */}
                    <label htmlFor="additionalInfo" className="anketa-label">Додаткова інформація:</label><br/>
                    <textarea
                        name="additionalInfo"
                        id="additionalInfo"
                        rows="4"
                        cols="50"
                        value={formState.additionalInfo}
                        onChange={handleInputChange}
                        className="anketa-textarea"
                    ></textarea>
                    {errors.additionalInfo && <span className="anketa-error">{errors.additionalInfo}</span>}<br/>

                    {/* завантаження фото */}
                    <label htmlFor="photo" className="anketa-label">Прикріпіть фото:</label>
                    <input
                        type="file"
                        id="photo"
                        name="photo"
                        onChange={handleFileChange}
                        className="anketa-input"
                    />
                    {errors.photo && <span className="anketa-error">{errors.photo}</span>}<br/>

                    {/* кнопки */}
                    <input
                        type="submit"
                        value="Надіслати"
                        disabled={isPending}
                        className="anketa-button anketa-button-submit"
                    />
                    <input
                        type="reset"
                        value="Скинути"
                        onClick={handleReset}
                        className="anketa-button anketa-button-reset"
                    />
                </fieldset>
            </form>
        </div>
    );
};

export default Anketa;
// Anketa.css і App.jsx знаходяться за посиланням https://gist.github.com/sunmeat/63454451326d878674721a32a23d9fe6 !!!