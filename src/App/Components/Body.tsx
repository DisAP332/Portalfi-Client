import { useState } from "react"
import { Display } from "./BodyComps/Display"
import { Button } from "react-bootstrap"
import Cookies from "../Cookies"

export const Body = () => {

    let Events

    try {
        Events = JSON.parse(Cookies.Events.Data)
        console.log(Events)
    } catch(err) { console.log(err)}

    const [eventData, setEventData] = useState(Events)
    const [mode] = useState('events')


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
                            </div>
                            : 
                            <></>
                    }
                    
                </div>
        
            </div>
        </>
    )
}