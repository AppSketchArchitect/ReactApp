import { useState } from "react";
import Returnbar from "../components/Returnbar";
import Spinner from "../components/Spinner";
import './page.css';

import z from "zod";

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3)
});

export default function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const onRegister = (e) => {
        e.preventDefault();
        
        setIsLoading(true);

        setErrorMessage("");
        setSuccessMessage("");

        if(password != confirmedPassword){
            setErrorMessage("Les mots de passe doivent être identique");
        }
        
        const data = {
            email: email,
            password: password
        }

        const registerParsed = registerSchema.safeParse(data);

        if(registerParsed.success == true){
            
            fetch("http://localhost:3000/register",{
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
                            setSuccessMessage("Inscription réussie !");
                            break;
                        case 401:
                            setErrorMessage("Les entrées sont incorrectes.");
                            break;
                        case 400:
                            setErrorMessage("L'email est déja utilisé.");
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
        }else{
            setErrorMessage("Entrée (email ou mot de passe) incorrect pour l'enregistrement.");
            setIsLoading(false);
        }
    }

    return (
        <>
            <Returnbar/>
            <h1>S'inscrire</h1>
            <form onSubmit={onRegister}>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe"/>
                <input type="password" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} placeholder="Confirmation du mot de passe"/>
                <button type="submit">S'inscrire</button>
                {errorMessage != "" && <p style={{ color: "red", marginTop: "10px"}}>{errorMessage}</p>}
                {successMessage != "" && <p style={{ color: "green", marginTop: "10px"}}>{successMessage}</p>}
            </form>
            {isLoading && <Spinner/>}
        </>
    );
};