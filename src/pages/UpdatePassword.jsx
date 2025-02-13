import { useState } from "react";
import Returnbar from "../components/Returnbar";
import Spinner from "../components/Spinner";
import './page.css';

import z from "zod";

const updateSchema = z.object({ //Schéma d'enregistrement
    oldPassword: z.string(),
    newPassword: z.string().min(3),
    confirmedPassword: z.string()
});

export default function UpdatePasswordPage(){
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); //Permet d'afficher un message d'erreur
    const [successMessage, setSuccessMessage] = useState(""); //Permet d'afficher le message de succès

    const [isLoading, setIsLoading] = useState(false); //Permet d'afficher le spinner si besoin

    const onChangePassword = (e) => {
        e.preventDefault();

        setIsLoading(true); //Active le spinner

        setErrorMessage("");
        setSuccessMessage("");

        const token = localStorage.getItem("token");

        const data = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }

        if(newPassword != confirmedPassword){
            setErrorMessage("Les mots de passe doivent être identique");
            setIsLoading(false);
            return;
        }

        const toParseData = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmedPassword: confirmedPassword
        }

        //Vérifie si les données sont valide à l'enregistrement
        const updateParsed = updateSchema.safeParse(toParseData);

        if(updateParsed.success == true){
            fetch("http://localhost:3000/change-password",{ //Requête à l'api avec les données
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            .then(async res => {
                setTimeout(async () => { //Simule un délai de la réponse de 3s
                    switch(res.status){ //Affichage d'un message en fonction de la réussite
                        case 200:
                            setSuccessMessage("Changement du mot de passe réussi !");
                            break;
                        case 401 || 400:
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
                console.log("Erreur:", err);
                setIsLoading(false);
            });
        }else{
            setErrorMessage("Les entrées sont incorrectes.");
            setIsLoading(false);
        }
    }

    return(
        <>
            <Returnbar/>
            <h1>Changer le mot de passe</h1>
            <form onSubmit={onChangePassword}>
                <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Ancien mot de passe"/>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Nouveau mot de passe"/>
                <input type="password" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} placeholder="Confirmation du mot de passe"/>
                <button type="submit">Changer le mot de passe</button>
                {errorMessage != "" && <p style={{ color: "red", marginTop: "10px"}}>{errorMessage}</p>}
                {successMessage != "" && <p style={{ color: "green", marginTop: "10px"}}>{successMessage}</p>}
            </form>
            {isLoading && <Spinner/>}
        </>
    );
}