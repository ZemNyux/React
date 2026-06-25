import './styles/Sidebar.css';

export function Sidebar({ menuItems, onMenuSelect }) {
    return (
        <aside className="sidebar">
            <nav>
                <ul className="sidebar-menu">
                    {menuItems.map((item, index) => ( // .map() тут перебирає масив menuItems
                        // і для кожного елемента створює HTML-елемент <li> з посиланням, тобто він перетворює кожен пункт меню
                        // в окремий елемент списку
                        <li key={index}>
                            <a href="#"
                               className="sidebar-link"
                               onClick={() => onMenuSelect(item)}>
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
