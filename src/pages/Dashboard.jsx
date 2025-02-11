import { useState } from "react";
import Returnbar from "../components/Returnbar";
import Spinner from "../components/Spinner";
import './page.css';
import useUserContext from "../context/UserContext";

export default function Dashboard(){
    const userContext = useUserContext();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem("token");

    if(userContext.user.isAuthentified){
        setTimeout(async () => { //Simule un délai de la réponse de 3s
            fetch("http://localhost:3000/dashboard", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(async res => {
                if(res.status == 200){
                    const json = await res.json();
                    setData(json);
                }else{
                    setData({error: "Erreur d'autorisation."});
                }
            })
            .catch((e) => {
                console.log(e);
            });
            setIsLoading(false);
        }, 3000);
    }
    
    return (
        <>
            <Returnbar/>
            <h1>Tableau de bord</h1>
            {data != null && <h2>Bienvenue {data.email.split("@")[0].charAt(0).toUpperCase() + data.email.split("@")[0].slice(1)} !</h2>}
            {data != null && data.email != null && <p>Email: {data.email}</p>}
            {data != null && data.error != null && <p>Erreur: {data.error}</p>}
            {isLoading && <Spinner/>}
        </>
    );
};