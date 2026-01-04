import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <Link
                    to="/"
                    className="logo">
                    🎬 MovieExplorer
                </Link>
                <nav className="nav">
                    <Link
                        to="/"
                        className="nav-link">
                        Home
                    </Link>
                    <Link
                        to="/favorites"
                        className="nav-link">
                        Favorites
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
