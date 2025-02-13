import { useState } from "react";
import Returnbar from "../components/Returnbar";
import Spinner from "../components/Spinner";
import './page.css';
import useUserContext from "../context/UserContext";
import { useNavigate } from "react-router";

export default function Dashboard(){
    const navigate = useNavigate();
    const userContext = useUserContext();
    const [data, setData] = useState(null); /* Ligne affichée pour les donnée ou un message d'erreur */
    const [isLoading, setIsLoading] = useState(true); /* Permet d'activer et de désactiver le spinner (Activé au départ) */
    const token = localStorage.getItem("token"); /* Charge le token */

    if(userContext.user.isAuthentified){
        setTimeout(async () => { //Simule un délai de la réponse de 3s
            fetch("http://localhost:3000/dashboard", { /* Envoie une requête à l'api pour récupérer les données par rapport au token */
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(async res => {
                if(res.status == 200){
                    const json = await res.json(); //Récupération des données
                    const user = {
                        email: json.email,
                        isAuthentified: true
                    }
                    userContext.setUser(user);
                    setData(json);
                    setIsLoading(false);
                }else{
                    const user = {
                        email: "",
                        isAuthentified: false
                    }
                    userContext.setUser(user);
                    localStorage.removeItem("token");
                    setData({
                        error: "Erreur d'autorisation"
                    });
                    setIsLoading(false);
                    navigate("/Login");
                }
            })
            .catch((e) => {
                console.log(e); //Si erreur l'afficher dans la console
                setData({
                    error: "Erreur de connexion à l'API"
                });
                setIsLoading(false);
            });
             //Désactivation du spinner à la fin
        }, 3000);
    }
    
    return (
        <>
            <Returnbar/>
            <h1>Tableau de bord</h1>
            {data != null && data.email != null && <h2>Bienvenue {data.email.split("@")[0].charAt(0).toUpperCase() + data.email.split("@")[0].slice(1)} !</h2>}
            {data != null && data.email != null && <p>Email: {data.email}</p>}
            {data != null && data.error != null && <p>Erreur: {data.error}</p>}
            {isLoading && <Spinner/>}
        </>
    );
};