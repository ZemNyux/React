import './styles/MyButton.css'
import {useState} from "react";

function MyButton() {
    // useState - хук, робить стан для компонента
    // color - константа для перегляду стану
    // setColor - функція для зміни стану
    // порівняти можна з полем класу
    const [color, setColor] = useState('red')

    const [width, setWidth] = useState(100)

    return (
        <>
            <button onClick={() => {
                let randomColor = Math.floor(Math.random() * 16777215).toString(16);
                setColor('#' + randomColor);
                setWidth(width + 20)
            }}
                    style={{backgroundColor: color, width: width + 'px'}}>Push
            </button>
        </>
    )
}

export default MyButton