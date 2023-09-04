import { useState } from "react"
import apis from "../../../../API"
import { Button, Modal } from "react-bootstrap"

export const Add = (Props) => {

    const [eventName, setEventName] = useState('')
    const [eventTime, setEventTime] = useState(0)
    const [eventDescription, setEventDescription] = useState('')
    const [eventCost, setEventCost] = useState(0)
    const [eventDate, setEventDate] = useState('')

    class Event {
        constructor(Date: string ,Name: string, Time: number, Description: string, Cost: number ){
            this.Date = Date;
            this.Name = Name;
            this.Time = Time;
            this.Description = Description;
            this. Cost = Cost;
        }
    }


    const handleEventSubmit = () => {
        const event = new Event(eventDate, eventName, eventTime, eventDescription, eventCost);
        const Token = document.cookie.split("; ").find((row) => row.startsWith("JBWUserToken"))?.split("=")[1]

        new Promise((resolve, reject) => {
            apis.createEvent({Data: event, User: Props.user, Token: Token});
            setTimeout(() => {
                apis.getAllEvents()
                resolve()
            }, 1000)
        }).then(() => {
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    const EventsData = JSON.parse(document.cookie.split("; ").find((row) => row.startsWith("JBWEventData"))?.split("=")[1])
                    const Events = JSON.parse(EventsData.Data)
                    Props.setEvents(Events)
                    Props.setShowModal(false)
                    resolve()
                }, 500)
            })
        })
    }

    return (
        <>
            <Modal show={Props.showModal} onHide={() => Props.setShowModal(false)}>

            <Modal.Header closeButton>
                <Modal.Title>Add Event</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="Forms">
                    <form>
                    Date: 
                        <input 
                        type="date"
                        required
                        onChange={(e) => setEventDate(e.target.value)} 
                        />

                    Name:
                        <input
                        required
                        onChange={(e) => setEventName(e.target.value)}
                        />

                    Time Opens:
                        <input 
                        required
                        type="time"
                        onChange={(e) => setEventTime(e.target.value)}
                        />

                    Description:
                        <textarea 
                        required
                        onChange={(e) => setEventDescription(e.target.value)}
                        />

                    Door Cost:
                        <input 
                        required
                        type="number"
                        onChange={(e) => setEventCost(e.target.value)}
                        />

                    </form> 
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => Props.setShowModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleEventSubmit()}>
                    Save
                </Button>
            </Modal.Footer>

            </Modal>

        </>
    )
}