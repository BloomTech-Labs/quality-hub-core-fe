import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

// Styles
// import './CoachForm.scss';

const ListingForm = props => {

    const [newListing] = useMutation(CREATE_REVIEWER_LISTING, {
        $price: 0,
		$position: '',
		$industry: '',
		$description: '',
		$company: '',
		$isPublished: false
    })

    //false sets the default to not show the Done modal
	const [open, setOpen] = useState(false);

	//Done is the second modal that pops up after you publish a coach form
	const [done, setDone] = useState(false);

    const [formState, setFormState] = useState({
        price: 0,
		position: '',
		industry: '',
		description: '',
		company: '',
		isPublished: false
    });

    const [requiredState, setRequiredState] = useState({
        
    })

    const closeWindow = e => {
        props.refetch();
        setFormState({
            
        });
        setRequiredState({
            
        })
    };

    const setAvailability = e => {
        //Get new data
        props.refetch();
    };

    return (
        <div>
            {/* This is the Button that is rendered on the landing page */}
            <button onClick={() => setOpen(!open)} className='become-a-coach-btn'>
                {/* {lightbulb2()} */}
                <span className='add-coach-form-button'>Become a coach</span>
            </button>

            {/* The create coach post form */}
            {open && (
                <>
                    <div className='add-coach-form-background'>
                        <div className='add-coach-form'>
                            
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ListingForm;
