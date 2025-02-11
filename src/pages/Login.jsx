import { useEffect, useState } from "react";
import Returnbar from "../components/Returnbar";
import Spinner from "../components/Spinner";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import './page.css';

export default function Login(){
    const userContext = useUserContext();
    const navigate = useNavigate();

    if(userContext.user.isAuthentified){
        useEffect(()=> {
            navigate("/Dashboard");
        }, []);
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const onLogin = (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrorMessage("");
        
        const data = {
            email: email,
            password: password
        }

        fetch("http://localhost:3000/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(async res => {
            setTimeout(async () => { //Simule un délai de la réponse de 3s
                switch(res.status){
                    case 200:
                        const json = await res.json();
                        localStorage.setItem("token", json.token);
                        const user = {
                            email: email,
                            isAuthentified: true
                        };
                        await userContext.setUser(user);
                        navigate("/Dashboard");
                        break;
                    case 404:
                        setErrorMessage("Utilisateur non trouvé.");
                        break;
                    case 400:
                        setErrorMessage("Les entrées sont incorrectes.");
                        break;
                    default:
                        console.log(res.status);
                        setErrorMessage("Une erreur s'est produite.");
                        break;
                }
                setIsLoading(false);
            }, 3000);
        })
        .catch(err => console.log("Erreur:", err));
    }

    return (
        <>
            <Returnbar/>
            <h1>Connexion</h1>
            <form onSubmit={onLogin}>
                <div/>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                <div/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe"/>
                <div/>
                <button type="submit">Se connecter</button>
                <div/>
                {errorMessage != "" && <p style={{ color: "red", marginTop: "10px"}}>{errorMessage}</p>}
            </form>
            {isLoading && <Spinner/>}
        </>
    );
};