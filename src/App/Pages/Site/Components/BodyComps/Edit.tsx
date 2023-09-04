import { Button, Modal } from "react-bootstrap"
import apis from "../../../../API"
import { useState } from "react"

export const Edit = (Props) => {

    const [date, setDate] = useState(Props.data.Date)
    const [name, setName] = useState(Props.data.Name)
    const [time, setTime] = useState(Props.data.Time)
    const [description, setDescription] = useState(Props.data.Description)
    const [cost, setCost] = useState(Props.data.Cost)

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

    const UserCookie = JSON.parse(document.cookie.split("; ").find((row) => row.startsWith("JBWUserData"))?.split("=")[1]).Data

    function handleSaveEdit(ID){
        const event = new Event(ID, date, name, time, description, cost)
        const Data = {user: UserCookie, event: event}

        new Promise((resolve, reject) => {
            apis.updateEvent(Data)
            setTimeout(() => {
                console.log('wtf')
                apis.getAllEvents()
                resolve()
            }, 1500)
        }).then(() => {

            Props.setEvent.date(date)
            Props.setEvent.name(name)
            Props.setEvent.time(time)
            Props.setEvent.description(description)
            Props.setEvent.cost(cost)
        }).then(() => {
            const EventsData = JSON.parse(document.cookie.split("; ").find((row) => row.startsWith("JBWEventData"))?.split("=")[1])
            const Events = JSON.parse(EventsData.Data)
            Props.setEvents(Events)
            Props.setShowModal(false)
        })

    }

    return (
    <>
        <Modal show={Props.showModal} onHide={() => Props.setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Event</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column">
                Date:<input value={date} type='date' onChange={(e) => setDate(e.target.value)}/>
                Name:<input value={name} onChange={(e) => setName(e.target.value)}/>
                Time:<input value={time} type='time' onChange={(e) => setTime(e.target.value)}/>
                Desc:<input value={description} onChange={(e) => setDescription(e.target.value)}/>
                Cost:<input value={cost} type='number' onChange={(e) => setCost(e.target.value)}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => Props.setShowModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSaveEdit(Props._id)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    )
}