import { useNavigate } from "react-router";
import useUserContext from "../context/UserContext";
import { useEffect } from "react";

export default function ProtectedRoute(){
    const userContext = useUserContext();
    const navigate = useNavigate();

    if(!userContext.user.isAuthentified){
        useEffect(() => {
            navigate("/Login");
        }, [])
    }
}