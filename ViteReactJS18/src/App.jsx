import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [log, setLog] = useState([]);
  const ws = useRef(null);
  const msgId = useRef(1);

  // підключення до WebSocket і підписка на вхідні повідомлення
  useEffect(() => {
    ws.current = new WebSocket('wss://ws.postman-echo.com/raw');

    // wss://ws.postman-echo.com/raw — це публічний WebSocket ехо-сервер, наданий Postman, популярним інструментом для тестування API
    // що робить цей сервіс:
    // 1) приймає WebSocket-повідомлення від клієнта
    // 2) миттєво надсилає назад (echo) ті самі повідомлення
    // 3) використовується виключно для тестування - не зберігає стан, не маршрутизує повідомлення іншим клієнтам, не підтримує повноцінний чат тощо
    // https://blog.postman.com/introducing-postman-websocket-echo-service/
    // альтернативи: Socket.IO, PieSocket Demo, WebSocket.org Echo, SocketBay, Mocksocket by Mocky, WebSocket-сервера на Fastify / Express / NestJS, PubNub, Ably, Pusher, власний сервер :)
    // https:// - це HTTP, і можна робити ТІЛЬКИ односпрямовані запити (клієнт > сервер, сервер відповідає)
    // wss:// - це WebSocket, і він дозволяє двосторонній зв’язок: сервер може сам надсилати дані клієнту в будь-який час, не чекаючи запиту!
    // https://datatracker.ietf.org/doc/html/rfc6455

    ws.current.onopen = () => {
      console.log('WebSocket відкрито');
      // надсилаємо повідомлення кожні 2 секунди
      ws.current.sendInterval = setInterval(() => {
        const message = `Повідомлення #${msgId.current}`;
        ws.current.send(message);
        msgId.current += 1;
      }, 2000);
    };

    ws.current.onmessage = (event) => {
      const received = event.data;
      setMessages(prev => [...prev, received]);
      setUnreadCount(prev => prev + 1);
    };

    ws.current.onerror = (err) => {
      console.error('WebSocket помилка:', err);
    };

    ws.current.onclose = () => {
      console.log('WebSocket закрито');
      clearInterval(ws.current.sendInterval);
    };

    // очищення
    return () => {
      if (ws.current) {
        clearInterval(ws.current.sendInterval);
        ws.current.close();
      }
    };
  }, []);

  // оновлення document.title при отриманні нових повідомлень
  useEffect(() => {
    document.title = unreadCount > 0
        ? `(${unreadCount}) Нові повідомлення`
        : 'Немає нових повідомлень';
  }, [unreadCount]);

  // логування повідомлень (аналіз дій)
  useEffect(() => {
    if (messages.length > 0) {
      const latest = messages[messages.length - 1];
      const entry = `[${new Date().toLocaleTimeString('uk-UA')}] Отримано: ${latest}`;
      setLog(prev => [...prev, entry]);
    }
  }, [messages]);

  return (
      <div>
        <h1>Панель WebSocket</h1>
        <p><strong>Останнє повідомлення:</strong> {messages[messages.length - 1] || '—'}</p>
        <p><strong>Непрочитані:</strong> {unreadCount}</p>
        <button onClick={() => setUnreadCount(0)}>Очистити лічильник</button>

        <h2>Повідомлення:</h2>
        <ul>
          {messages.map((msg, i) => (
              <li key={i}>{msg}</li>
          ))}
        </ul>

        <h2>Лог подій:</h2>
        <ul>
          {log.map((entry, i) => (
              <li key={i}>{entry}</li>
          ))}
        </ul>
      </div>
  );
}

export default App;