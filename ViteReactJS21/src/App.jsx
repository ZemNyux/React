import React, {createContext, useContext, useState} from 'react';
import './App.css';

// контекст для теми
const ThemeContext = createContext();
/* ThemeContext використовується для зберігання поточної теми (theme) і функції перемикання (toggleTheme),
які передаються всім компонентам через ThemeContext.Provider у компоненті App
компоненти Header, Sidebar, MainContent, Footer і ThemeToggle використовують хук useContext(ThemeContext)
для доступу до значення теми і динамічного застосування стилів,
а ThemeToggle викликає toggleTheme для зміни теми */

// компонент перемикання теми
function ThemeToggle() {
  const {theme, toggleTheme} = useContext(ThemeContext);
  return (
      <button
          className="theme-toggle"
          onClick={toggleTheme}
      >
        Перемкнути на {theme === 'light' ? 'темну' : 'світлу'} тему
      </button>
  );
}

function Header() {
  const {theme} = useContext(ThemeContext);
  return (
      <header className={`header ${theme}`}>
        <h1>useContext для теми додатка</h1>
        <br></br>
        <ThemeToggle/>
      </header>
  );
}

function Sidebar() {
  const {theme} = useContext(ThemeContext);
  return (
      <aside className={`sidebar ${theme}`}>
        <h2>Бічна панель</h2>
        <ul>
          <li>Пункт 1</li>
          <li>Пункт 2</li>
        </ul>
      </aside>
  );
}

function MainContent() {
  const {theme} = useContext(ThemeContext);
  return (
      <main className={`main-content ${theme}`}>
        <h2>Основний контент</h2>
        <p>Тема: {theme === 'light' ? 'світла' : 'темна'}.</p>
      </main>
  );
}

function Footer() {
  const {theme} = useContext(ThemeContext);
  return (
      <footer className={`footer ${theme}`}>
        <p>© 2025 useContext</p>
      </footer>
  );
}

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <div className={`app ${theme}`}>
          <Header/>
          <div className="content-wrapper">
            <Sidebar/>
            <MainContent/>
          </div>
          <Footer/>
        </div>
      </ThemeContext.Provider>
  );
}

export default App;