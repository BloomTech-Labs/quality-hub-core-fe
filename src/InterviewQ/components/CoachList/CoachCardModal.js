import React , { useState, useEffect } from 'react';
import CoachCard from "./CoachCardExpand.js";


//Styles
import './CoachCardModal.scss';
// import Icon from '../../../globalIcons/Icon';
// import { ICONS } from '../../../globalIcons/iconConstants';

const CoachCardModal = ({post}) => {
	const [open, setOpen] = useState(false);
    

    useEffect(() => {
		if (open) {
			document.getElementById('overlay-coachcard-expand').style.display = 'block';
		} else {
			document.getElementById('overlay-coachcard-expand').style.display = 'none';
		}
	}, [open]);


    return (
        <div>
            <div id="overlay-coachcard-expand"></div>
            <button onClick={() => setOpen(!open)}> 
            <p className='coachcard-seemore'>See more </p>
            </button>
            {open && (
                  <CoachCard setOpen={setOpen} post={post}/>
            )}
        </div>
    )
};


export default CoachCardModal;