import './styles/MyButton.css'

function MyButton() {
    function handleClick() {
        alert('Кнопку натиснуто!');
    }
    return (
        <button onClick={handleClick}>
            Натисни мене!
        </button>
    );
}

export default MyButton;