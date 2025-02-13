import { useNavigate } from 'react-router';
import './Nav.css';
import { useUserContext } from "../context/UserContext";

export default function Navbar() {
    const userContext = useUserContext();
    const navigate = useNavigate();

    //Si le bouton déconnexion est cliqué, alors on reset le contexte, on supprime le token enregistré
    //et on renvoie l'utilisateur à la page login
    const onDisconnect = (e) => {
      e.preventDefault();
      userContext.setUser({ email: '', isAuthentified: false });
      localStorage.removeItem("token");
      navigate("/Login");
    }

    //Si les boutons de pages (ex: Register) est cliqué on envoie l'utilisateur à la page correspondante
    return (
      <div>
        <nav>
          {!userContext.user.isAuthentified && <button onClick={(e) => {
            e.preventDefault();
            navigate("/Register");
          }}>{"S'inscrire"}</button>}

          {!userContext.user.isAuthentified && <button onClick={(e) => {
            e.preventDefault();
            navigate("/Login");
          }}>{"Connexion"}</button>}
          
          {userContext.user.isAuthentified && <button onClick={(e) => {
            e.preventDefault();
            navigate("/Dashboard");
          }}>{"Tableau de bord"}</button>}

          {userContext.user.isAuthentified && <button onClick={ (e) => {
            e.preventDefault();
            navigate("/UpdatePassword");
          }}>{"Changer de mot de passe"}</button>}
          
          {userContext.user.isAuthentified && 
            <button onClick={onDisconnect}>
              Se déconnecter
            </button>
          }
        </nav>
      </div>
    );
};