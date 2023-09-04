import { useState } from "react"
import apis from "../../../../API"
import { Button, Modal } from "react-bootstrap"
import { Edit } from "./Edit"

export const Cards = (Props) => {

    const [mode, setMode] = useState('display')
    const [deleted, setDeleted] = useState(false)

    // update Event
    const [date, setDate] = useState(Props.Date)
    const [name, setName] = useState(Props.Name)
    const [time, setTime] = useState(Props.Time)
    const [description, setDescription] = useState(Props.Description)
    const [cost, setCost] = useState(Props.Cost)

    const data = {
        Name: Props.Name,
        Date: Props.Date,
        Time: Props.Time,
        Description: Props.Description,
        Cost: Props.Cost
    }

    const setEvent = {
        date: setDate,
        name: setName,
        time: setTime,
        description: setDescription,
        cost: setCost
    }

    function handleDelete(ID){
        const id = { '_id': ID }
        apis.getAllEvents()
        const EventsData = JSON.parse(document.cookie.split("; ").find((row) => row.startsWith("JBWEventData"))?.split("=")[1])
        const Events = JSON.parse(EventsData.Data)
        Props.setEvents(Events)
        apis.deleteEvent(id)
        setDeleted(true)
    }

    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <Edit showModal={showModal} setShowModal={setShowModal} setEvents={Props.setEvents} _id={Props._id} data={data} setEvent={setEvent}/>

        { !deleted 
        ? 
        <>
            <p>{date}</p>
            <p>{name}</p>
            <p>{time}</p>
            <p>{description}</p>
            <p>{cost}</p>

            <div>
                <Button variant="danger" onClick={() => handleDelete(Props._id)}>Delete</Button>
                <Button variant="secondary" onClick={() => setShowModal(true)}>Edit</Button>

            </div> 
        </> 
        : 
        <></>}
        </>
    )
}