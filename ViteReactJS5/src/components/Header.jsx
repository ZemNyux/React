import './styles/Header.css'

function Header() {
    return (
        <div className="header">
            <h1 className="header-title">Домашній Борщ</h1>

            <img
                src="https://images.unian.net/photos/2020_04/thumb_files/1200_0_1588081977-7108.jpg"
                alt="Борщ"
                className="header-img"
            />

            <p className="header-desc">
                Борщ — це традиційна українська страва, яка готується з буряком, капустою,
                картоплею та м'ясом. Це густий, наваристий суп з насиченим червоним кольором
                та неповторним смаком. Борщ — символ української кухні, який готують у кожній
                родині по-своєму.
            </p>

            <p className="header-desc">
                Секрет смачного борщу — це хороший м'ясний бульйон та свіжі овочі. Борщ
                стає ще смачнішим на другий день, коли всі інгредієнти добре просочаться.
                Подається зі сметаною та чорним хлібом.
            </p>

            <div className="header-meta">
                <span>Час приготування: 2 години</span>
                <span>Складність: середня</span>
            </div>
        </div>
    )
}

export default Header