// Libraries
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useParams, useHistory } from 'react-router-dom';

// Components
import CoachReviewForm from './CoachReportStars/CoachReview_Form';

// Styles
import './CoachReport.scss';

// Modal
import useModal from '../../../global/utils/useModal';
import FeedbackModal from './FeedbackModal';

// Mutation
import { CREATE_REPORT } from './Mutation';

export default function CoachReport(props) {
	const { key } = useParams();
	const history = useHistory();

	const { isShowing, toggle } = useModal();

	// const [report, setReport] = useState({
	// 	strengths: '',
	// 	growth: '',
	// 	suggestions: '',
	// 	comments: '',
	// });

	// const [createReport] = useMutation(CREATE_REPORT);

		// toggles modal pop-up upon clicking "Send" button
	// 	toggle();
	// };

	return (
		<div className='coachreport-wrapper'>
			{/* This component renders a rubric for the coach to fill out about the seeker they interviewed */}
			<CoachReviewForm location={props.location} history={props.history} id={props.match.params.key} />

			<FeedbackModal isShowing={isShowing} />
		</div>
	);
}
