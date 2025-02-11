import { useNavigate } from 'react-router';
import './Nav.css';

export default function Returnbar() {
  const navigate = useNavigate();

  return (
    <div>
      <nav>
          <button onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}>{"← Revenir"}</button>
      </nav>
    </div>
  );
};