import logo from '../assets/logo.png'

/**
 * @function Header 
 * @returns {JSX} horizontal NavBar
 */

function Header(){
    return(
        <header>
            <img src={logo} alt='sportsee-logo'/>
            <nav>
                <ul>
                    <li>Accueil</li>
                    <li>Profil</li>
                    <li>Réglage</li>
                    <li>Communauté</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;