import logoMLSearch from '../assets/logoMLSearch.png';
import searchIcon from '../assets/searchIcon.png'

function Header() {
    return(
        <header className="nav-header">
            <form action="/items" className="nav-form">
                <img src={logoMLSearch}
                     alt="mercado-libre-logo"
                     className="ml-logo"
                />
                <input className="nav-input" placeholder='Nunca dejes de buscar' name="search" type="text"/>
                <button type="submit" className="nav-button">
                    <img src={searchIcon}
                        alt="search-icon"
                        className="search-icon"
                    />
                </button>
            </form>
        </header>
    )
}

export default Header;


