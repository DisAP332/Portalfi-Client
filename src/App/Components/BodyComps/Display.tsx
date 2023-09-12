import { useState } from "react"

import { Cards } from "./Cards"
import { Button } from "react-bootstrap"
import { Add } from "./Add"


export const Display = (Props: {events: any, setEvents: Function}) => {

    const [showModal, setShowModal] = useState(false)

    return (
        <>

        <Add showModal={showModal} setShowModal={setShowModal} setEvents={Props.setEvents}/>

        {
        Props.events

        ? 
        <div className="contDisp">
            <div className="cardHead bg-primary">
                <p>Date</p>
                <p>Name</p>
                <p>Time Starts</p>
                <p>Description</p>
                <p>Cost</p>
            </div>
            <div className="cardContainer">
                {
                Props?.events 
                    ? 
                    Props?.events?.map((items: {
                        _id: string, 
                        Name: string, 
                        Date: string ,
                        Time: string,
                        Description: string,
                        Cost: string,
                    }) => (
                        <div key={items._id} className="Card"><Cards setEvents={Props.setEvents} {...items} /></div>
                    )) 
                    : 
                    <></>
                }
            </div>
            <div>
                <Button className="addBtn" variant="success" onClick={() => setShowModal(true)}>+</Button> 
            </div>
        </div>

        : 
        <div>No events to show! try adding some </div>

        }

        </>
    )
}