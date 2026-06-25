import './styles/Header.css';

export function Header({ title, userCount, theme }) {
    return (
        <header className="header" style={{ backgroundColor: theme.background, color: theme.color }}>
            <h1 className="header-title">{title}</h1>
            <p style={{ textAlign: theme.align }}>Активних користувачів по усьому світі прям зараз: {userCount}</p>
        </header>
    );
}
