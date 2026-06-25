import './Contactdetails.css'

function ContactDetails() {
    var phone = "+359 876 602 150"
    var email = "nikita.gaber2703@gmail.com"
    var github = "ZemNyux"
    var telegram = "@ZemNyux"

    return (
        <div className="contact-details">
            <h2>Контактна інформація</h2>

            <div className="contact-block">
                <label>Телефон:</label>
                <span>{phone}</span>
            </div>

            <div className="contact-block">
                <label>Email:</label>
                <span>{email}</span>
            </div>

            <div className="contact-block">
                <label>GitHub:</label>
                <span>{github}</span>
            </div>

            <div className="contact-block">
                <label>Telegram:</label>
                <span>{telegram}</span>
            </div>
        </div>
    )
}

export default ContactDetails