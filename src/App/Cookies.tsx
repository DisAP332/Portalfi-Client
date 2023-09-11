const Token = document.cookie.split("; ").find((row) => row.startsWith("JBWUserToken"))?.split("=")[1];

let Events: {Data: string}

Events = {Data: 'getting events...'}

const getEventsCookie = () => {
    const EventsData = document.cookie.split("; ").find((row) => row.startsWith("JBWEventData"))?.split("=")[1];
    if (EventsData) {
        Events = JSON.parse(EventsData!);
        return Events
    } else {
        new Promise((resolve) => {
            setTimeout(() => {
                console.log('retrying to get events')
                getEventsCookie();
            }, 1000)
        })
    }
}

getEventsCookie()

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
    Events,
}

export default Cookies
