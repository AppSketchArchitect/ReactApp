import Navbar from "../components/Navbar";
import './page.css';

export default function Home(){ //Page d'accueil
    return (
        <>
            <Navbar/>
            <h1>Accueil</h1>
            <p>Voici une page d'accueil permettant de faire sa pub ou autre...</p>
        </>
    );
}