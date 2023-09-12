let Token = document.cookie.split("; ").find((row) => row.startsWith("JBWUserToken"))?.split("=")[1];

const getTokenCookie = () => {
    return new Promise((resolve, reject) => {
        try {
            Token = document.cookie.split("; ").find((row) => row.startsWith("JBWUserToken"))?.split("=")[1];
            resolve(Token)
        } catch (error) {
            console.log(error)
            reject({message: error})
        }
    } )
}

let Events: {Data: string}

let EventsData = document.cookie.split("; ").find((row) => row.startsWith("JBWEventData"))?.split("=")[1];
if(EventsData){
    EventsData = JSON.parse(EventsData!);
    Events = JSON.parse(EventsData!.Data)
    console.log(Events)
} else {
    Events = {Data: 'missing'}
}

function parsedEvent(){
    EventsData = document.cookie.split("; ").find((row) => row.startsWith("JBWEventData"))?.split("=")[1];
    EventsData = JSON.parse(EventsData!);
    Events = JSON.parse(EventsData!.Data);
    return
}

const getEventsCookie = () => {
    return new Promise((resolve, reject) => {
        try {
            parsedEvent()
            resolve(Events)
        } catch (error) {
            console.log(error)
            reject({message: error})
        }
    })
}

let User: any
let UserData = document.cookie.split("; ").find((row) => row.startsWith("JBWUserData"))?.split("=")[1];

function parsedUser() {
    UserData = document.cookie.split("; ").find((row) => row.startsWith("JBWUserData"))?.split("=")[1];
    User = JSON.parse(UserData!)
    User = User.Data
}

const getUserCookie = () => {
    return new Promise((resolve, reject) => {
        try {
            parsedUser()
            resolve(User)
        } catch (error){
            console.log(error)
            reject({message: error})
        }
    })
}

if (UserData){
    User = JSON.parse(UserData!)
    User = User.Data  
} else {
    User = 'MISSING'
}

const Cookies = {
    User,
    Token,
    Events,
    getEventsCookie,
    getUserCookie,
    getTokenCookie
}

export default Cookies
