import React , { useState, useEffect } from 'react';
import CoachCard from "./CoachCardExpand.js";



const CoachCardModal = ({post}) => {
// let { coach } = post;
    const [open, setOpen ] = useState(false);


    useEffect(() => {
		if (open) {
			document.getElementById('overlay').style.display = 'block';
		} else {
			document.getElementById('overlay').style.display = 'none';
		}
	}, [open]);



    return (
        <div>
            <button onClick={() => setOpen(!open)}> 
            <p className='coachcard-seemore'>See more </p>
            </button>
            {open && (
                  <CoachCard post={post}/>
            
            )}
        </div>

    )
};


export default CoachCardModal;