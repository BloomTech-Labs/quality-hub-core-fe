import react, { useState, useEffect } from 'react';



const CoachCardModal = () => {
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
            <p className='coachcard-seemore' onClick={() => setOpen(!open)}>See more </p>
            {open && (
                
            )}
        </div>

    )
}


export default CoachCardModal;