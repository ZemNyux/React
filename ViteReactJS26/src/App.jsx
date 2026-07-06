import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; // Не забудь прописать в терминале: npm install react-hook-form

// 1. Компонент: Информация об игре (Пропсы)
const GameInfo = ({ title, developer, genre, releaseYear }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px', borderRadius: '5px' }}>
            <h2>{title}</h2>
            <p><strong>Разработчик:</strong> {developer}</p>
            <p><strong>Жанр:</strong> {genre}</p>
            <p><strong>Год релиза:</strong> {releaseYear}</p>
        </div>
    );
};

// 2. Компонент: Отзывы (Состояние и Пропсы)
const GameReviews = ({ reviews }) => {
    const [showReviews, setShowReviews] = useState(true);

    return (
        <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px', borderRadius: '5px' }}>
            <h3>Рецензии и отзывы</h3>
            <button
                onClick={() => setShowReviews(!showReviews)}
                style={{ marginBottom: '10px', padding: '5px 10px', cursor: 'pointer' }}
            >
                {showReviews ? 'Скрыть отзывы' : 'Показать отзывы'}
            </button>

            {showReviews && (
                <ul>
                    {reviews.map((review, index) => (
                        <li key={index} style={{ marginBottom: '10px' }}>
                            <strong>{review.author}:</strong> «{review.text}» (Оценка: {review.rating}/10)
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// 3. Компонент: Форма с валидацией (React Hook Form)
const ReviewForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (data) => {
        alert(`Форма успешно отправлена!\nДанные: ${JSON.stringify(data, null, 2)}`);
        reset();
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
            <h3>Оставить новый отзыв</h3>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Ваше имя:</label>
                    <input
                        type="text"
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        {...register('username', { required: 'Имя обязательно для заполнения' })}
                    />
                    {errors.username && <span style={{ color: 'red', fontSize: '12px' }}>{errors.username.message}</span>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                    <input
                        type="text"
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        {...register('email', {
                            required: 'Email обязателен',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Некорректный формат email'
                            }
                        })}
                    />
                    {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email.message}</span>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Текст отзыва:</label>
                    <textarea
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        {...register('reviewText', {
                            required: 'Напишите хотя бы пару слов',
                            minLength: { value: 10, message: 'Отзыв должен быть не короче 10 символов' }
                        })}
                    />
                    {errors.reviewText && <span style={{ color: 'red', fontSize: '12px' }}>{errors.reviewText.message}</span>}
                </div>

                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Отправить отзыв
                </button>
            </form>
        </div>
    );
};

// Главный компонент, который объединяет ВСЁ для сдачи ДЗ
function App() {
    const gameData = {
        title: "Grand Theft Auto V / Online",
        developer: "Rockstar North",
        genre: "Action-adventure",
        releaseYear: 2013,
        reviews: [
            { author: "Игрок1", text: "Отличный открытый мир и бесконечный онлайн-фан.", rating: 9 },
            { author: "Критик_99", text: "Шедевр игростроя, актуальный даже спустя годы.", rating: 10 }
        ]
    };

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'sans-serif', padding: '0 10px' }}>
            <h1>Моя любимая игра</h1>
            <GameInfo {...gameData} />
            <GameReviews reviews={gameData.reviews} />
            <ReviewForm />
        </div>
    );
}

export default App;