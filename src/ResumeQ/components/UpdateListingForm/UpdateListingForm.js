import React, { useState, useEffect } from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';

// Styles && Icons
import './ListingForm.scss';
import { lightbulbRQ } from '../../../global/icons/lightbulbRQ';

// Query
import { UPDATE_REVIEWER_LISTING } from './Resolvers';
// import { GET_REVIEWER_LISTINGS } from '../Marketplace/ReviewerList/Resolvers'
import { GET_USER_LISTING } from './Resolvers'

//Modal that pops up when done filling out listing form
import DoneModal from './subs/DoneModal';

import StepOne from './subs/StepOne';
import CloseButton from './subs/CloseButton';
import StepTwo from './subs/StepTwo';
import StepThree from './subs/StepThree';
import BottomButtons from './subs/BottomButtons';
import TopText from './subs/TopText';
import { handleChange, handleSubmit, handleSave } from './subs/Functions';

const UpdateListingForm = ({ user }) => {
	const { data } = useQuery(GET_USER_LISTING);
	// const { data: industriesData } = useQuery(INDUSTRIES);
	// TODO -- refactor component to user user data from props instead of using a query
	// TODO - add query that retrieves logged-in users Listing

	console.log(`UpdateListingForm / useQuery hook  // data`, data)
	console.log(`UpdateListingForm // user`, user)
	//false sets the default to not show the Done modal
	const [open, setOpen] = useState(false);

	//Done is the second modal that pops up after you publish a listing form
	const [done, setDone] = useState(false);

	// const [hasListing, setHasListing] = useState();

	const [updateListing] = useMutation(UPDATE_REVIEWER_LISTING, {
		// after a post is added, refetch the data with the current filter parameters
		refetchQueries: ['GET_REVIEWER_LISTINGS'],
		awaitRefetchQueries: true,
	});

	//This sets the darkened overlay behind the modals
	useEffect(() => {
		if (open) {
			document.getElementById('RQoverlay-listing-form').style.display = 'block';
		} else if (done) {
			document.getElementById('RQoverlay-listing-form').style.display = 'block';
		} else {
			document.getElementById('RQoverlay-listing-form').style.display = 'none';
		}
	}, [open, done]);

	// This is the avatar image in the preview post section
	let image;
	if (user) {
		if (user.image_url) {
			image = user.image_url;
		}
	}

	const [formState, setFormState] = useState({
		id: '',
		company: '',
		position: '',
		description: '',
		price: 30,
		isPublished: true,
	});

	useEffect(() => {
		data && setFormState(data.listingByReviewer)
	}, [data])

	const [requiredState, setRequiredState] = useState({
		company: false,
		position: false,
		description: false,
		any: false
	})

	const closeWindow = e => {
		// props.refetch();
		setFormState({
			company: '',
			position: '',
			// industryName: 'Architecture and Construction',
			description: '',
			price: 30,
			// tagString: '',
			isPublished: true,
		});
		setOpen(false);
		setDone(false);
		setRequiredState({
			company: false,
			position: false,
			description: false,
			any: false
		})
	};

	return (
		<div>
			{/* Overlay is the darkened area behind the popup modal */}
			<div id='RQoverlay-listing-form' onClick={e => closeWindow(e)}></div>

			{/* This is the Button that is rendered on the landing page */}
			<button onClick={() => setOpen(!open)} className='RQbecome-a-listing-btn'>
				{/* {lightbulb2()} */}
				<span className='RQadd-listing-form-button'>Update Info</span>
			</button>

			{/* This is the 2nd modal that pops up after you publish a post */}
			{done && (
				<DoneModal
					closeWindow={closeWindow}
				// setAvailability={setAvailability}
				/>
			)}

			{/* The create listing post form */}
			{open && (
				<>
					<div className='RQadd-listing-form-background'>
						<div className='RQadd-listing-form'>
							<CloseButton closeWindow={closeWindow} />
							<TopText lightbulbRQ={lightbulbRQ} />
							<StepOne
								setFormState={setFormState}
								formState={formState}
								handleChange={handleChange}
								// industriesData={industriesData}
								requiredState={requiredState}
								setRequiredState={setRequiredState}
							/>
							<StepTwo
								formState={formState}
								setFormState={setFormState}
								handleChange={handleChange}
							/>
							<StepThree user={user} image={image} formState={formState} />
							<BottomButtons
								handleSave={handleSave}
								handleSubmit={handleSubmit}
								formState={formState}
								setDone={setDone}
								setOpen={setOpen}
								updateListing={updateListing}
								closeWindow={closeWindow}
								requiredState={requiredState}
								setRequiredState={setRequiredState}
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default UpdateListingForm;
