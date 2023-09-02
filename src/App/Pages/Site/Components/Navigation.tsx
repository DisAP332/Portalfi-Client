import { useNavigate } from "react-router-dom"
import apis from "../../../API"

export const Navigation = () => {

    const UserCookie = JSON.parse(document.cookie.split("; ").find((row) => row.startsWith("JBWUserData"))?.split("=")[1]).Data

    const navigate = useNavigate()
    const logout = () => {
        navigate('/')
    }
    
    return (
        <div className="Navigation">
            <div>
                <h1 className="bannerFont1">Jordan</h1><h1 className="bannerFont2">Bell</h1><h1 className="bannerFont1">  Web Service</h1>
            </div>
            <div>
                {UserCookie 
                ? <h1>{UserCookie}</h1>
                : <h1>ERROR GETTING USER</h1>}
            </div>
            <div />
            <div>
                <button onClick={() => logout()}>Logout</button>
            </div>
        </div>
    )
}