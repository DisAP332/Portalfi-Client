import { useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";

import logo from '../Assets/Imgs/FullLogo_Transparent.png';
import nameLogo from '../Assets/Imgs/Name_Logo.png';
import ProfileIcon from '../Assets/Logos/profile.svg';
import Cookies from "../Cookies";

export const Navigation = () => {

    const navigate = useNavigate()
    const logout = () => {
        navigate('/')
    }
    
    return (
        <>
        <div className="Navigation bg-dark">
            <div>
                <img className='logo' src={logo} alt="logo" />
                <img className="logo" src={nameLogo} alt='name logo'/>
            </div>
            <div>
                <Button onClick={() => logout()}>Logout</Button>
            </div>
            <div className="bg-primary">
                <h1 className="text-light">{Cookies.User}</h1>
                <img src={ProfileIcon} alt="profile icon" className="logo2" />
            </div>
        </div>
        </>
    )
}