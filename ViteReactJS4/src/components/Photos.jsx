import './Photos.css'

function Photos() {

    var photo1 = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Sofia_University_%2837536311404%29.jpg/250px-Sofia_University_%2837536311404%29.jpg"
    var photo2 = "https://www.azimutyachts.ru/prev1920x1080/i/list/Maldives-charter-yachts.jpg"
    var photo3 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1h79BrjhTBWY_COBcISvKUIKpkOFApe-5gA&s"

    return (
        <div className="photos-block">
            <img src={photo1} alt="фото 1" className="photo" />
            <img src={photo2} alt="фото 2" className="photo" />
            <img src={photo3} alt="фото 3" className="photo" />
        </div>
    )
}

export default Photos