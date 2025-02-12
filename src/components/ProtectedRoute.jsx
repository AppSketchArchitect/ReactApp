import { useNavigate } from "react-router";
import useUserContext from "../context/UserContext";
import { useEffect } from "react";

export default function ProtectedRoute(){
    const userContext = useUserContext();
    const navigate = useNavigate();

    if(!userContext.user.isAuthentified){ //Si l'utilisateur n'est pas connecté on le renvoie à la page /Home
        useEffect(() => {
            navigate("/Login");
        }, [])
    }
}