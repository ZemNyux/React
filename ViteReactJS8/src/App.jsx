import './App.css'


import { Header } from './components/Header.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { Content } from './components/Content.jsx';

export function App() {

    const headerProps = {
        title: "Fortnite: The Endless React",
        userCount: 2026,
        theme: { background: "#7c1ed4", color: "#dcdc16", align: "center" }
    };

    const sidebarProps = {
        menuItems: ["Нова гра",
            "Завантажити гру",
            "Таблиця рекордів",
            "Налаштування",
            "1",
            "2",
            "3",
            "4",
            "Про автора",
            "Вийти"],
        onMenuSelect: (item) => {
            if (item === "Нова гра") alert("Lets play!");
            else if (item === "Завантажити гру") alert("Loading data from server...");
            else alert("You selected: " + item);
        }
    };

    const contentProps = {
        welcomeMessage: "Ласкаво просимо до Фортнайту!",
        settings: { difficulty: "Ізі", players: 25 }
    };

    return (
        <div className="app-container">
            <Header {...headerProps} />
            <div className="main-container">
                <Sidebar {...sidebarProps} />
                <Content {...contentProps} />
            </div>
        </div>
    );
}


export default App
