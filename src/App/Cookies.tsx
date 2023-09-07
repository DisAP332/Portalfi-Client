const Token = document.cookie.split("; ").find((row) => row.startsWith("JBWUserToken"))?.split("=")[1];

let Events: {Data: string} 
const EventsData = document.cookie.split("; ").find((row) => row.startsWith("JBWEventData"))?.split("=")[1];
if (EventsData) {
    Events = JSON.parse(EventsData!);
} else {
    Events = {Data: 'MISSING'}
}

let user: {Data: string}
let User
const UserData = document.cookie.split("; ").find((row) => row.startsWith("JBWUserData"))?.split("=")[1];
if (UserData){
    user = JSON.parse(UserData!)
    User = user.Data   
} else {
    User = 'MISSING'
}

const Cookies = {
    User,
    Token,
    Events
}

export default Cookies
