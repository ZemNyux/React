import './App.css';
import { useEffect, useState } from "react";

export function App() {
  const [dogImageUrl, setDogImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRandomDog = async () => {
      try {
        const response = await fetch("https://images.dog.ceo/api/breeds/image/random");
        const data = await response.json();

        setDogImageUrl(data.message);
        setIsLoading(false);
      } catch (error) {
        console.error("Помилка при завантаженні песика:", error);
      }
    };

    fetchRandomDog();
    const interval = setInterval(fetchRandomDog, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
      <main className="content" style={{ textAlign: "center", padding: "20px" }}>
        <h2>Песик кожну секунду:</h2>

        <div className="image-container" style={{ minHeight: "350px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          {isLoading ? (
              <p>Завантаження першого песика</p>
          ) : (
              <img
                  src={dogImageUrl}
                  alt="Випадковий собака"
                  style={{ maxWidth: "100%", maxHeight: "350px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}
              />
          )}
        </div>
      </main>
  );
}

export default App;