import { useNavigate } from 'react-router';
import './Nav.css';

export default function Returnbar() {
  const navigate = useNavigate();

  return (
    <div>
      <nav>
          <button onClick={(e) => { //Renvoie à la page de base (Index) soit /Home
            e.preventDefault();
            navigate("/");
          }}>{"← Revenir"}</button>
      </nav>
    </div>
  );
};