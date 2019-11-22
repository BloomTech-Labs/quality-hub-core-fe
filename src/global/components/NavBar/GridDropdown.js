import React, { useEffect, useState, useRef } from 'react';

import grid from '../../../globalIcons/grid.svg';
import favicon from '../../../globalIcons/favicon.svg';
import interviewQ from '../../../globalIcons/interviewQ.svg';
import resumeQ from '../../../globalIcons/resumeQ.svg';
import designQ from '../../../globalIcons/designQ.svg';

const GridDropdown = props => {
	const node = useRef();
	const [open, setOpen] = useState(false);

	const handleOutsideClick = e => {
		if (node.current.contains(e.target)) {
			return;
		}
		setOpen(false);
	};

	useEffect(() => {
		if (open) {
			document.addEventListener('mousedown', handleOutsideClick);
		} else {
			document.removeEventListener('mousedown', handleOutsideClick);
		}
	}, [open]);

	return (
		<div ref={node}>
			{/* Styling here needs to be changed to CSS Grid to make it more stable */}
			<img
				src={grid}
				alt='Grid Menu'
				className='grid-menu grid-icon'
				onClick={e => setOpen(!open)}
			/>

			{open && (
				<div className='dropdown-grid-content dropdown-icons'>
					<div className='test-css-grid'>
						<div className='box'>
							<a href='/'>
								<img
									src={favicon}
									height='50px'
									width='50px'
									alt='ResumeQ icon'
								/>
								<p>CodingQ</p>
							</a>
						</div>

						<div className='box'>
							<a href='/'>
								<img
									src={interviewQ}
									height='50px'
									width='50px'
									alt='InterviewQ icon'
								/>
								<p>InterviewQ</p>
							</a>
						</div>

						<div className='box'>
							<a href='/'>
								<img
									src={resumeQ}
									height='50px'
									width='50px'
									alt='ResumeQ icon'
								/>
								<p>ResumeQ</p>
							</a>
						</div>

						<div className='box'>
							<a href='/'>
								<img
									src={designQ}
									height='50px'
									width='50px'
									alt='DesignQ icon'
								/>
								<p>DesignQ</p>
							</a>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default GridDropdown;
