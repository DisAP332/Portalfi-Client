import { useEffect } from "react";
import { Login } from "../Login"
import { Body } from "./Components/Body"
import { Navigation } from "./Components/Navigation"
import { useNavigate } from "react-router-dom";
import apis from "../../API";
 
export const Profile = () => {

    const navigate = useNavigate()

    function checkUser(){
        const cookie = document.cookie.split("; ").find((row) => row.startsWith("JBWUserData"))?.split("=")[1]
        if(!cookie){
            navigate('/')
        }
    }

    useEffect(() => {
        checkUser()
    }, [])

    return (
        <>
            <div className="profile">
                <Navigation />
                <Body />
            </div>
        </>
    )
}