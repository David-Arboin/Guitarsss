import '../styles/Banner.css'
import BandeauGuitarsss from '../assets/Bandeau-Guitarsss.jpg'

function Banner () {

    return (
        <div className='guitarsss-banner'>
                            <img
                    src={BandeauGuitarsss}
                    alt="Bandeau de l'application Guitarsss"
                    className="bandeau-guitarsss-logo"
                />
        </div>
    )
}
export default Banner