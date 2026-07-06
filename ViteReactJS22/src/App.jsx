import React, {createContext, useContext, useState} from 'react';
import './App.css';

// контекст автентифікації
const AuthContext = createContext();

// провайдер контексту автентифікації
function AuthProvider({children}) {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    role: 'гість'
  });

  // функція входу в систему
  const login = (userData) => {
    setAuth({
      isAuthenticated: true,
      user: userData,
      role: userData.role || 'користувач'
    });
  };

  // функція реєстрації
  const register = (userData) => {
    setAuth({
      isAuthenticated: true,
      user: userData,
      role: userData.role || 'користувач'
    });
  };

  // функція входу як гість
  const guestLogin = () => {
    setAuth({
      isAuthenticated: false,
      user: {name: 'Гість'},
      role: 'гість'
    });
  };

  // функція виходу
  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
      role: 'гість'
    });
  };

  return (
      <AuthContext.Provider value={{auth, login, register, guestLogin, logout}}>
        {children}
      </AuthContext.Provider>
  );
}

// кастомний хук useAuth спрощує доступ до контексту AuthContext, надаючи компонентам зручний спосіб
// отримання даних і методів автентифікації (auth, login, register, guestLogin, logout)

// замість повторюваного виклику useContext(AuthContext) у кожному компоненті, useAuth робить код чистішим,
// читабельнішим і підтримує єдиний інтерфейс для роботи з контекстом
const useAuth = () => useContext(AuthContext);

// головний компонент додатка
function App() {
  const [screen, setScreen] = useState('auth');
  const [theme, setTheme] = useState('light');

  // перемикання теми
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // перехід на екран контенту
  const goToContent = () => {
    setScreen('content');
  };

  // перехід на екран авторизації
  const goToAuth = () => {
    setScreen('auth');
  };

  // зміна екранів залежить від стану screen
  return (
      <AuthProvider>
        <div className={`app ${theme}`}>
          {screen === 'auth' ? (
              <AuthScreen goToContent={goToContent} toggleTheme={toggleTheme}/>
          ) : (
              <ContentScreen goToAuth={goToAuth} toggleTheme={toggleTheme}/>
          )}
        </div>
      </AuthProvider>
  );
}

// екран автентифікації
function AuthScreen({goToContent, toggleTheme}) {
  return (
      <div className="auth-container">
        <ThemeToggle toggleTheme={toggleTheme}/>
        <AuthForm goToContent={goToContent}/>
        <GuestButton goToContent={goToContent}/>
      </div>
  );
}

// компонент кнопки перемикання теми
function ThemeToggle({toggleTheme}) {
  return (
      <button className="auth-button" onClick={toggleTheme}>
        Змінити тему
      </button>
  );
}

// форма входу та реєстрації
function AuthForm({goToContent}) {
  const {login, register} = useAuth();
  const [loginInput, setLoginInput] = useState('Alex');
  const [password, setPassword] = useState('1234');

  // обробник входу
  const handleLogin = (e) => {
    e.preventDefault();
    login({name: loginInput, role: 'користувач'});
    goToContent();
  };

  // обробник реєстрації
  const handleRegister = (e) => {
    e.preventDefault();
    register({name: loginInput, role: 'користувач'});
    goToContent();
  };

  return (
      <form className="auth-form">
        <h2>Авторизація</h2>
        <input
            type="text"
            placeholder="Логін"
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
            required
        />
        <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <div className="button-group">
          <button className="auth-button" onClick={handleLogin}>
            Вхід
          </button>
          <button className="auth-button" onClick={handleRegister}>
            Реєстрація
          </button>
        </div>
      </form>
  );
}

// кнопка входу як гість
function GuestButton({goToContent}) {
  const {guestLogin} = useAuth();

  // обробник входу як гість
  const handleGuestLogin = () => {
    guestLogin();
    goToContent();
  };

  return (
      <button className="auth-button guest" onClick={handleGuestLogin}>
        Увійти як гість
      </button>
  );
}

// екран контенту
function ContentScreen({goToAuth, toggleTheme}) {
  return (
      <div className="content-container">
        <ThemeToggle toggleTheme={toggleTheme}/>
        <UserInfo/>
        <Content/>
        <Settings/>
        <LogoutButton goToAuth={goToAuth}/>
      </div>
  );
}

// інформація про користувача
function UserInfo() {
  const {auth} = useAuth();

  return (
      <div className="content-section">
        <h2>Користувач</h2>
        <p>Ім’я: {auth.user?.name || 'Гість'}</p>
        <p>Роль: {auth.role}</p>
        <p>Статус: {auth.isAuthenticated ? 'Автентифікація успішна' : 'Не автентифікований'}</p>
      </div>
  );
}

// контент
function Content() {
  const {auth} = useAuth();

  return (
      <div className="content-section">
        <h2>Контент</h2>
        <p>Вітаємо, {auth.user?.name || 'Гість'}!</p>
      </div>
  );
}

// налаштування
function Settings() {
  const {auth} = useAuth();

  return (
      <div className="content-section">
        <h2>Налаштування</h2>
        <p>{auth.isAuthenticated ? 'Налаштування користувача.' : 'Увійдіть для налаштувань.'}</p>
      </div>
  );
}

// кнопка виходу
function LogoutButton({goToAuth}) {
  const {logout} = useAuth();

  // обробник виходу
  const handleLogout = () => {
    logout();
    goToAuth();
  };

  return (
      <button className="auth-button" onClick={handleLogout}>
        Вийти
      </button>
  );
}

export default App;