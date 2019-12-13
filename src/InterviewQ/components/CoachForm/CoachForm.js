import React, { useState, useEffect, useRef } from 'react';

// import './CoachForm.scss';

import { useQuery, useMutation } from '@apollo/react-hooks';

// Styles && Icons
import './CoachForm.scss';
import Icon from '../../../global/icons/Icon';
import { ICONS } from '../../../global/icons/iconConstants';
import { lightbulb } from '../../../global/icons/lightbulb';
import { lightbulb2 } from '../../../global/icons/lightbulb2';
import { blankavatar2 } from '../../../global/icons/blankavatar';

// Query
import { GET_POSTS } from '../LandingPage/CoachList/CoachList';
import { GET_USER, INDUSTRIES, ADD_POST } from './subs/CoachFormQueries';

//Modal that pops up when done filling out coach form
import DoneModal from './subs/DoneModal';

import StepOne from './subs/StepOne';
import CloseButton from './subs/CloseButton';
import StepTwo from './subs/StepTwo';
import StepThree from './subs/StepThree';
import BottomButtons from './subs/BottomButtons';
import TopText from './subs/TopText';
import {handleChange} from './subs/Functions';

const CoachForm = props => {
	const { data } = useQuery(GET_USER);
	const { data: industriesData } = useQuery(INDUSTRIES);

	//false sets the default to not show the Done modal
	const [open, setOpen] = useState(false);

	//Done is the second modal that pops up after you publish a coach form
	const [done, setDone] = useState(false);
	const [addPost] = useMutation(ADD_POST, {
		refetchQueries: ["GET_POSTS"], awaitRefetchQueries: true
	});

	//This sets the darkened overlay behind the modals
	useEffect(() => {
		if (open) {
			document.getElementById('overlay-coach-form').style.display = 'block';
		} else if (done) {
			document.getElementById('overlay-coach-form').style.display = 'block';
		} else {
			document.getElementById('overlay-coach-form').style.display = 'none';
		}
	}, [open, done]);

	let image;
	if (data) {
		if (data.me.image_url) {
			image = data.me.image_url;
		}
	}

	const [formState, setFormState] = useState({
		company: '',
		position: '',
		//We leave a default industry so users are FORCED to pick something
		industryName: 'Architecture and Construction',
		description: '',
		price: 30,
		tagString: '',
		isPublished: true,
	});

	// const handleChange = e => {
	// 	if (e.target.name === 'price') {
	// 		//If you try to delete the last number, the price will change to $0
	// 		if (e.target.value.length < 2) {
	// 			setFormState({
	// 				...formState,
	// 				[e.target.name]: 0,
	// 			});
	// 			return;
	// 		}

	// 		//The input form MUST include a dollar sign and have a number after it.
	// 		if (/^\$[0-9]*$/gm.test(e.target.value)) {
	// 			let newPrice = e.target.value.split('$');

	// 			//set a maximum price for the text input form
	// 			//If price is greater than 200, don't accept those changes
	// 			//If this number is changed, you can optionally allow a different price limit in the text-input than the range-slider
	// 			if (newPrice[1] > 200) {
	// 				return;
	// 			}

	// 			//If price is less than or equal to 200, make changes to state
	// 			setFormState({
	// 				...formState,
	// 				[e.target.name]: parseInt(newPrice[1]),
	// 			});
	// 			return;
	// 		} else {
	// 			return;
	// 		}
	// 	}

	// 	//price text input and slider input are both connected to the same state variable
	// 	if (e.target.name === 'price-slider') {
	// 		setFormState({
	// 			...formState,
	// 			price: parseInt(e.target.value),
	// 		});
	// 		return;
	// 	}

	// 	// If the input is not about hourly rates, just set the value to state
	// 	setFormState({
	// 		...formState,
	// 		[e.target.name]: e.target.value,
	// 	});
	// };

	const handleSubmit = e => {
		e.preventDefault();
		addPost({ variables: formState })
			.then(res => {
				//Open 2nd modal
				setDone(true);
				//Close first modal
				setOpen(false);
			})
			.catch(err => {
				console.log(err);
			});
	};

	//This is for when you hit "save and exit"
	const handleSave = e => {
		e.preventDefault();
		let newFormState = { ...formState, isPublished: false };
		addPost({ variables: newFormState })
			.then(res => {
				//Don't reroute. Just close the modal, and check for new data
				closeWindow();
			})
			.catch(err => {
				console.log(err);
			});
	};

	const closeWindow = e => {
		props.refetch();
		setFormState({
			company: '',
			position: '',
			industryName: 'Architecture and Construction',
			description: '',
			price: 30,
			tagString: '',
			isPublished: true,
		});
		setOpen(false);
		setDone(false);
	};

	const setAvailability = e => {
		//Get new data
		props.refetch();
		//turn off overlay
		document.getElementById('overlay-coach-form').style.display = 'none';
		//close 2nd modal
		setDone(false);
	};

	return (
		<div>
			{/* Overlay is the darkened area behind the popup modal */}
			<div id="overlay-coach-form" onClick={() => closeWindow()}></div>

			{/* This is the Button that is rendered on the landing page */}
			<button onClick={() => setOpen(!open)} className="become-a-coach-btn">
				{lightbulb2()}
				<span className="add-coach-form-button">Become a coach</span>
			</button>

			{/* This is the 2nd modal that pops up after you publish a post */}
			{done && (
				<DoneModal
					closeWindow={closeWindow}
					setAvailability={setAvailability}
				/>
			)}

			{/* The create coach post form */}
			{open && (
				<>
					<div className="add-coach-form-background">
						<div className="add-coach-form">
							<CloseButton closeWindow={closeWindow} />
							<TopText lightbulb={lightbulb} />

							<StepOne
								setFormState={setFormState}
								formState={formState}
								handleChange={handleChange}
								industriesData={industriesData}
							/>
							<StepTwo formState={formState} 
							setFormState={setFormState}
							handleChange={handleChange} />
							<StepThree data={data} image={image} formState={formState} />
							<BottomButtons
								handleSave={handleSave}
								handleSubmit={handleSubmit}
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default CoachForm;
