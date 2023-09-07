import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Navigation } from "./Components/Navigation";
import { Body } from "./Components/Body";



export const App = () => {

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
            <div className="profile bg-light d-none d-md-block">
                <Navigation />
                <Body />
            </div>
        </>
    )
}