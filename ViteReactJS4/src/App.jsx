import './App.css'
import Header from './components/Header'
import Photos from './components/Photos'
import PersonalInfo from './components/PersonalInfo'
import ContactDetails from './components/ContactDetails'

function App() {
    return (
        <div className="container">
            <Header />
            <Photos />
            <PersonalInfo />
            <ContactDetails />
        </div>
    )
}

export default App