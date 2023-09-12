import axios from 'axios'
import Cookies from '../Cookies'

const api = axios.create({
    baseURL: 'https://server.portalfi-jbw.com/'
})

// user helpers //

const login = (payload: object) => api.post(`/user/login`, payload)
.then(res => {
    return new Promise((resolve) => {
        if (res.data.status === 'success'){
            document.cookie = `JBWUserToken = ${res.data.token}`
            document.cookie = `JBWUserData = ${JSON.stringify({ Data: `${res.data.user}` })}`
            document.cookie = `JBWEventData = ${JSON.stringify({ Data: `${res.data.EventData}` })}`
            resolve(true)
        } else {
            console.log('auth failed')
            resolve(false)
        } 
    })
})

const profile = () => api.get('/profile')

// ------ EVENTS ---------- //

let Token: string
let User: string

function resetVerficationCookies(){
    try {
        Cookies.getTokenCookie()
        .then((token: any) => {
            console.log(token)
            Token = token
        })
        Cookies.getUserCookie()
        .then((user: any) => { 
            User = user
            return
        })
    } catch (error) {
        return(error)
    }
}


const getAllEvents = async () => {
    await resetVerficationCookies()
    return new Promise((resolve) => {
        api.get('/events/getEvents', { headers: {authorization: Token, user: User}})
        .then(res => {
            if (res.data.auth === false){
                window.alert('Session expired. Please log back in')
                document.location.href='/'
            }
            if(!res.data.success){
                console.log('Error in event retrieval: apis.getAllEvents')
                resolve({success: false})
            } else {
                document.cookie = `JBWEventData = ${JSON.stringify({ Data: `${res.data.Data}` })}`
                console.log('successfully retrieved events: apis.getAllEvents')
                resolve({success: true})
            }
        })
    })
}

const createEvent = async (payload: object) => {
    await resetVerficationCookies()
    return new Promise((resolve) => {
        api.post('/events/createEvent', payload, { headers: {authorization: Token, user: User}})
        .then((res) => {
            console.log(res.data.auth)
            if (res.data.auth === false){
                window.alert('Session expired. Please log back in')
                document.location.href='/'
            }
            const data:{success: boolean, events: object, message: string} = res.data
            resolve({data})
        })
    })
}

const updateEvent = async (payload: {_id: string}) => {
    await resetVerficationCookies()
    return new Promise((resolve) => {
        api.put(`/events/updateEvent/${payload._id}`, payload, { headers: {authorization: Token, user: User}})
        .then((res) => {
            if (res.data.auth === false){
                window.alert('Session expired. Please log back in')
                document.location.href='/'
            }
            resolve(res)
        })
    })
}


const deleteEvent = async (payload: {_id: string}) => {
    await resetVerficationCookies()
    return new Promise((resolve) => {
        api.delete(`/events/deleteEvent/${payload._id}`, { headers: {authorization: Token, user: User}})
        .then((res) => {
            if (res.data.auth === false){
                window.alert('Session expired. Please log back in')
                document.location.href='/'
            }
            resolve(res)
        })
    })
}


const apis = {
    profile,
    login,
    deleteEvent,
    getAllEvents,
    createEvent,
    updateEvent
}

export default apis

// export const findUser = (payload: object) => api.get(`/user/login`, payload)