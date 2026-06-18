import './styles/Videorecipe.css'

function VideoRecipe() {
    return (
        <div className="video-block">
            <h2>Відео рецепт</h2>

            <p className="video-desc">
                Дивіться покрокове відео приготування смачного українського борщу.
                У відео показані всі тонкощі приготування — від варіння бульйону
                до подачі на стіл зі сметаною та зеленню.
            </p>

            <div className="video-wrapper">
                <iframe
                    width="100%"
                    height="500"
                    src="https://www.youtube.com/embed/79XeTHAwQSE?si=Thy01fZqjkqjBVcy"
                    title="Рецепт Борщу"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    )
}

export default VideoRecipe