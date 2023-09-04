import { useState } from "react"
import { Cards } from "./Cards"
import { Button, Modal } from "react-bootstrap"
import { Add } from "./Add"

export const Display = (Props) => {

    const UserCookie = JSON.parse(document.cookie.split("; ").find((row) => row.startsWith("JBWUserData"))?.split("=")[1]).Data

    const [showModal, setShowModal] = useState(false)

    return (
        <>

        <Add showModal={showModal} setShowModal={setShowModal} user={UserCookie} setEvents={Props.setEvents}/>

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
                {Props.events ? Props.events.map(items => (
                    <div key={items._id} className="Card"><Cards setEvents={Props.setEvents} {...items} /></div>
                )) : <></>}
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