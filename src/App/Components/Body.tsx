import { useEffect, useState } from "react"
import { Display } from "./BodyComps/Display"
import { Button } from "react-bootstrap"
import Cookies from "../Cookies"

export const Body = () => {

    const [eventData, setEventData] = useState(Cookies.Events)
    const [mode] = useState('events')

    useEffect(() => {
        try {
            Cookies.getEventsCookie()
            .then((events: any) => {
                return setEventData(events)
            })
        } catch(err) { console.log(err)}
    }, [])

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