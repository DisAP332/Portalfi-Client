import { useState } from "react"
import { Display } from "./BodyComps/Display"
import { Add } from "./BodyComps/Add"
import { Button } from "react-bootstrap"

export const Body = () => {

    let Events

    const UserCookie = JSON.parse(document.cookie.split("; ").find((row) => row.startsWith("JBWUserData"))?.split("=")[1]).Data
    const EventsData = JSON.parse(document.cookie.split("; ").find((row) => row.startsWith("JBWEventData"))?.split("=")[1])

    try {
        Events = JSON.parse(EventsData.Data)
    } catch(err) { console.log(err)}

    const [eventData, setEventData] = useState(Events)
    const [mode, setMode] = useState('events')
    const [modeAction, setModeAction] = useState('add')

    const getEvents = async () => {
        const EventCookie = document.cookie.split("; ").find((row) => row.startsWith("JBWUserEvents"))?.split("=")[1]
    }

    return (
        <> 
            <div className="Body">
                <div className="appContainer bg-white">
                    <div className="appNav bg-primary">
                        <Button variant="dark">Events</Button>
                    </div>
                    {
                        
                    mode === 'events'
                    ?
                    <div>   
                        <Display events={eventData} setEvents={setEventData}/>
                        {/* <Add modeAction={modeAction} user={UserCookie} setEvents={setEventData} /> */}
                    </div>
                    : 
                    <></>
                    }
                </div>
            </div>
        </>
    )
}