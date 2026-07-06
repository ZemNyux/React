function ListItem({ person }) {
    return (
        <li>
            <img
                src={person.avatar}
                alt={`${person.firstName} ${person.lastName}`}
                className="avatar"
            />
            <span>
                {person.lastName} {person.firstName} — {person.phoneNumber}
            </span>
        </li>
    );
}

// компонента самого списку
function List({ people }) {
    return (
        <div>
            <h2>Список контактів</h2>
            {people.length === 0 ? (
                <p>Список пустий</p>
            ) : (
                <ul>
                    {people.map(person => (
                        <ListItem key={person.id} person={person} />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default List;