import { useState } from "react"
import { Button } from "react-bootstrap"
import { Edit } from "./Edit"
import apis from "../../API"

export const Cards = (Props: {
    setEvents: Function,                         
    Name: string, 
    Date: string ,
    Time: string,
    Description: string,
    Cost: string,
    _id: string,
}) => {


    const [eventData, setEventData] = useState({
        name: Props.Name, 
        date: Props.Date, 
        time: Props.Time, 
        description: Props.Description, 
        cost: Props.Cost,
    })

    const handleDelete = async (ID: string) => {
        const id = {'_id': ID }
        await apis.deleteEvent(id)
        .then((res: any) => {
            Props.setEvents(res.data.events)
        })
    }

    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <Edit showModal={showModal} setShowModal={setShowModal} setEvents={Props.setEvents} _id={Props._id} event={eventData} setEvent={setEventData}/>

        <>
            <p>{eventData.date}</p>
            <p>{eventData.name}</p>
            <p>{eventData.time}</p>
            <div className="descriptionBox">
                <span>{eventData.description}</span>                
            </div>
            <p>{eventData.cost}</p>

            <div>
                <Button variant="danger" onClick={() => handleDelete(Props._id)}>Delete</Button>
                <Button variant="secondary" onClick={() => setShowModal(true)}>Edit</Button>

            </div> 
        </> 
        </>
    )
}