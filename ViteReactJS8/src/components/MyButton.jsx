import './styles/MyButton.css';
import {useState} from "react";

export function MyButton(props) {
    const [count, setCount] = useState(0);
    return (
        <button className="my-button" onClick={()=> setCount(count + 1)}>
            {props.label} (Клацнули {count} разів)
        </button>
    );
}
