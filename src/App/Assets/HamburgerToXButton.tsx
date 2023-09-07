import { useState } from "react";

export const HamToXBtn = (Props: {show: Boolean}) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleIconClick = () => {
      setIsOpen(!isOpen);
    };

    return (
        <>
            <div id="HTXB" className={Props.show ? 'open' : ''}
            onClick={() => handleIconClick()}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            </div>
        </>
    )
}