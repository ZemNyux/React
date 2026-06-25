import './MyButton.css'

function MyButton(props) {
    return (
        <button
            className="my-button"
            style={{
                backgroundColor: props.color,
                width: props.width,
                height: props.height,
            }}
        >
            {props.text}
        </button>
    )
}

export default MyButton
