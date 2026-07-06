import './App.css'

export function App() {
    // масив даних
    const items = [
        { id: 1, name: 'Ківі' },
        { id: 2, name: 'Манго' },
        { id: 3, name: 'Папайя' },
    ];

    return (
        <div>
            <h1>Список смаків</h1>
            <ul>
                {items.map(item => (
                    <li>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}