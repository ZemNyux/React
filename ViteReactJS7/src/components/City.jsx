import './City.css'

function City(props) {
    return (
        <article className="city-card">
            <h3>{props.name}</h3>
            <img src={props.photo} alt={props.name} className="city-photo" />
            <ul className="city-facts">
                {props.facts.map((fact, index) => (
                    <li key={index}>{fact}</li>
                ))}
            </ul>
        </article>
    )
}

export default City
