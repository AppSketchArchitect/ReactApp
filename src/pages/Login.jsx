import { useEffect, useState } from "react";
import Returnbar from "../components/Returnbar";
import Spinner from "../components/Spinner";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import './page.css';

export default function Login() {
    const userContext = useUserContext();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (userContext.user.isAuthentified || (token != null && token != "")) { //Si l'utilisateur est déja connecté le renvoyer à Dashboard
            userContext.setUser({
                email: userContext.user.email,
                isAuthentified: true
            })
            navigate("/Dashboard");
        }
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); //Pour afficher un msg d'erreur

    const [isLoading, setIsLoading] = useState(false); //Pour activer ou désactiver le spinner

    const onLogin = (e) => { //Fonction activée au moment de l'essai de connexion
        e.preventDefault();

        setIsLoading(true); //Active le spinner
        setErrorMessage(""); //Message vide au départ

        const data = {
            email: email,
            password: password
        }

        fetch("http://localhost:3000/login", { //Envoie une requête à l'api pour essayer de se connecter
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(async res => {
            setTimeout(async () => { //Simule un délai de la réponse de 3s
                switch (res.status) {
                    case 200:
                        const json = await res.json(); //Récupération des données
                        localStorage.setItem("token", json.token); //Enregistrement du token
                        const user = {
                            email: email,
                            isAuthentified: true
                        };
                        userContext.setUser(user); //Modification du contexte
                        navigate("/Dashboard"); //Direction vers le Dashboard
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
                setIsLoading(false); //Désactivation du spinner
            }, 3000);
        })
        .catch(err => {
            console.log("Erreur:", err)
            setIsLoading(false);
        });
    }

    return (
        <>
            <Returnbar />
            <h1>Connexion</h1>
            <form onSubmit={onLogin}>
                <div />
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <div />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
                <div />
                <button type="submit">Se connecter</button>
                <div />
                {errorMessage != "" && <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>}
            </form>
            {isLoading && <Spinner />}
        </>
    );
};