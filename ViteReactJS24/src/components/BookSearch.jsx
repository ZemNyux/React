import React, { useState } from 'react';
import '/src/css/SpaceSearch.css'; // Імпортуємо наш окремий файл CSS

const SpaceSearch = () => {
    // 1. Стани для пошукового запиту, результатів, завантаження та помилок
    const [query, setQuery] = useState('Mars');
    const [cosmicItems, setCosmicItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 2. Асинхронна функція для виконання GET запиту до NASA API
    const searchSpace = async (e) => {
        if (e) e.preventDefault(); // Запобігаємо перезавантаженню сторінки, якщо викликано з форми

        if (!query.trim()) {
            setError('Будь ласка, введіть назву космічного об’єкта');
            return;
        }

        setLoading(true);
        setError(null);
        setCosmicItems([]); // Очищаємо екран перед новим пошуком

        // NASA Image API не вимагає обов'язкового API-ключа для цього медіа-пошуку!
        // Шукаємо тільки зображення (media_type=image)
        const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`;

        try {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`Помилка підключення до NASA: ${res.status} ${res.statusText}`);
            }

            const data = await res.json();
            const items = data.collection.items;

            if (items && items.length > 0) {
                // За умовою завдання беремо перші 10 зображень
                setCosmicItems(items.slice(0, 10));
            } else {
                setError('Космічних знімків за цим запитом не знайдено 🌌');
            }
        } catch (err) {
            setError(`Не вдалося зв'язатися з космосом: ${err.message}`);
        } finally {
            setLoading(false); // Завершуємо анімацію пошуку
        }
    };

    return (
        <div className="space-container">
            <h1 className="space-title">🌌 NASA Cosmic Explorer</h1>
            <p className="space-subtitle">Введіть назву планети, галактики або туманності, щоб побачити 10 реальних фотографій з космосу</p>

            {/* Форма пошуку */}
            <form onSubmit={searchSpace} className="search-box">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Наприклад: Jupiter, Nebula, Orion, Apollo..."
                    className="space-input"
                />
                <button type="submit" className="space-button">
                    Дослідити 🚀
                </button>
            </form>

            {/* Відображення станів черги та помилок */}
            <div id="spaceResults">
                {loading && <p className="status-message">📡 Встановлюємо зв'язок з телескопами NASA...</p>}
                {error && <p className="error-message">{error}</p>}

                {/* Галерея космічних карток */}
                <div className="gallery-grid">
                    {cosmicItems.map((item) => {
                        const info = item.data[0]; // Основні дані про фото
                        const link = item.links[0]; // Посилання на зображення

                        // Форматуємо дату для гарного відображення
                        const formattedDate = info.date_created
                            ? new Date(info.date_created).toLocaleDateString('uk-UA')
                            : 'Дата невідома';

                        return (
                            <div className="space-card" key={info.nasa_id}>
                                <div className="image-wrapper">
                                    <img
                                        src={link ? link.href : 'https://via.placeholder.com/400x300?text=No+Space+Image'}
                                        alt={info.title}
                                        className="space-img"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="card-info">
                                    <div className="card-title" title={info.title}>
                                        {info.title}
                                    </div>
                                    <div className="card-date">
                                        📅 Знімок від: {formattedDate}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SpaceSearch;