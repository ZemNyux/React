import './App.css'
import Header from './components/Header'
import PersonalInfo from './components/PersonalInfo'
import ContactDetails from './components/ContactDetails'

function App() {
  return (
      <div className="container">
        <Header />
        <PersonalInfo />
        <ContactDetails />
      </div>
  )
}

export default App