import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './CoachForm.scss';

import ProgressBar from './ProgressBar';
import CoachForm01 from './CoachForm01';
import CoachForm02 from './CoachForm02';
import CoachForm03 from './CoachForm03';
import CoachForm04 from './CoachForm04';
import CoachForm05 from './CoachForm05';

import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import Icon from '../../../globalIcons/Icon';
import { ICONS } from '../../../globalIcons/iconConstants';

const GET_USER = gql`
	query {
		me {
			linkedin_url
			github_url
			personal_url
			portfolio_url
			twitter_url
			city
			state
		}
	}
`;

const INDUSTRIES = gql`
	query {
		industries {
			name
		}
	}
`;

const CoachForm = props => {
	const node = useRef();
	const [open, setOpen] = useState(false);

	// for sure take this out soon // like as soon as auth0 happens
	useEffect(() => {
		// localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNrMnMxZmIydTAwNnYwNzczdjI4MmIza20iLCJlbWFpbCI6ImRhbkBxdWFpbC5jb20iLCJpYXQiOjE1NzQzNjM5NzUsImV4cCI6MTU3NDQwNzE3NX0.Ay63IqaVSQZmLgEjOEMOvb_NBQ0vLNepzn_NbaDsaMQ')
    });
    
    // const parentElement = document.getElementById('interview-container');
    // const navbar = document.getElementById('main-navbar');
    
// console.log(parentElement);
	const handleOutsideClick = e => {
		if (node.current.contains(e.target)) {
            // node.current.style.pointerEvents = "auto";
			return;
        }
        // navbar.style.filter = "blur(5px)";
        // parentElement.style.filter = "blur(5px)";
        // document.getElementById("overlay").style.display = "block";
        // parentElement.style.pointerEvents="none";
        // navbar.style.pointerEvents="none";
        // node.current.style.zIndex = "-99999";
        // node.current.style.filter = "none";
        
        
		// setOpen(false);
    };
    
	useEffect(() => {
		if (open) {
            document.addEventListener('mousedown', handleOutsideClick);
            document.getElementById("overlay").style.display = "block";
        document.getElementById('interview-container').style.pointerEvents="none";
        document.getElementById('main-navbar').style.pointerEvents="none";
		} else {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.getElementById("overlay").style.display = "none";
        document.getElementById('interview-container').style.pointerEvents="auto";
        document.getElementById('main-navbar').style.pointerEvents="auto";
		}
	}, [open]);

	const { data, error } = useQuery(GET_USER);
	const { data: industriesData } = useQuery(INDUSTRIES);

	console.log(data);

	const [formState, setFormState] = useState({
		company: '',
		position: '',
		industry: '',
		description: '',
		city: '',
		state: '',
		price: '',
	});

	const [accounts, setAccounts] = useState({
		linkedin_url: '',
		linkedin_switch: false,
		github_url: '',
		github_switch: false,
		website_url: '',
		website_switch: false,
		portfolio_url: '',
		portfolio_switch: false,
		twitter_url: '',
		twitter_switch: false,
	});

	const [progress, setProgress] = useState(1);

	useEffect(() => {
		console.log(formState);
	}, [formState]);

	const handleProgress = e => {
		e.preventDefault();
		if (e.target.value) {
			setProgress(prog => prog + 1);
		} else {
			setProgress(prog => prog - 1);
		}
	};

	return (
		<div ref={node}>
            {/* <p onClick={() => setOpen(!open)}>
				CREATE A COACH POSTING
			</p> */}
            <button onClick={() => setOpen(!open)}>
							<Icon icon={ICONS.LIGHTBULB} width={16} height={22} />
							<span className='add-coach-form-button'>Become a coach</span>
						</button>
			{open && (
            <div className="add-coach-form">
                
				{/* <CoachForm01 {...props} formState={formState} setFormState={setFormState} handleProgress={handleProgress} setProgress={setProgress} industriesData={industriesData}/> */}
				<br />
				<br />
				<hr />
				<br />
				<br />
				{/* <CoachForm02 {...props} formState={formState} setFormState={setFormState} handleProgress={handleProgress} setProgress={setProgress}/> */}
				<br />
				<br />
				<hr />
				<br />
				<br />
				{/* <CoachForm04 {...props} formState={formState} setFormState={setFormState} handleProgress={handleProgress} accounts={accounts} setAccounts={setAccounts} setProgress={setProgress}/> */}
			</div>
            )}
		</div>
	);
};

export default CoachForm;
