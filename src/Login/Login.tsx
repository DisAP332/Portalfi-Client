import { useState } from "react"
import apis from "../App/API"
import { Button } from "react-bootstrap"


export const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    class UserData {
        username: string
        password: string
        constructor(username: string, password: string){
            this.username = username,
            this.password = password
        }
    }

    const handleSubmit = () => {

        const userData = new UserData(username, password)

        apis.login(userData).then((res) => {
            if(res === true){
                console.log('logged in successfully')
                location.replace(`${window.location.href}profile`)
            } else {
                alert('login unsuccessful')
            }
        })
        
    }

    return (
    <>
        <div className='loginScreen'>
            <div>
                <Button onClick={() => apis.getAllEvents()}>TEST</Button>
                <h1 className="bannerFont1">Jordan</h1><h1 className="bannerFont2">Bell</h1><h1 className="bannerFont1">Web Service</h1>
            </div>
            <h1>LOGIN</h1>
            <form>
            username
                <input onChange={(e) => {setUsername(e.target.value)}}/>
            password
                <input type='password' onChange={(e) => {setPassword(e.target.value)}}/>     
            {/* <button onClick={handleSubmit} >Submit</button>      */}
            </form>

            <button onClick={handleSubmit} >Submit</button>     

        </div>
    </>
    )
}