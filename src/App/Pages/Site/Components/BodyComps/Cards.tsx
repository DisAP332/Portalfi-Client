import { useState } from "react"
import apis from "../../../../API"

export const Cards = (Props) => {

    const [mode, setMode] = useState('display')
    const [deleted, setDeleted] = useState(false)

    // update Event
    const [date, setDate] = useState(Props.Date)
    const [name, setName] = useState(Props.Name)
    const [time, setTime] = useState(Props.Time)
    const [description, setDescription] = useState(Props.Description)
    const [cost, setCost] = useState(Props.Cost)

    class Event {
        constructor(_id, Date ,Name, Time, Description, Cost){
            this._id = _id
            this.Date = Date;
            this.Name = Name;
            this.Time = Time;
            this.Description = Description;
            this.Cost = Cost;
        }
    }

    function handleSave(ID){
        const event = new Event(ID, date, name, time, description, cost)
        apis.updateEvent(event)
        setMode('display')

        const EventsData = JSON.parse(document.cookie.split("; ").find((row) => row.startsWith("JBWEventData"))?.split("=")[1])
        const Events = JSON.parse(EventsData.Data)
        
        Props.setEvents(Events)

        apis.getAllEvents()
        // location.reload()
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

    return (
        <>
        { !deleted ? <>
        {
        mode === 'display'
        ?
        <>
            <p>{date}</p>
            <p>{name}</p>
            <p>{time}</p>
            <p>{description}</p>
            <p>{cost}</p>
        </>
        :
        <></>
        }
        {
        mode === 'edit'
        ?
        <>
            <div>Date:<input value={date} onChange={(e) => setDate(e.target.value)}/></div>
            <div>Name:<input value={name} onChange={(e) => setName(e.target.value)}/></div>
            <div>Time:<input value={time} onChange={(e) => setTime(e.target.value)}/></div>
            <div>Desc:<input value={description} onChange={(e) => setDescription(e.target.value)}/></div>
            <div>Cost:<input value={cost} onChange={(e) => setCost(e.target.value)}/></div>
        </>
        :
        <></>
        }
        <div>
            <button className="deleteBtn" onClick={() => handleDelete(Props._id)}>Delete</button>
            {
            mode === 'display'
            ?
            <button onClick={() => setMode('edit')}>Edit</button>
            :
            <>
            <button onClick={() => handleSave(Props._id)}>Save</button>
            <button onClick={() => setMode('display')}>X</button>
            </>
            }
        </div> </> : <></>}
        </>
    )
}