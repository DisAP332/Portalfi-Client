import { Button, Modal } from "react-bootstrap"

import { useState } from "react"
import apis from "../../API"

export const Edit = (Props: {
    showModal: boolean, 
    setShowModal: Function, 
    setEvents: Function,
    _id: string, 
    event: {name: string, date: string, time: string, description: string, cost: string}
    setEvent: Function
}) => {

    const [eventData, setEventData] = useState({
        name: Props.event.name, 
        date: Props.event.date, 
        time: Props.event.time, 
        description: Props.event.description, 
        cost: Props.event.cost,
    })


    class Event {
        _id: string
        Date: string
        Name: string
        Time: string
        Description: string
        Cost: string
        constructor(_id: string, Date: string,Name: string, Time: string, Description: string, Cost: string){
            this._id = _id
            this.Date = Date;
            this.Name = Name;
            this.Time = Time;
            this.Description = Description;
            this.Cost = Cost;
        }
    }

    const handleSaveEdit = (ID: string) => {
        console.log(ID)
        const event = new Event(
            ID, 
            eventData.date, 
            eventData.name, 
            eventData.time, 
            eventData.description, 
            eventData.cost
        )
        apis.updateEvent(event)
        .then((res: any) => {
            Props.setEvent({
                date: eventData.date, 
                name: eventData.name, 
                time: eventData.time,
                description: eventData.description,
                cost: eventData.cost,
            })
            Props.setEvents(res.data.events)
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
                Date:
                <input 
                    value={eventData.date} 
                    type='date' 
                    onChange={(e) => setEventData({...eventData, date: e.target.value})}
                    />
                Name:
                <input 
                    value={eventData.name} 
                    type='string'
                    onChange={(e) => setEventData({...eventData, name: e.target.value})}
                />
                Time:
                <input 
                    value={eventData.time} 
                    type='time' 
                    onChange={(e) => setEventData({...eventData, time: e.target.value})}
                />
                Desc:
                <textarea 
                    value={eventData.description}
                    onChange={(e) => setEventData({...eventData, description: e.target.value})}
                />
                Cost:
                <input 
                    value={eventData.cost} 
                    type='number' 
                    onChange={(e) => setEventData({...eventData, cost: e.target.value})}
                />
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