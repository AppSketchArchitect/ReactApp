import { useNavigate } from 'react-router';
import './Nav.css';
import { useUserContext } from "../context/UserContext";

export default function Navbar() {
    const userContext = useUserContext();
    const navigate = useNavigate();

    const onDisconnect = (e) => {
      e.preventDefault();
      userContext.setUser({ email: '', isAuthentified: false });
      localStorage.removeItem("token");
      navigate("/Login");
    }

    return (
      <div>
        <nav>
          <button onClick={(e) => {
            e.preventDefault();
            navigate("/Register");
          }}>{"S'inscrire"}</button>
          <button onClick={(e) => {
            e.preventDefault();
            navigate("/Login");
          }}>{"Connexion"}</button>
          <button onClick={(e) => {
            e.preventDefault();
            navigate("/Dashboard");
          }}>{"Tableau de bord"}</button>
          <button onClick={onDisconnect}>Se déconnecter</button>
        </nav>
      </div>
    );
};