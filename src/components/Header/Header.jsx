import { Link } from "react-router-dom";
import "./style.css";
import logo from "../../assets/soul-pet-logo.svg";

export function Header() {
    return (
        <header className="header w-100 px-3 py-2">
            <nav className="container d-flex justify-content-between align-items-center">
                <Link to="/">
                    <img src={logo} alt="SoulPet" />
                </Link>
                <div className="d-flex gap-5">
                    <Link to="/clientes">Clientes</Link>
                    <Link to="/pets">Pets</Link>
                    <Link to="/pedidos">Pedidos</Link>
                </div>
            </nav>
        </header>
    );
}