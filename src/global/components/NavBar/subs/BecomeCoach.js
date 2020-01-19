import React from 'react';
import { useLocation } from 'react-router-dom';

import BecomeCoachInterviewQ from '../../../../InterviewQ/components/BecomeCoachInterviewQ/BecomeCoachInterviewQ';
import BecomeCoachResumeQ from '../../../../ResumeQ/components/BecomeCoachResumeQ/BecomeCoachResumeQ';

export default function BecomeCoach() {
	const { pathname } = useLocation();

	// Depending on pathname, include relevant "BecomeCoach" component
	return (
		<div className='become-coach-wrapper'>
			{pathname.includes('interviewq') && <BecomeCoachInterviewQ />}
<<<<<<< HEAD
			{pathname.includes('/resumeq') && <BecomeCoachResumeQ />}
=======
			{pathname.includes('resumeq') && <BecomeCoachResumeQ />}
>>>>>>> fafd99157e8199bf78ef9bbe3fe47523bd4a2665
		</div>
	);
}
