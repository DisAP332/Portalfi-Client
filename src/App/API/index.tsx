import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000'
})

// user helpers //

const login = (payload: object) => api.post(`/user/login`, payload)
.then(res => {
    console.log(res.data)
    if (res.data.status === 'success'){
        document.cookie = `JBWUserToken = ${JSON.stringify({ Authorization: `Bearer ${res.data.token}`})}`
        document.cookie = `JBWUserData = ${JSON.stringify({ Data: `${res.data.user}` })}`
        document.cookie = `JBWEventData = ${JSON.stringify({ Data: `${res.data.EventData}` })}`
        return true
    } else {
        console.log('auth failed')
        return false
    }
})

// posts //

const createEvent = (payload: object) => api.post('/events/createEvent', payload)

// get requests //
const profile = () => api.get('/profile')

const getAllEvents = () => api.get('/events/getEvents').then(res => {
    document.cookie = `JBWEventData = ${JSON.stringify({ Data: `${res.data.Data}` })}`
    }
)

const deleteEvent = (payload: object) => api.delete(`/events/deleteEvent/${payload._id}`)

const updateEvent = (payload: object) => api.put(`/events/updateEvent/${payload._id}`, payload)

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