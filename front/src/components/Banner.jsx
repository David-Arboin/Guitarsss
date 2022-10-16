import '../styles/Banner.css'
import logo from '../assets/logo.png'

function Banner () {

    return (
        <div className='guitarsss-banner'>
                            <img
                    src={logo}
                    alt="Logo de l'application Guitarss"
                    className="guitarsss-logo"
                />
                <h1 className="guitarsss-title">Guitarsss</h1>
        </div>
    )
}
export default Banner