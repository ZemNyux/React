import './App.css'
import {useEffect, useState} from "react";

export function App() {
  const [count, setCount] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const randomId = Math.floor(Math.random() * 500) + 1; // JSONPlaceholder має 500 коментарів
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${randomId}`);
        const data = await response.json();
        setComments(prev => [...prev, data]);
        console.log('Новий коментар:', data);
      } catch (error) {
        console.error('Помилка API при отриманні коментаря:', error);
      }
    };

    const interval = setInterval(fetchComment, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
      <main className="content">
        <div>
          <h3>Коментарі:</h3>
          {comments.length > 0 ? (
              <ul>
                {comments.map((comment, index) => (
                    <li key={index}>
                      <strong>{comment.name}</strong>: {comment.body}
                    </li>
                ))}
              </ul>
          ) : (
              <p>Коментарів поки що немає</p>
          )}
        </div>
      </main>
  );

  return (
      <><p>Text</p>
        <button onClick={() => setCount(count + 1)}>{count}</button>
      </>

  );
}

export default App
