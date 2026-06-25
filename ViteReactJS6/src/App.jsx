import './components/styles/App.css'
import MyButton from "./components/MyButton.jsx";

function App() {
  return (
      <>
        <MyButton color="red" width="100px" height="50px" text="Alex"/>
        <MyButton color="blue" width="150px" height="70px" text="Hello"/>
        <MyButton color="green" width="200px" height="90px" text="P45"/>
      </>
  )
}

export default App
