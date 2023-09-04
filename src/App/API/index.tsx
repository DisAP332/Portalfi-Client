import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000'
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

// posts //

const Token = document.cookie.split("; ").find((row) => row.startsWith("JBWUserToken"))?.split("=")[1]


const createEvent = (payload: object) => api.post('/events/createEvent', payload, { headers: {authorization: Token}})

// get requests //
const profile = () => api.get('/profile')

const getAllEvents = () => api.get('/events/getEvents', { headers: {authorization: Token}}).then(res => {
    document.cookie = `JBWEventData = ${JSON.stringify({ Data: `${res.data.Data}` })}`
    }
)

const deleteEvent = (payload: object) => api.delete(`/events/deleteEvent/${payload._id}`, { headers: {authorization: Token}})

const updateEvent = (payload: object) => api.put(`/events/updateEvent/${payload._id}`, payload, { headers: {authorization: Token}})

const data = new URLSearchParams({
    token: 'a token'
}).toString();

const tokenTest = (payload: object) => api.post(`/profile/testing`, payload, { headers: {authorization: Token}})

const apis = {
    tokenTest,
    profile,
    login,
    deleteEvent,
    getAllEvents,
    createEvent,
    updateEvent
}

export default apis

// export const findUser = (payload: object) => api.get(`/user/login`, payload)