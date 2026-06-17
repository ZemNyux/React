import './PersonalInfo.css'

function PersonalInfo() {
    var fullName = "Микита Габер Сергійович"
    var age = "17 років"
    var university = "Технічний Університет Софії"
    var faculty = "ФІТ (Факультет інформаційних технологій)"
    var specialist = "ДІТ (Цифрові промислові технології)"

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
        </div>
    )
}

export default PersonalInfo