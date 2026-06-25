import './App.css'
import Header from './components/Header'
import Photos from './components/Photos'
import PersonalInfo from './components/Personalinfo'
import ContactDetails from './components/Contactdetails'
import City from './components/City'
import MyButton from './components/MyButton'

function App() {
    const odesaFacts = [
        'Одеса розташована на березі Чорного моря.',
        'Місто відоме Потьомкінськими сходами.',
        'Одесу часто називають столицею гумору.',
    ]

    const kyivFacts = [
        'Київ є столицею України.',
        'Місто стоїть на річці Дніпро.',
        'Києву понад 1500 років.',
    ]

    return (
        <div className="container">
            <Header />
            <Photos />
            <section className="practice-section">
                <h2>Практика</h2>
                <div className="cities">
                    <City
                        name="Odesa"
                        photo="./odesa.png"
                        facts={odesaFacts}
                    />
                    <City
                        name="Kyiv"
                        photo="./kyiv.png"
                        facts={kyivFacts}
                    />
                </div>
            </section>
            <section className="practice-section">
                <h2>Практика</h2>
                <div className="buttons-row">
                    <MyButton color="red" width="100px" height="50px" text="Nikita" />
                    <MyButton color="blue" width="150px" height="70px" text="Gaber" />
                    <MyButton color="green" width="200px" height="90px" text="Technical University" />
                </div>
            </section>
            <PersonalInfo />
            <ContactDetails />
        </div>
    )
}

export default App
