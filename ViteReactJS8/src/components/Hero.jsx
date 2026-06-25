import { useState, useEffect } from "react";

// Крок переміщення в пікселях
const STEP = 20;

function Hero() {
    // Стан: позиція по X та по Y
    const [posX, setPosX] = useState(100);
    const [posY, setPosY] = useState(100);

    useEffect(() => {
        // Обробник натискання клавіш
        function handleKeyDown(event) {
            switch (event.key) {
                case "ArrowUp":
                    event.preventDefault(); // не скролимо сторінку
                    setPosY((prev) => prev - STEP);
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    setPosY((prev) => prev + STEP);
                    break;
                case "ArrowLeft":
                    event.preventDefault();
                    setPosX((prev) => prev - STEP);
                    break;
                case "ArrowRight":
                    event.preventDefault();
                    setPosX((prev) => prev + STEP);
                    break;
                default:
                    break;
            }
        }

        // Підписуємось на подію при монтуванні компонента
        window.addEventListener("keydown", handleKeyDown);

        // Відписуємось при розмонтуванні (cleanup)
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []); // [] — запускається тільки один раз

    return (
        <div style={{ position: "relative", width: "100vw", height: "100vh", background: "#1a1a2e", overflow: "hidden" }}>
            {/* Інструкція */}
            <p style={{ color: "#aaa", fontFamily: "monospace", padding: "16px", margin: 0 }}>
                Використовуй стрілки ← ↑ → ↓ для переміщення героя
            </p>

            {/* Координати */}
            <p style={{ color: "#555", fontFamily: "monospace", paddingLeft: "16px", margin: 0 }}>
                X: {posX} | Y: {posY}
            </p>

            {/* Герой */}
            <div
                style={{
                    position: "absolute",
                    left: posX,
                    top: posY,
                    width: 50,
                    height: 50,
                    background: "#e94560",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    boxShadow: "0 0 16px #e94560",
                    transition: "left 0.05s, top 0.05s",
                    userSelect: "none",
                }}
            >
                🧑
            </div>
        </div>
    );
}

export default Hero;