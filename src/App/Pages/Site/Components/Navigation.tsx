import { useNavigate } from "react-router-dom"
import apis from "../../../API"
import { HamToXBtn } from "../../../Assets/HamburgerToXButton"
import { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import logo from '../../../Assets/Imgs/FullLogo_Transparent.png'
import nameLogo from '../../../Assets/Imgs/Name_Logo.png'
import ProfileIcon from '../../../Assets/Logos/profile.svg'

export const Navigation = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const UserCookie = JSON.parse(document.cookie.split("; ").find((row) => row.startsWith("JBWUserData"))?.split("=")[1]).Data

    const navigate = useNavigate()
    const logout = () => {
        navigate('/')
    }
    
    return (
        <>
        <div className="Navigation bg-dark">
            {/* <div>
                <button onClick={() => handleShow()}>
                    <HamToXBtn show={show} />
                </button>
            </div> */}
            <div>
                <img className='logo' src={logo} alt="logo" />
                <img className="logo" src={nameLogo} alt='name logo'/>
                {/* <h1 className="bannerFont1">Jordan</h1><h1 className="bannerFont2">Bell</h1><h1 className="bannerFont1">  Web Service</h1> */}
            </div>
            <div>
                <Button onClick={() => logout()}>Logout</Button>
            </div>
            <div className="bg-primary">
                <h1 className="text-light">{UserCookie}</h1>
                <img src={ProfileIcon} alt="profile icon" className="logo2" />
            </div>
        </div>
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body>
        </Offcanvas>
        </>
    )
}