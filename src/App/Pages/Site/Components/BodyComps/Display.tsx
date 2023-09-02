import { useState } from "react"
import { Cards } from "./Cards"

export const Display = (Props) => {

    return (
        <>
        {
        Props.events

        ? 
        <div className="cardContainer">
            {Props.events ? Props.events.map(items => (
                <div key={items._id} className="card"><Cards setEvents={Props.setEvents} {...items} /></div>
            )) : <></>}
        </div>

        : 
        <div>No events to show! try adding some </div>

        }

        </>
    )
}