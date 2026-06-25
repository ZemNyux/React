import './styles/Content.css';

export function Content({welcomeMessage, settings}) {
    const handleInputChange = (event) => {
        console.log('Введено:', event.target.value);
    };

    const handleInputFocus = () => {
        console.log('Поле у фокусі');
    };

    const handleInputBlur = () => {
        console.log('Поле втратило фокус');
    };

    return (
        <main className="content">
            <h2 className="content-title">{welcomeMessage}</h2>
            <p>
                Рівень складності: {settings.difficulty} | Гравців із групи: {settings.players}
            </p>
            <div>
                <input
                    type="text"
                    className="content-input"
                    placeholder="Введіть текст..."
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onKeyDown={(e) => console.log('Натиснуто клавішу:', e.key)}
                    onKeyUp={(e) => console.log('Відпустили клавішу:', e.key)}
                    onCopy={() => console.log('Текст скопійовано')}
                    onCut={() => console.log('Текст вирізали')}
                    onPaste={() => console.log('Текст вставили')}
                />
            </div>
        </main>

    );

}