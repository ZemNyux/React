import {useReducer, useState} from 'react';
import './App.css';

function r(state, action) {
    switch (action) {
        case 'INCREMENT':
        case 'INC':
            return state + 1;
        case 'DECREMENT':
        case 'DEC':
            return state - 1;
        case 'RESET':
        case 'RST':
            return 0;
        default:
            return state;
    }
}

function App() {
    const [count, dispatch] = useReducer(r, 0);

    return <div>
        <h1>Лічильник: {count}</h1>
        <button onClick={() => dispatch('INCREMENT')}>Збільшити на 1</button>
        <button onClick={() => dispatch('DECREMENT')}>Зменшити на 1</button>
        <button onClick={() => dispatch('RESET')}>Скинути в 0</button>
    </div>;
}

export default App;