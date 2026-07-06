import { useState, useEffect } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // асинхронна функція всередині ефекту
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) throw new Error('Помилка завантаження користувачів');
                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUsers();

        // функція очищення
        return () => {
            // логіка очищення, якщо потрібна (наприклад, скасування запиту)
        };
    }, []); // пустий масив залежностей: ефект виконується один раз при монтуванні

    if (loading) return <div>Завантаження...</div>;
    if (error) return <div>Йой: {error}</div>;

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}

export default UserList;
