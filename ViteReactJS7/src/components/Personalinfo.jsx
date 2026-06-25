import './Personalinfo.css'

function PersonalInfo() {
    var fullName = "Микита Габер Сергійович"
    var age = "17 років"
    var university = "Технічний Університет"
    var faculty = "ФІТ (Факультет інформаційних технологій)"
    var specialist = "ДІТ (Цифрові промислові технології)"
    var current_city = "Софія. Болгарія"
    var hometown = "Україна. Одеса"
    var favorite_city_browser = "Мальдіви"
    var year_of_founding = "3 квітня 1879 року"
    var interesting_facts = "1. Прямо в центрі Софії, біля Центральної мінеральної лазні, з бюветів тече гаряча і цілюща мінеральна вода (+46°C). 2. Сучасне метро та центральні вулиці Софії побудовані прямо поверх давньоримського міста Сердика. 3. Гора Вітоша (висота майже 2300 метрів) розташована практично в межах міста"

    return (
        <div className="personal-info">
            <h2>Персональна інформація</h2>

            <div className="info-block">
                <label>ПІБ:</label>
                <span>{fullName}</span>
            </div>

            <div className="info-block">
                <label>Вік:</label>
                <span>{age}</span>
            </div>

            <div className="info-block">
                <label>Університет:</label>
                <span>{university}</span>
            </div>

            <div className="info-block">
                <label>Факультет:</label>
                <span>{faculty}</span>
            </div>

            <div className="info-block">
                <label>Спеціальність:</label>
                <span>{specialist}</span>
            </div>

            <div className="info-block">
                <label>Поточне місто:</label>
                <span>{current_city}</span>
            </div>

            <div className="info-block">
                <label>Рідне місто:</label>
                <span>{hometown}</span>
            </div>

            <div className="info-block">
                <label>Улюблене місто в браузері:</label>
                <span>{favorite_city_browser}</span>
            </div>

            <div className="info-block">
                <label>Рік заснування Софії столиці в Болгарії:</label>
                <span>{year_of_founding}</span>
            </div>

            <div className="info-block">
                <label>3 цікаві факти про столицю Болгарії:</label>
                <span>{interesting_facts}</span>
            </div>
        </div>
    )
}

export default PersonalInfo