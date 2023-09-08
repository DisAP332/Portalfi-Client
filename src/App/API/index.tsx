import axios from 'axios'
import Cookies from '../Cookies'

const api = axios.create({
    baseURL: 'http://portalfi-jbw.com:8443'
})

// user helpers //

const login = (payload: object) => api.post(`/user/login`, payload)
.then(res => {
    console.log(res.data)
    if (res.data.status === 'success'){
        document.cookie = `JBWUserToken = ${res.data.token}`
        document.cookie = `JBWUserData = ${JSON.stringify({ Data: `${res.data.user}` })}`
        document.cookie = `JBWEventData = ${JSON.stringify({ Data: `${res.data.EventData}` })}`
        return true
    } else {
        console.log('auth failed')
        return false
    }
})

const profile = () => api.get('/profile')

// ------ EVENTS ---------- //


const getAllEvents = () => {
    return new Promise((resolve) => {
        api.get('/events/getEvents', { headers: {authorization: Cookies.Token, user: Cookies.User}})
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

const createEvent = (payload: object) => {
    return new Promise((resolve) => {
        api.post('/events/createEvent', payload, { headers: {authorization: Cookies.Token}})
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

const updateEvent = (payload: {_id: string}) => {
    console.log(payload._id)
    return new Promise((resolve) => {
        api.put(`/events/updateEvent/${payload._id}`, payload, { headers: {authorization: Cookies.Token, user: Cookies.User}})
        .then((res) => {
            if (res.data.auth === false){
                window.alert('Session expired. Please log back in')
                document.location.href='/'
            }
            resolve(res)
        })
    })
}

// const createEvent = (payload: object) => api.post('/events/createEvent', payload, { headers: {authorization: Cookies.Token}})

const deleteEvent = (payload: {_id: string}) => {
    return new Promise((resolve) => {
        api.delete(`/events/deleteEvent/${payload._id}`, { headers: {authorization: Cookies.Token, user: Cookies.User}})
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