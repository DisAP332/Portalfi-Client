import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Navigation } from "./Pages/Site/Components/Navigation";
import { Body } from "./Pages/Site/Components/Body";
import { Container } from "react-bootstrap";
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
            <div className="profile bg-light">
                <Navigation />
                <Body />
            </div>
        </>
    )
}