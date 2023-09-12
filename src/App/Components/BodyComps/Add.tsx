import { useState } from "react"
import apis from "../../API"
import { Button, Modal } from "react-bootstrap"
import Cookies from "../../Cookies"

export const Add = (Props: {showModal: boolean, setShowModal: Function, setEvents: Function}) => {

    const [eventData, setEventData] = useState({
        name: '', 
        date: '', 
        time: '', 
        description: '', 
        cost: '',
    })

    class Event {
        Date: string
        Name: string
        Time: string
        Description: string
        Cost: string
        constructor(Date: string ,Name: string, Time: string, Description: string, Cost: string ){
            this.Date = Date;
            this.Name = Name;
            this.Time = Time;
            this.Description = Description;
            this. Cost = Cost;
        }
    }

    const handleEventSubmit = async () => {
        const event = new Event(
            eventData.date, 
            eventData.name, 
            eventData.time, 
            eventData.description, 
            eventData.cost
        );
        console.log('create event init')
        await apis.createEvent({Data: event})
        .then((results: any) => {
            console.log(results?.data)
            if(!results.data.success){
                window.alert('event not created :(')
                console.log('failure creating event')
            } else {
                Props.setEvents(results.data.events)
                Props.setShowModal(false)
            }
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
                        onChange={(e) => setEventData({...eventData, date: e.target.value})}
                        />
                    Name:
                        <input
                        required
                        type="string"
                        onChange={(e) => setEventData({...eventData, name: e.target.value})}
                        />
                    Time Opens:
                        <input 
                        required
                        type="time"
                        onChange={(e) => setEventData({...eventData, time: e.target.value})}
                        />
                    Description:
                        <textarea 
                        required
                        onChange={(e) => setEventData({...eventData, description: e.target.value})}
                        />
                    Door Cost:
                        <input 
                        required
                        type="number"
                        onChange={(e) => setEventData({...eventData, cost: e.target.value})}
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