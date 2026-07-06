import React, { useState } from 'react';

// 1. Компонент для отображения основной информации (Использует PROPS)
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

// 2. Компонент для отзывов с использованием состояния (Использует STATE и PROPS)
const GameReviews = ({ reviews }) => {
  // Состояние для отображения/скрытия отзывов
  const [showReviews, setShowReviews] = useState(true);

  return (
      <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
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

// 3. Главный компонент приложения (App)
function App() {
  const gameData = {
    title: "Grand Theft Auto V / Online",
    developer: "Rockstar North",
    genre: "Action-adventure",
    releaseYear: 2013,
    reviews: [
      { author: "Игрок1", text: "Отличный открытый мир и бесконечный онлайн-фан.", rating: 9 },
      { author: "Критик_99", text: "Шедевр игростроя, актуальный даже спустя годы.", rating: 10 },
      { author: "Noob_Saibot", text: "Ограбления топ, но гринда многовато.", rating: 8 }
    ]
  };

  return (
      <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'sans-serif', padding: '0 10px' }}>
        <h1>Моя любимая игра</h1>

        {/* Передаем данные через пропсы в первый компонент */}
        <GameInfo
            title={gameData.title}
            developer={gameData.developer}
            genre={gameData.genre}
            releaseYear={gameData.releaseYear}
        />

        {/* Передаем массив отзывов во второй компонент */}
        <GameReviews reviews={gameData.reviews} />
      </div>
  );
}

export default App;