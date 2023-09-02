import { useState } from "react"
import apis from "../../../../API"

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

    const formatEventDate = (date) => {
        console.log(date);
    }


    const handleEventSubmit = () => {
        const event = new Event(eventDate, eventName, eventTime, eventDescription, eventCost);
        const Token = document.cookie.split("; ").find((row) => row.startsWith("JBWUserToken"))?.split("=")[1]
        console.log(Props.user);
        apis.createEvent({Data: event, User: Props.user, Token: Token});
        apis.getAllEvents();
        new Promise((resolve, reject) => {
            setTimeout(() => {
                const EventsData = JSON.parse(document.cookie.split("; ").find((row) => row.startsWith("JBWEventData"))?.split("=")[1])
                const Events = JSON.parse(EventsData.Data)
                console.log(Events)
                Props.setEvents(Events)
                resolve
            }, 1200)
        })
    }

    return (
        <>
                {Props.modeAction === 'add'
                    ? 
                    <div className="Forms">
                        <h1>Add Event</h1>
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
                        <button onClick={() => handleEventSubmit()}>SUBMIT</button>
                    </div>
                    : <></>
                    }
        </>
    )
}