import React, {useState} from 'react';

const PixabaySearch = () => {
  const [query, setQuery] = useState('nature');
  const [imageType, setImageType] = useState('photo');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = '50059311-67b92461e0c6542f48deaee0e';

  const searchImages = async () => {
    setLoading(true);
    setError(null);
    setResults([]);

    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
        query
    )}&image_type=${imageType}&per_page=5`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Ошибка: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      if (data.hits.length > 0) {
        setResults(data.hits);
      } else {
        setError('Зображення не знайдено');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
        <style>{`
        body {
          background-color: #121212;
          font-family: Arial, sans-serif;
          color: #ffffff;
          text-align: center;
          padding: 2rem;
        }
        input, button, select {
          padding: 0.5rem;
          margin: 0.5rem;
          border-radius: 5px;
          border: none;
        }
        button {
          background-color: #1db954;
          color: #ffffff;
          cursor: pointer;
        }
        button:hover {
          background-color: #1ed760;
        }
        .image-result {
          margin: 1rem 0;
        }
        img {
          max-width: 100%;
          height: auto;
          border-radius: 10px;
          margin-top: 1rem;
        }
      `}</style>

        <h1>Пошук зображень на Pixabay</h1>

        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Введіть ключове слово для пошуку (наприклад, 'nature')"
            size="70"
        />
        <select value={imageType} onChange={(e) => setImageType(e.target.value)}>
          <option value="photo">Фото</option>
          <option value="illustration">Ілюстрація</option>
          <option value="vector">Вектор</option>
        </select>
        <br/>
        <button onClick={searchImages}>Знайти зображення</button>

        <div id="results">
          {loading && <p>Пошук...</p>}
          {error && <p>{error}</p>}
          {results.map((image) => (
              <div className="image-result" key={image.id}>
                <p>
                  <strong>{image.user}</strong> (Теги: {image.tags})
                </p>
                <img src={image.webformatURL} alt={image.tags}/>
              </div>
          ))}
        </div>
      </>
  );
};

export default PixabaySearch;