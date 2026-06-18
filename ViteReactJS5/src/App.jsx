import './components/styles/App.css'
import Header from './components/Header.jsx'
import Ingredients from './components/Ingredients.jsx'
import Steps from './components/Steps.jsx'
import VideoRecipe from './components/Videorecipe.jsx'

function App() {
    return (
        <div className="app">
            <Header />
            <Ingredients />
            <Steps />
            <VideoRecipe />
        </div>
    )
}

export default App